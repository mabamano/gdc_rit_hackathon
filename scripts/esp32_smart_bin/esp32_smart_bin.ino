#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h> // Make sure to install ArduinoJson library
#include "DHT.h"

// ---------------------------------------------------
// CONFIGURATION
// ---------------------------------------------------

// WiFi Credentials
const char* ssid = "HOME(-_-)LANDER";
const char* password = "12345678";

// Firebase Config
const char* firebase_host = "https://sih-2025-7a1b9-default-rtdb.firebaseio.com";
// We use the REST API. No authentication for this demo (or use legacy secret if rules require)

// Bin Configuration
const String binId = "h1"; // The ID of this bin
const float BIN_HEIGHT_CM = 40.0; // Total depth of the bin for % calculation
unsigned long highFillStartTime = 0;
bool trashTruck = false;

// Pin Definitions
#define TRIG_PIN 5
#define ECHO_PIN 18
#define MQ_PIN 21      // MQ Sensor Digital Output
#define DHT_PIN 23     // DHT sensor data pin

// DHT Type
#define DHTTYPE DHT11  // or DHT22 if you successfully switch

DHT dht(DHT_PIN, DHTTYPE);

// ---------------------------------------------------
// SETUP
// ---------------------------------------------------
void setup() {
  Serial.begin(115200);
  
  // Sensor Pins
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(MQ_PIN, INPUT);

  // Initialize DHT
  dht.begin();

  // Connect to WiFi
  Serial.println();
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

// ---------------------------------------------------
// LOOP
// ---------------------------------------------------
void loop() {
  // Check WiFi Connection
  if(WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi Lost. Reconnecting...");
    WiFi.reconnect();
    delay(2000);
    return;
  }

  // 1. Read Ultrasonic (Distance)
  long duration;
  float distanceCm;

  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  duration = pulseIn(ECHO_PIN, HIGH);
  distanceCm = duration * 0.034 / 2;

  // Calculate Fill Level %
  // If distance is small, bin is full. If distance eq Height, bin is empty.
  // Clamp between 0 and 100
  int fillLevel = (int) ((BIN_HEIGHT_CM - distanceCm) / BIN_HEIGHT_CM * 100.0);
  if (fillLevel < 0) fillLevel = 0;
  if (fillLevel > 100) fillLevel = 100;

  Serial.print("Distance: "); Serial.print(distanceCm); Serial.print("cm | Fill: "); Serial.print(fillLevel); Serial.println("%");


  // 2. Read MQ (Gas)
  int gasState = digitalRead(MQ_PIN); // HIGH means gas detected usually, check module specs
  bool gasDetected = (gasState == HIGH);  // Adjust logic if module is active LOW
  if (gasDetected) Serial.println("⚠ Gas Detected!");


  // 3. Read DHT (Temp/Hum)
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature(); // Celsius

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read DHT sensor!");
    // Default values to avoid breaking JSON
    humidity = 0.0;
    temperature = 0.0;
  } else {
    Serial.print("Temp: "); Serial.print(temperature); Serial.print("C | Hum: "); Serial.print(humidity); Serial.println("%");
  }

  // --- TRASH TRUCK LOGIC ---
  if (distanceCm < 10.0) {
    if (highFillStartTime == 0) {
      highFillStartTime = millis(); // Start timer
    } else if (millis() - highFillStartTime > 6000) {
      trashTruck = true; // Trigger flag after 6 seconds
      Serial.println(">>> TRASH TRUCK REQUESTED <<<");
    }
  } else {
    highFillStartTime = 0; // Reset timer
    trashTruck = false;
  }

  // 4. Send Data to Firebase
  sendDataToFirebase(fillLevel, gasDetected, temperature, humidity, trashTruck);

  
  // Wait before next reading
  delay(1000); // Reduced to 1 second for better responsiveness
}

// ---------------------------------------------------
// FIREBASE PUSH (REST API)
// ---------------------------------------------------
void sendDataToFirebase(int fillLevel, bool gasDetected, float temp, float hum, bool trashTruckRequested) {
  HTTPClient http;
  
  // --- A. Update Bin Status (PUT) ---
  // Overwrite the current status of bin h1
  // Path: /binStatuses/h1.json
  
  String statusUrl = String(firebase_host) + "/binStatuses/" + binId + ".json";
  
  // Create JSON Payload
  // We use String concatenation for simplicity, or use ArduinoJson if preferred
  // JSON format matching your web app expectation:
  // {
  //   "houseId": "h1",
  //   "fillLevel": 50,
  //   "lastUpdated": "ISOTimestamp", (We might not have real clock, so we let server handle or just omit/send dummy)
  //   "status": "full"/"partial"/"empty",
  //   "temperature": 25.5,
  //   "humidity": 60,
  //   "gasDetected": true/false
  // }
  
  String binStatus = (fillLevel > 80) ? "full" : (fillLevel > 20 ? "partial" : "empty");
  
  // Using ArduinoJson is safer
  StaticJsonDocument<200> doc;
  doc["houseId"] = binId;
  doc["fillLevel"] = fillLevel;
  doc["status"] = binStatus;
  doc["temperature"] = temp;
  doc["humidity"] = hum;
  doc["gasDetected"] = gasDetected;
  doc["trashTruck"] = trashTruckRequested;
  // Note: ESP32 doesn't have RTC by default. We skip sending "lastUpdated" 
  // and let the Python/Web frontend handle 'time since' or add NTP time if needed.
  // But for now, we can simple send a placeholder or rely on Firebase's server timestamp if we used the SDK.
  // We'll just omit timestamp for this basic version.

  String jsonString;
  serializeJson(doc, jsonString);

  Serial.print("Updating Status... ");
  http.begin(statusUrl);
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.PUT(jsonString);
  
  if (httpResponseCode > 0) {
    Serial.print("Success: "); Serial.println(httpResponseCode);
  } else {
    Serial.print("Error: "); Serial.println(httpResponseCode);
  }
  http.end();


  // --- B. Log History (POST) ---
  // Append to /wasteLogs.json
  // Ideally this happens only when waste is added, but for demo we can push periodically or skip
  // Let's Skip logging every 5 seconds to save space, 
  // ONLY log if weight changes (we don't have weight sensor here?) or if Gas detected.
  
  if (gasDetected) {
    String logUrl = String(firebase_host) + "/wasteLogs.json";
    StaticJsonDocument<200> logDoc;
    logDoc["houseId"] = binId;
    logDoc["type"] = "ALERT"; // Custom type
    logDoc["message"] = "Gas/Hazard detected";
    logDoc["timestamp"] = millis(); // Just relative time
    
    String logJson;
    serializeJson(logDoc, logJson);
    
    http.begin(logUrl);
    http.addHeader("Content-Type", "application/json");
    http.POST(logJson);
    http.end();
    Serial.println("Alert Logged.");
  }
}
