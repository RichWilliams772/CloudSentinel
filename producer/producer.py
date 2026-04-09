import json
import random
import time
from datetime import datetime

from kafka import KafkaProducer

producer = KafkaProducer(
    bootstrap_servers="localhost:9092",
    value_serializer=lambda v: json.dumps(v).encode("utf-8")
)

devices = [f"device-{i}" for i in range(1, 21)]

def generate_data(device_id):
    temperature = round(random.normalvariate(22, 1.5), 2)
    humidity = round(random.normalvariate(50, 5), 2)
    vibration = round(max(0, random.normalvariate(0.03, 0.01)), 4)

    return {
        "device_id": device_id,
        "timestamp": datetime.utcnow().isoformat(),
        "temperature": temperature,
        "humidity": humidity,
        "vibration": vibration
    }

while True:
    for device in devices:
        data = generate_data(device)

        producer.send("iot-telemetry", data)

        print("Sent:", data)

    producer.flush()
    time.sleep(2)