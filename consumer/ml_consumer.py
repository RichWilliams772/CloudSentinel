from kafka import KafkaConsumer, KafkaProducer
from sklearn.ensemble import IsolationForest
from collections import deque
import numpy as np
import json
from datetime import datetime

# -----------------------------
# CONFIG
# -----------------------------
RAW_TOPIC = "iot-telemetry"
SCORED_TOPIC = "iot-scored"
BROKER = "localhost:9092"

WINDOW_SIZE = 200  # rolling window size

# -----------------------------
# KAFKA SETUP
# -----------------------------
consumer = KafkaConsumer(
    RAW_TOPIC,
    bootstrap_servers=BROKER,
    auto_offset_reset="latest",
    enable_auto_commit=True,
    group_id="cloudsentinel-ml-consumer",
    value_deserializer=lambda m: json.loads(m.decode("utf-8")),
)

producer = KafkaProducer(
    bootstrap_servers=BROKER,
    value_serializer=lambda v: json.dumps(v).encode("utf-8"),
)

# -----------------------------
# ML MODEL
# -----------------------------
model = IsolationForest(
    n_estimators=100,
    contamination=0.1,   # % anomalies expected
    random_state=42
)

# rolling memory
feature_window = deque(maxlen=WINDOW_SIZE)

# -----------------------------
# HELPERS
# -----------------------------
def extract_features(event):
    return [
        float(event.get("temperature", 0)),
        float(event.get("humidity", 0)),
        float(event.get("vibration", 0)),
    ]

def get_severity(score):
    if score < -0.08:
        return "high"
    elif score < -0.03:
        return "medium"
    return "low"

# -----------------------------
# STREAM LOOP
# -----------------------------
print("🚀 ML Consumer started...")

for message in consumer:
    event = message.value

    # 1. Extract features
    features = extract_features(event)
    feature_window.append(features)

    # 2. Warm-up phase
    if len(feature_window) < 30:
        scored_event = {
            **event,
            "anomaly_score": 0.0,
            "is_anomaly": False,
            "severity": "low",
            "model_status": "warming_up"
        }

        producer.send(SCORED_TOPIC, scored_event)
        print("Warming up:", scored_event)
        continue

    # 3. Train model on rolling window
    X = np.array(feature_window)
    model.fit(X)

    current = np.array(features).reshape(1, -1)

    # 4. Predict anomaly
    pred = int(model.predict(current)[0])                  # FIXED TYPE
    score = float(model.decision_function(current)[0])     # FIXED TYPE

    is_anomaly = bool(pred == -1)                          # FIXED TYPE
    severity = get_severity(score) if is_anomaly else "low"

    # 5. Create output event (JSON SAFE)
    scored_event = {
        **event,
        "anomaly_score": float(round(score, 5)),
        "is_anomaly": bool(is_anomaly),
        "severity": str(severity),
        "model_status": "active",
        "scored_at": datetime.utcnow().isoformat()
    }

    # 6. Send to Kafka
    producer.send(SCORED_TOPIC, scored_event)

    print("Scored:", scored_event)