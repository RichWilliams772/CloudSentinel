import pandas as pd
import streamlit as st
from pathlib import Path

LOG_FILE = Path("data/anomaly_log.csv")

st.set_page_config(page_title="CloudSentinel Dashboard", layout="wide")
st.title("CloudSentinel — Real-Time IoT Anomaly Dashboard")
st.caption("Kafka-based streaming telemetry with ML anomaly detection using Isolation Forest")

if st.button("Refresh Dashboard"):
    st.rerun()

if not LOG_FILE.exists():
    st.warning("Waiting for data/anomaly_log.csv to be created by the consumer...")
    st.stop()

df = pd.read_csv(LOG_FILE)

if df.empty:
    st.warning("Log file exists, but no data has been written yet.")
    st.stop()

df["timestamp"] = pd.to_datetime(df["timestamp"], errors="coerce")

total_events = len(df)
total_anomalies = len(df[df["prediction"] == "ANOMALY"])
anomaly_rate = (total_anomalies / total_events) * 100 if total_events > 0 else 0

col1, col2, col3 = st.columns(3)
col1.metric("Total Events", total_events)
col2.metric("Total Anomalies", total_anomalies)
col3.metric("Anomaly Rate (%)", f"{anomaly_rate:.2f}")

st.divider()

left, right = st.columns([2, 1])

with left:
    st.subheader("Temperature Over Time")
    temp_df = df[["timestamp", "temperature"]].dropna().set_index("timestamp")
    st.line_chart(temp_df)

    st.subheader("Vibration Over Time")
    vib_df = df[["timestamp", "vibration"]].dropna().set_index("timestamp")
    st.line_chart(vib_df)

with right:
    st.subheader("Recent Anomalies")
    anomalies = df[df["prediction"] == "ANOMALY"].tail(15)
    st.dataframe(anomalies, use_container_width=True, height=400)

st.divider()

st.subheader("Recent Telemetry")
st.dataframe(df.tail(25), use_container_width=True)
