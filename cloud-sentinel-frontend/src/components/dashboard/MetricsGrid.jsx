export default function MetricsGrid({ metrics }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
        gap: "16px",
      }}
    >
      <div style={cardStyle}>
        <p style={labelStyle}>Total Events</p>
        <h2 style={valueStyle}>{metrics?.totalEvents ?? 0}</h2>
        <p style={subStyle}>All events seen</p>
      </div>

      <div style={cardStyle}>
        <p style={labelStyle}>Rolling Window</p>
        <h2 style={valueStyle}>{metrics?.windowSize ?? 0}</h2>
        <p style={subStyle}>Stored in memory</p>
      </div>

      <div style={cardStyle}>
        <p style={labelStyle}>Anomalies</p>
        <h2 style={valueStyle}>{metrics?.anomalies ?? 0}</h2>
        <p style={subStyle}>Current window</p>
      </div>

      <div style={cardStyle}>
        <p style={labelStyle}>Anomaly Rate</p>
        <h2 style={valueStyle}>{metrics?.anomalyRate ?? "0.0"}%</h2>
        <p style={subStyle}>Current window</p>
      </div>

      <div style={cardStyle}>
        <p style={labelStyle}>High Severity</p>
        <h2 style={valueStyle}>{metrics?.severityCounts?.high ?? 0}</h2>
        <p style={subStyle}>Current window</p>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#0f172a",
  border: "1px solid #1e293b",
  borderRadius: "16px",
  padding: "16px",
  color: "white",
};

const labelStyle = {
  margin: 0,
  color: "#94a3b8",
  fontSize: "14px",
};

const valueStyle = {
  marginTop: "10px",
  marginBottom: 0,
  fontSize: "28px",
};

const subStyle = {
  marginTop: "8px",
  marginBottom: 0,
  color: "#64748b",
  fontSize: "12px",
};