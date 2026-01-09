# System Architecture & Workflow

This document outlines the end-to-end workflow of the Odisha Smart Bin Waste Management System (Sujog). It is designed to help visualize the system for flowcharts and architectural diagrams.

## 1. High-Level System Overview

The system connects four key stakeholders: **Households**, **Waste Collectors**, **Municipal Officers**, and **3rd Party Partners**. It leverages IoT sensors (Smart Bins) and a Web Dashboard for real-time monitoring and management.

```mermaid
graph TD
    subgraph Users_Group ["Users"]
        H[Household]
        C[Collector]
        O[Officer]
        TP["3rd Party"]
    end

    subgraph Frontend ["Frontend (Web Dashboard)"]
        UI[React Application]
        Auth[Auth Context]
        Dash[Dashboards per Role]
    end

    subgraph Backend ["Backend / Infrastructure"]
        FB[Firebase Realtime DB]
        AuthSvc[Mock Auth Service]
    end

    subgraph IoT ["IoT / Physical Layer"]
        Bin["Smart Bin (RPi Sensors)"]
        QR["QR Code Verification"]
    end

    H -->|Register/Login| UI
    C -->|Register/Login| UI
    O -->|Register/Login| UI
    TP -->|Register/Login| UI

    UI --> Auth
    UI -->|Reads/Writes| FB

    Bin -->|Pushes Data| FB
    C -->|Scans| QR
    QR -->|Updates| FB
```

---

## 2. User Registration & Authentication Flow

All users must authenticate to access their specific dashboards. The system supports a "New User Registration" flow.

```mermaid
sequenceDiagram
    participant User
    participant LoginPage
    participant RegSelector
    participant RegForm
    participant AuthSystem
    participant Dashboard

    User->>LoginPage: Visits /login
    User->>LoginPage: Clicks "New User? Register Here"
    LoginPage->>RegSelector: Navigates to Register Selection
    
    rect rgb(240, 248, 255)
        note right of User: Role Selection
        User->>RegSelector: Selects Role (Household/Collector/etc.)
        RegSelector->>RegForm: Opens Specific Form
    end

    User->>RegForm: Enters Details (e.g., Aadhar, GST, Emp ID)
    User->>RegForm: Submits Form
    
    RegForm->>AuthSystem: validates & creates account
    AuthSystem-->>RegForm: Success
    
    RegForm->>Dashboard: Auto-redirects to Role-based Dashboard
```

---

## 3. Household Workflow

**Goal**: Monitor own waste generation, view history, and ensure pickup.

1.  **Registration**: User provides Ward, Street, House No, Aadhar, EB Number.
2.  **Dashboard**:
    *   View waste generation history.
    *   Check reward points.
    *   Download QR Code (for collector validation).
    *   View notifications/announcements.

```mermaid
graph LR
    H[Household User] -->|Log In| D[Household Dashboard]
    D -->|View| Stats[Waste Stats]
    D -->|View| Hist[Collection History]
    D -->|Generate| QR[My QR Code]
    
    subgraph PA ["Physical Action"]
        C[Collector] -->|Scans| QR
        QR -->|Verifies| Pickup[Pickup Verified]
    end
```

---

## 4. Collector Workflow

**Goal**: Efficiently collect waste from assigned routes and report status.

1.  **Registration**: User provides Employee ID, Collector ID.
2.  **Dashboard**:
    *   View assigned route (Ward/Street).
    *   **QR Scan**: Scan household QR to verify pickup.
    *   Report issues (e.g., "Bin Broken", "Mixed Waste Violation").
    *   Mark attendance.

```mermaid
graph TD
    C[Collector] -->|Log In| CD[Collector Dashboard]
    CD -->|View| Route[Assigned Route]
    
    subgraph CP ["Collection Process"]
        C -->|Arrives at| H[Household]
        C -->|Scans QR| App[Mobile View / Dashboard]
        App -->|Updates| DB[Database]
        DB -->|Credits| Pts[Reward Points to Household]
    end
    
    C -->|Report| Issue[Issue/Violation]
    Issue -->|Notify| O[Officer]
```

---

## 5. Municipal Officer Workflow

**Goal**: City-wide monitoring, resource allocation, and anomaly detection.

1.  **Registration**: User provides Govt ID, Department.
2.  **Dashboard**:
    *   **Live Map**: View status of all Smart Bins (Full/Empty/Critical).
    *   **Analytics**: View total waste collected, efficiency metrics.
    *   **Management**: View lists of Households and Collectors.
    *   **Reports**: Export data for official use.

```mermaid
graph TD
    O[Officer] -->|Visits| Map[Live Bin Map]
    Map -->|Monitors| Bins[Smart Bins]
    
    Bins -->|Sensor Data| Cloud
    Cloud -->|Update| Map
    
    O -->|Assigns| Task[Route/Task]
    Task -->|Sent to| C[Collector]
```

---

## 6. 3rd Party Partner Workflow

**Goal**: Monitor specific zones assigned to private entities.

1.  **Registration**: User provides Partner Name, GST Number.
2.  **Dashboard**:
    *   View aggregate stats for assigned zones.
    *   View specific "Partner Map".
    *   Access limited reports.

---

## 7. IoT Data Flow (Smart Bin)

Sensors in the bin measure fill level and send data to the cloud.

```mermaid
sequenceDiagram
    participant Sensor as RPi/Sensor
    participant Script as Python Script
    participant Firebase
    participant Web as Web Dashboard

    loop Every 5 Minutes / Trigger
        Sensor->>Script: Reads Distance (Ultrasonic)
        Script->>Script: Calculates Fill %
        Script->>Firebase: PUT /binStatuses/{binId}
    end

    Firebase-->>Web: Real-time Update (Listener)
    Web->>Web: Updates Map Icon Color (Green/Amber/Red)
```

## 8. Data Structures

*   **HouseholdUser**: `id`, `ward`, `street`, `house`, `aadhar`, `ebNumber`, `points`.
*   **SmartBin**: `id`, `location (lat, lng)`, `fillLevel`, `status`, `lastUpdated`.
*   **WasteLog**: `id`, `householdId`, `collectorId`, `wasteType`, `weight`, `timestamp`.
*   **Collector**: `id`, `employeeId`, `assignedWard`.
*   **Officer**: `id`, `govtId`, `role`.
*   **ThirdParty**: `id`, `gstNumber`, `partnerName`.
