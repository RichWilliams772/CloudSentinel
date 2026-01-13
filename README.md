# CloudSentinel
Cloud-Native AI System for Real-Time Anomaly Detection in Network or IoT Data. This system  deploys a scalable cloud-based system that ingests real-time data (network traffic or IoT telemetry) and uses machine learning to detect anomalies indicative of attacks, failures, or misuse.
## Repo Structure
- infra/local: Docker Compose for local Kafka/Postgres
- infra/aws: AWS deployment notes (MSK, ECS/Fargate, RDS, S3)
- producer: IoT telemetry simulator -> Kafka
- consumer: Kafka consumer -> feature engineering -> scoring -> storage/alerts
- model: offline training + evaluation + model artifacts
- api: FastAPI inference service
- dashboard: Streamlit real-time dashboard
- docs: architecture diagram + report assets
- data: small sample data only (large data excluded)

