# Odisha Smart Bin Waste Management System (Sujog)

Welcome to the **Odisha Smart Bin Dashboard** project! This comprehensive waste management system connects Households, Waste Collectors, Municipal Officers, and 3rd Party Partners to streamline waste management operations using IoT sensors and a real-time web dashboard.

## 🚀 Project Overview

The system is designed to provide:
- **Real-time Monitoring**: Track smart bin fill levels across the city.
- **Efficient Logistics**: Optimize collection routes for drivers.
- **Data-Driven Management**: Analytics for municipal officers to allocate resources effectively.
- **Citizen Engagement**: Household dashboards for tracking waste generation and pickup verification.

## ✨ Key Features

### 👤 For Users & Households
- **Dashboard**: View waste generation history and reward points.
- **QR Code Integration**: Generate QR codes for waste pickup verification.
- **Notifications**: Receive updates and announcements.

### 🚛 For Waste Collectors
- **Route Management**: View assigned routes (Ward/Street).
- **Pickup Verification**: Scan household QR codes to verify collection.
- **Issue Reporting**: Report broken bins or mixed waste violations.

### 🏛️ For Administrators & Municipal Officers
- **State Admin (CM)**: High-level state-wide oversight.
- **Municipal Admin**: Manage city-level operations, collectors, and households.
- **Sanitation Dept**: Monitor ongoing sanitation activities.
- **Logistics Dept**: Manage vehicle fleets and route optimization.
- **Recycling Dept**: Manage recycling processes.
- **Live Map**: Real-time visualization of bin statuses (Full/Empty/Critical).

### 🤖 IoT & Automation
- **Smart Bins**: Sensors simulate fill-level data pushing to Firebase.
- **Automated Alerts**: Triggers for critical fill levels.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Maps**: [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)
- **Backend/Database**: [Firebase Realtime Database](https://firebase.google.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

- `src/`: Source code for the application.
  - `components/`: Reusable UI components.
  - `pages/`: Application pages/routes (Dashboards, Login, etc.).
  - `contexts/`: React contexts (Auth, Language, etc.).
  - `hooks/`: Custom React hooks.
  - `utils/`: Utility functions and helpers.
- `scripts/`: Python scripts for IoT sensor simulation.
- `architecture.md`: Detailed system architecture documentation.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Python](https://www.python.org/) (v3.8 or higher) for sensor scripts.

### 1. Web Dashboard Setup

1.  **Clone the repository**:
    ```bash
    git clone <YOUR_GIT_URL>
    cd odisha-smart-bin-29
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:8080`.

### 2. Sensor Simulation Setup (Optional)

If you want to simulate hardware sensors pushing data to the dashboard:

1.  **Install Python requirements**:
    ```bash
    pip install -r requirements.txt
    ```

2.  **Run the sensor script**:
    ```bash
    python scripts/rpi_sensor_push.py
    ```
    *Note: Check `scripts/rpi_sensor_push.py` for configuration details.*

## 🏗️ Architecture

For a detailed breakdown of the system architecture, user workflows, and data flow diagrams, please refer to [architecture.md](./architecture.md).

## 🤝 Contribution Guidelines

We welcome contributions! Please follow these steps:

1.  **Fork** the repository.
2.  Create a new **Branch** for your feature (`git checkout -b feature/NewFeature`).
3.  **Commit** your changes (`git commit -m 'Add NewFeature'`).
4.  **Push** to the branch (`git push origin feature/NewFeature`).
5.  Open a **Pull Request**.

---

*Project created for SIH 2025 - Odisha Smart Bin Initiative.*
