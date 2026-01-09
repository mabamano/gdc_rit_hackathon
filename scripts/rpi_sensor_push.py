import time
import random
import requests
import json
from datetime import datetime

# CONFIGURATION
# Replace with your Firebase Database URL (found in Firebase Console)
FIREBASE_URL = "https://sih-2025-7a1b9-default-rtdb.firebaseio.com"
# Secret is optional if rules are open, but recommended to use auth
# For simplicity in this script, we'll try REST without auth or legacy secret if needed.
# Better to use firebase-admin sdk in production.

# Mock Sensor Reading Functions
def read_ultrasonic_sensor():
    """Returns distance in cm (simulated)"""
    # Replace with actual GPIO code, e.g., using RPi.GPIO
    return random.uniform(10, 100) # Random distance 10cm to 100cm

def read_weight_sensor():
    """Returns weight in kg (simulated)"""
    return random.uniform(0, 5)

def get_waste_type():
    """Simulate ML classification"""
    types = ['organic', 'recyclable', 'hazardous']
    return random.choice(types)

def push_data():
    while True:
        try:
            # 1. Read Sensors
            distance = read_ultrasonic_sensor()
            weight = read_weight_sensor()
            waste_type = get_waste_type()
            
            # 2. Process Data
            # Assume bin height is 100cm for calculation
            bin_height = 100
            fill_level = max(0, min(100, int((bin_height - distance) / bin_height * 100)))
            
            # 3. Create Payloads
            timestamp = datetime.now().isoformat()
            
            # Bin Status Update
            bin_id = "h1" # Hardcoded for demo
            bin_data = {
                "houseId": bin_id,
                "fillLevel": fill_level,
                "lastUpdated": timestamp,
                "status": "full" if fill_level > 80 else "partial" if fill_level > 20 else "empty"
            }
            
            # Waste Log Entry
            log_entry = {
                "houseId": bin_id,
                "wasteType": waste_type,
                "weight": round(weight, 2),
                "timestamp": timestamp,
                "fillLevel": fill_level,
                "mlConfidence": random.randint(85, 99)
            }
            
            # 4. Send to Firebase via REST API
            
            # Update Bin Status (PUT to specific ID to overwrite)
            requests.put(f"{FIREBASE_URL}/binStatuses/{bin_id}.json", json=bin_data)
            
            # Add Waste Log (POST to append to list)
            requests.post(f"{FIREBASE_URL}/wasteLogs.json", json=log_entry)
            
            print(f"[{timestamp}] Pushed: Level={fill_level}%, Type={waste_type}")
            
        except Exception as e:
            print(f"Error: {e}")
            
        # Wait before next reading
        time.sleep(5) # 5 seconds delay

if __name__ == "__main__":
    print("Starting sensor push script...")
    print(f"Target: {FIREBASE_URL}")
    push_data()
