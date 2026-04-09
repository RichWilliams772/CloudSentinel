export default function TopDevicesPanel({ events = [] }) {
  const groupedDevices = Object.values(
    events.reduce((acc, event) => {
      if (!acc[event.deviceId]) {
        acc[event.deviceId] = {
          id: event.deviceId,
          count: 0,
          latestScore: event.anomalyScore,
          severity: event.severity,
        };
      }

      acc[event.deviceId].count += 1;
      acc[event.deviceId].latestScore = event.anomalyScore;
      acc[event.deviceId].severity = event.severity;

      return acc;
    }, {})
  )
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "16px",
        padding: "16px",
        color: "white",
        minHeight: "240px",
      }}
    >
      <h3 style={{ margin: 0, fontSize: "18px" }}>Top Devices</h3>
      <p style={{ marginTop: "8px", color: "#94a3b8" }}>
        Devices with the highest anomaly activity.
      </p>

      <div style={{ marginTop: "16px", display: "grid", gap: "12px" }}>
        {groupedDevices.length === 0 ? (
          <div style={{ color: "#94a3b8" }}>Waiting for live device data...</div>
        ) : (
          groupedDevices.map((device) => (
            <div
              key={device.id}
              style={{
                background: "#111827",
                border: "1px solid #1f2937",
                borderRadius: "12px",
                padding: "12px",
              }}
            >
              <div style={{ fontWeight: "600" }}>{device.id}</div>
              <div style={{ marginTop: "6px", color: "#94a3b8", fontSize: "14px" }}>
                Events: {device.count}
              </div>
              <div style={{ marginTop: "6px", color: "#94a3b8", fontSize: "14px" }}>
                Score: {device.latestScore}
              </div>
              <div style={{ marginTop: "6px", color: "#cbd5e1", fontSize: "14px" }}>
                Severity: {device.severity}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}