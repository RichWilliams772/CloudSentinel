# CloudSentinel
Cloud-Native AI System for Real-Time IoT Anomaly Detection

CloudSentinel is a streaming analytics system that detects anomalies in IoT telemetry data using Kafka and machine learning. The platform simulates device telemetry, processes the stream in real-time, and visualizes anomalies in a live dashboard.

---

# System Architecture

IoT Producer → Kafka Topic → ML Consumer → Anomaly Detection → Streamlit Dashboard

Technologies used:

- Python
- Apache Kafka
- Docker
- Scikit-Learn (Isolation Forest)
- Streamlit
- Pandas

---

# Project Phases

## Phase 1 — Project Initialization
Objective: Create the base repository structure.

Tasks completed:
- Created project directory structure
- Added folders for API, producer, consumer, dashboard, infrastructure, and data
- Initialized Git repository
- Created README documentation

Folders created:
api/
consumer/
producer/
dashboard/
data/
docs/
infra/
model/

---

## Phase 2 — Kafka Infrastructure Setup
Objective: Deploy a streaming infrastructure using Docker.

Tasks completed:
- Created Docker containers for:
  - Kafka
  - Zookeeper
  - Kafka UI
- Configured Kafka topics
- Verified message ingestion pipeline

Tools used:
- Docker
- Kafka UI
- docker-compose

---

## Phase 3 — IoT Telemetry Producer
Objective: Simulate IoT device telemetry streams.

Implementation:
- Built a Python Kafka producer
- Simulates multiple devices sending telemetry data

Telemetry fields:
- device_id
- timestamp
- temperature
- humidity
- vibration

Producer script:
producer/producer.py

Result:
- Continuous telemetry stream into Kafka topic `telemetry`.

---

## Phase 4 — Machine Learning Anomaly Detection
Objective: Detect abnormal telemetry patterns.

Implementation:
- Built Kafka consumer
- Integrated Isolation Forest model

Features analyzed:
- temperature
- humidity
- vibration

Consumer performs:
- real-time inference
- anomaly scoring
- alert logging

File:
consumer/consumer.py

Output example:
ANOMALY | device=device-14 score=-0.012


---

## Phase 5 — Data Logging Layer
Objective: Persist streaming results.

Implementation:
- Consumer logs predictions to CSV

File generated:

data/anomaly_log.csv


Stored data:
- telemetry values
- anomaly score
- prediction label

---

## Phase 6 — Real-Time Monitoring Dashboard
Objective: Visualize anomalies and telemetry.

Built using:

- Streamlit
- Pandas

Dashboard displays:

- Total telemetry events
- Total anomalies detected
- Anomaly rate
- Temperature trend
- Vibration trend
- Recent anomaly table

Dashboard script:
dashboard/app.py


Run dashboard:
streamlit run dashboard/app.py


Open:
http://localhost:8501


---

# How to Run the System

Start Kafka containers:
docker compose up


Run producer:
python3 producer/producer.py


Run ML consumer:
python3 consumer/consumer.py


Start dashboard:
streamlit run dashboard/app.py


---

# Example Output

Anomaly detection:
ANOMALY | device=device-9 score=-0.018


Dashboard metrics:
Total Events: 65,000+
Total Anomalies: 10,000+


---

# Future Improvements

- Deploy system to AWS
- Store anomalies in PostgreSQL
- Add real-time alerting
- Implement distributed streaming with Spark




