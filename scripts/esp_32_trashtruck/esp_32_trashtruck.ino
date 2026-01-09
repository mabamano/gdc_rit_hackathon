#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h> 
#include <ESP32Servo.h>
#include <FastLED.h>

// ---------------------------------------------------
// CONFIGURATION
// ---------------------------------------------------

// WiFi Credentials
const char *ssid = "HOME(-_-)LANDER";     
const char *password = "12345678"; 

// Firebase
const char* firebase_host = "https://sih-2025-7a1b9-default-rtdb.firebaseio.com";
const String binId = "h1"; 

// Hardware Config
#define LED_PIN 15
#define NUM_LEDS 1
CRGB leds[NUM_LEDS];

// DC Motor
const int motorPin1 = 32; 
const int motorPin2 = 33; 
const int nslp = 13; 
const int frequency = 5000;
const int speedChannel1 = 5;
const int speedChannel2 = 6;

// Servo Motor (Steering)
#define SERVO_PIN 27
Servo servo;
int servo_center = 100; // degrees

// State
bool movingSequenceDone = false; // To ensure we only move once per flag trigger (optional, or per requirement)
bool wasTrashTruckRequested = false;


// ---------------------------------------------------
// SETUP
// ---------------------------------------------------
void setup() {
  Serial.begin(115200);

  // 1. Setup Motors
  ledcSetup(speedChannel1, frequency, 8);
  ledcSetup(speedChannel2, frequency, 8);
  ledcAttachPin(motorPin1, speedChannel1);
  ledcAttachPin(motorPin2, speedChannel2);
  pinMode(nslp, OUTPUT);
  digitalWrite(nslp, HIGH); // Enable Driver

  // 2. Setup Servo
  servo.attach(SERVO_PIN, 500, 2400);
  moveServoTo(servo_center);

  // 3. Setup LED
  FastLED.addLeds<NEOPIXEL, LED_PIN>(leds, NUM_LEDS);
  rgb_led(255, 0, 0); // Red = Init

  // 4. Connect to WiFi
  Serial.print("Connecting to WiFi");
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected!");
  rgb_led(0, 0, 255); // Blue = Idle/Connected
}

// ---------------------------------------------------
// LOOP
// ---------------------------------------------------
void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    bool trashTruckRequested = checkFirebaseFlag();

    if (trashTruckRequested) {
        if (!wasTrashTruckRequested) {
             // Flag just turned TRUE
             Serial.println(">>> TRASH TRUCK REQUEST RECEIVED! Executing Mission <<<");
             executeMission();
             wasTrashTruckRequested = true;
        } else {
             Serial.println("Waiting for flag to reset...");
        }
    } else {
        wasTrashTruckRequested = false;
        // Serial.println("Status: Idle");
    }
  } else {
    Serial.println("WiFi Disconnected");
    WiFi.reconnect();
  }

  delay(2000); // Check every 2 seconds
}

// ---------------------------------------------------
// LOGIC
// ---------------------------------------------------

bool checkFirebaseFlag() {
  HTTPClient http;
  // Read just the specific boolean flag
  String url = String(firebase_host) + "/binStatuses/" + binId + "/trashTruck.json";
  
  http.begin(url);
  int httpCode = http.GET();
  bool flag = false;

  if (httpCode > 0) {
    String payload = http.getString();
    // Payload will be "true" or "false" or "null" string
    if (payload == "true") {
      flag = true;
    }
    // Serial.print("Firebase Flag: "); Serial.println(payload);
  } else {
    Serial.print("Error on HTTP request: "); Serial.println(httpCode);
  }
  http.end();
  return flag;
}

void executeMission() {
    rgb_led(0, 255, 0); // Green = GO
    
    // 1. Center Servo
    moveServoTo(servo_center);
    
    // 2. Move Forward for 10 Seconds
    Serial.println("Moving Forward...");
    motor_forward(200); // speed 0-255
    
    delay(10000); // 10 Seconds blocking delay
    
    // 3. Stop
    Serial.println("Stopping...");
    motor_stop();
    
    rgb_led(0, 0, 255); // Back to Blue
}


// ---------------------------------------------------
// MOTOR HELPERS
// ---------------------------------------------------
void rgb_led(int r, int g, int b) {
  leds[0] = CRGB(r, g, b);
  FastLED.show();
}

void moveServoTo(int angle) {
  angle = constrain(angle, 65, 125);
  servo.write(angle);
}

void motor_forward(int speed) { 
  ledcWrite(speedChannel1, speed);
  ledcWrite(speedChannel2, 0);
}

void motor_stop() {
  ledcWrite(speedChannel1, 0);
  ledcWrite(speedChannel2, 0);
}