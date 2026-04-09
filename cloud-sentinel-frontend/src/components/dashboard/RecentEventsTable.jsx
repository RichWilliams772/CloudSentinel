export default function RecentEventsTable({ events = [] }) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "16px",
        padding: "16px",
        color: "white",
      }}
    >
      <h3 style={{ margin: 0, fontSize: "18px" }}>Recent Events</h3>
      <p style={{ marginTop: "8px", color: "#94a3b8" }}>
        Most recent telemetry and anomaly events.
      </p>

      <div style={{ marginTop: "16px", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ color: "#94a3b8", textAlign: "left" }}>
              <th style={thStyle}>Time</th>
              <th style={thStyle}>Device</th>
              <th style={thStyle}>Temp</th>
              <th style={thStyle}>Humidity</th>
              <th style={thStyle}>Vibration</th>
              <th style={thStyle}>Severity</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: "16px", color: "#94a3b8" }}>
                  Waiting for live stream data...
                </td>
              </tr>
            ) : (
              events.slice(0, 12).map((event) => (
                <tr key={event.id} style={{ borderTop: "1px solid #1e293b" }}>
                  <td style={tdStyle}>{new Date(event.timestamp).toLocaleTimeString()}</td>
                  <td style={tdStyle}>{event.deviceId}</td>
                  <td style={tdStyle}>{event.temperature}</td>
                  <td style={tdStyle}>{event.humidity}</td>
                  <td style={tdStyle}>{event.vibration}</td>
                  <td style={tdStyle}>{event.severity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "12px 10px",
  fontSize: "14px",
  fontWeight: "600",
};

const tdStyle = {
  padding: "12px 10px",
  fontSize: "14px",
  color: "#e2e8f0",
};