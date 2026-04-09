from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from kafka import KafkaConsumer
import json
import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

KAFKA_BROKER = "localhost:9092"
KAFKA_TOPIC = "iot-scored"


def create_kafka_consumer():
    return KafkaConsumer(
        KAFKA_TOPIC,
        bootstrap_servers=KAFKA_BROKER,
        auto_offset_reset="latest",
        enable_auto_commit=True,
        group_id=None,
        value_deserializer=lambda m: json.loads(m.decode("utf-8")),
        consumer_timeout_ms=1000,
    )


def normalize_event(data: dict) -> dict:
    return {
        "device_id": data.get("device_id", "unknown-device"),
        "timestamp": data.get("timestamp"),
        "temperature": float(data.get("temperature", 0)),
        "humidity": float(data.get("humidity", 0)),
        "vibration": float(data.get("vibration", 0)),
        "anomaly_score": float(data.get("anomaly_score", 0)),
        "is_anomaly": bool(data.get("is_anomaly", False)),
        "severity": data.get("severity", "low"),
        "model_status": data.get("model_status", "unknown"),
        "scored_at": data.get("scored_at"),
    }


@app.get("/")
def root():
    return {"status": "CloudSentinel API running with ML-scored Kafka events"}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("WebSocket client connected")

    consumer = None

    try:
        consumer = create_kafka_consumer()
        print(f"Connected to Kafka topic: {KAFKA_TOPIC}")

        while True:
            message_batch = consumer.poll(timeout_ms=1000)

            if not message_batch:
                await asyncio.sleep(0.1)
                continue

            for _, records in message_batch.items():
                for record in records:
                    event = normalize_event(record.value)
                    print("Forwarding to frontend:", event)
                    await websocket.send_json(event)

    except WebSocketDisconnect:
        print("WebSocket client disconnected")
    except Exception as e:
        print("WebSocket/Kafka error:", repr(e))
        try:
            await websocket.close()
        except Exception:
            pass
    finally:
        if consumer is not None:
            consumer.close()
            print("Kafka consumer closed")