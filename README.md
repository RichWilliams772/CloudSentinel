# 🚀 CloudSentinel  
### Cloud-Native Real-Time IoT Anomaly Detection Platform

CloudSentinel is a real-time, event-driven streaming system designed to detect anomalies in IoT telemetry data using distributed messaging and machine learning.

The platform simulates large-scale IoT environments, processes high-frequency telemetry streams using Apache Kafka, applies anomaly detection models, and visualizes results in a live monitoring dashboard.

---

## 🧠 Key Features

- ⚡ Real-time IoT telemetry simulation (multi-device streaming)
- 🔁 Event-driven architecture using Apache Kafka
- 🤖 Machine learning anomaly detection (Isolation Forest)
- 📊 Live dashboard with rolling window analytics
- 🔌 WebSocket-based streaming to frontend
- 📈 Scalable, cloud-native system design

---

## 🏗️ System Architecture

IoT Producer → Kafka → ML Consumer → WebSocket API → React Dashboard

---

## ⚙️ Tech Stack

| Layer | Technology | Purpose |
|------|-----------|--------|
| Streaming | Apache Kafka | Real-time data ingestion pipeline |
| Backend | Python | Producer, consumer, API |
| ML | Scikit-learn (Isolation Forest) | Anomaly detection |
| Frontend | React + Vite + Tailwind | Real-time dashboard UI |
| Communication | WebSockets | Live streaming to frontend |
| Infrastructure | Docker | Containerized Kafka setup |
| Data Processing | Pandas | Feature handling + transformations |

---

## 🔄 System Workflow

### 1. IoT Telemetry Simulation
- Simulates thousands of IoT devices
- Generates:
  - Temperature
  - Humidity
  - Vibration
- Streams data continuously into Kafka topics

---

### 2. Streaming Pipeline
- Kafka acts as a distributed message broker
- Enables:
  - High-throughput ingestion
  - Fault-tolerant streaming
  - Decoupled system components

---

### 3. ML Anomaly Detection
- Consumer reads from Kafka
- Applies Isolation Forest model
- Outputs:
  - anomaly_score
  - is_anomaly (True/False)
  - severity level (low, medium, high)

---

### 4. Real-Time API Layer
- Backend streams processed data via WebSockets
- Enables low-latency communication with frontend

---

### 5. Frontend Dashboard
- Built with React + Tailwind
- Displays:
  - Total Events (lifetime counter)
  - Rolling Window (last N events)
  - Anomaly Rate
  - Severity Distribution
  - Live Event Table

---

## 🔁 Rolling Window Design

The system uses a **rolling window (fixed-size buffer)** for real-time visualization.

- Stores only the most recent N events (e.g., 500)
- Prevents memory overload in the browser
- Ensures smooth UI performance

### Key Insight:
- **Total Events → grows indefinitely**
- **Rolling Window → capped for performance**

This mirrors real-world streaming systems like:
- fraud detection
- network monitoring
- IoT observability platforms

---

## ▶️ How to Run

### 1. Start Kafka (Docker)
```bash
docker compose up

### 2. Run IoT Producer
python producer/producer.py

### 3. Run ML Consumer
python consumer/consumer.py

### 4. Run API (WebSocket Server)
python api/main.py

### 5. Run Frontend
cd cloud-sentinel-frontend
npm install
npm run dev

Open:
👉 http://localhost:5173

📊 Example Output
Forwarding to frontend:
{
  "device_id": "device-14",
  "temperature": 24.2,
  "humidity": 51.3,
  "vibration": 0.03,
  "anomaly_score": -0.12,
  "is_anomaly": true,
  "severity": "high"
}

📈 Performance Characteristics
Handles high-frequency event streams
Designed for horizontal scalability
Supports real-time anomaly detection
Optimized for low-latency visualization

🚀 Future Improvements
Deploy to AWS (MSK, ECS, Lambda)
Add PostgreSQL for persistence
Implement alerting system (Slack / Email)
Add model retraining pipeline

👩🏽‍💻 Author

Richelle Williams
MS Data Science & Analytics — Florida Atlantic University
Integrate Spark Streaming for large-scale processing

