# Project Essentials & Contribution Guide

Welcome to the **Odisha Smart Bin Dashboard** project! This guide will help you get set up and ready to contribute.

## 🚀 Project Overview

This project consists of two main parts:
1.  **Web Dashboard**: A React + Vite application for monitoring smart bins.
2.  **Sensor Script**: A Python script (`scripts/rpi_sensor_push.py`) that simulates/pushes sensor data to Firebase.

## 🛠️ Prerequisites

Before you begin, make sure you have the following installed:
-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   [Python](https://www.python.org/) (v3.8 or higher recommended)

## 💻 Web Dashboard Setup

1.  **Navigate to the project directory**:
    ```bash
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
    The app should now be running at `http://localhost:8080` (or similar).

## 🐍 Sensor Script Setup

If you are working on the hardware/sensor simulation side:

1.  **Install Python dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

2.  **Run the sensor simulation**:
    ```bash
    python scripts/rpi_sensor_push.py
    ```

> **Note**: The script is currently configured to push mock data to a Firebase Realtime Database. Check `scripts/rpi_sensor_push.py` for configuration details.

## 🤝 Contribution Guidelines

-   **Branching**: Create a new branch for your feature or fix (e.g., `feature/new-chart` or `fix/sensor-bug`).
-   **Commits**: Write clear, concise commit messages.
-   **Pull Requests**: Open a PR when your changes are ready for review.

Happy coding!
