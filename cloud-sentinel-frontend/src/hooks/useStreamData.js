import { useEffect, useMemo, useRef, useState } from "react";

const MAX_EVENTS = 500;

export default function useStreamData() {
  const [events, setEvents] = useState([]);
  const [connected, setConnected] = useState(false);
  const [totalEventsSeen, setTotalEventsSeen] = useState(0);

  const wsRef = useRef(null);

  useEffect(() => {
    if (wsRef.current) return;

    const ws = new WebSocket("ws://127.0.0.1:8000/ws");
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      console.log("Connected to WebSocket");
    };

    ws.onclose = () => {
      setConnected(false);
      console.log("Disconnected from WebSocket");
      wsRef.current = null;
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);

        const event = {
          id: `${data.device_id}-${Date.now()}-${Math.random()}`,
          timestamp: data.timestamp,
          deviceId: data.device_id,
          temperature: Number(data.temperature ?? 0),
          humidity: Number(data.humidity ?? 0),
          vibration: Number(data.vibration ?? 0),
          anomalyScore: Number(data.anomaly_score ?? 0),
          isAnomaly: Boolean(data.is_anomaly ?? false),
          severity: data.severity ?? "low",
        };

        setTotalEventsSeen((prev) => prev + 1);

        setEvents((prev) => {
          const updated = [event, ...prev];
          return updated.slice(0, MAX_EVENTS);
        });
      } catch (err) {
        console.error("Failed to parse message:", err);
      }
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  const metrics = useMemo(() => {
    const anomalies = events.filter((e) => e.isAnomaly).length;
    const anomalyRate =
      events.length > 0 ? ((anomalies / events.length) * 100).toFixed(1) : "0.0";

    const high = events.filter((e) => e.severity === "high").length;
    const medium = events.filter((e) => e.severity === "medium").length;
    const low = events.filter((e) => e.severity === "low").length;

    return {
      totalEvents: totalEventsSeen,
      windowSize: events.length,
      anomalies,
      anomalyRate,
      severityCounts: { high, medium, low },
    };
  }, [events, totalEventsSeen]);

  return { events, metrics, connected };
}