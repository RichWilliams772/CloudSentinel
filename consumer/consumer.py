import json
import csv
import os
from collections import deque, defaultdict

import numpy as np
from kafka import KafkaConsumer
from sklearn.ensemble import IsolationForest


TOPIC = "telemetry"
BOOTSTRAP_SERVERS = "localhost:9092"
WINDOW_SIZE = 10
LOG_FILE = "data/anomaly_log.csv"

consumer = KafkaConsumer(
    TOPIC,
    bootstrap_servers=BOOTSTRAP_SERVERS,
    auto_offset_reset="latest",
    value_deserializer=lambda x: json.loads(x.decode("utf-8")),
)

history = defaultdict(lambda: deque(maxlen=WINDOW_SIZE))
model = IsolationForest(contamination=0.05, random_state=42)

baseline = np.array(
    [
        [22.0, 50.0, 0.03],
        [21.5, 48.0, 0.02],
        [23.0, 52.0, 0.04],
        [22.3, 49.5, 0.03],
        [21.8, 51.0, 0.025],
        [22.1, 50.5, 0.035],
        [22.4, 47.8, 0.028],
        [21.9, 53.0, 0.031],
    ]
)
model.fit(baseline)

os.makedirs("data", exist_ok=True)

if not os.path.exists(LOG_FILE):
    with open(LOG_FILE, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            "device_id",
            "timestamp",
            "temperature",
            "humidity",
            "vibration",
            "score",
            "prediction",
        ])

print("ML consumer started... listening for telemetry")

for message in consumer:
    data = message.value
    device_id = data["device_id"]

    temp = float(data["temperature"])
    humidity = float(data["humidity"])
    vibration = float(data["vibration"])

    history[device_id].append([temp, humidity, vibration])

    features = np.array([[temp, humidity, vibration]])
    pred = model.predict(features)[0]   # -1 anomaly, 1 normal
    score = model.decision_function(features)[0]

    prediction = "ANOMALY" if pred == -1 else "normal"

    with open(LOG_FILE, "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            device_id,
            data["timestamp"],
            temp,
            humidity,
            vibration,
            score,
            prediction,
        ])

    if pred == -1:
        print(f"🚨 ANOMALY | device={device_id} score={score:.4f} data={data}")
    else:
        print(f"normal | device={device_id} score={score:.4f}")
