export default function SeverityDistributionChart({ events = [] }) {
  const counts = {
    high: events.filter((event) => event.severity === "high").length,
    medium: events.filter((event) => event.severity === "medium").length,
    low: events.filter((event) => event.severity === "low").length,
  };

  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "16px",
        padding: "16px",
        color: "white",
        minHeight: "220px",
      }}
    >
      <h3 style={{ margin: 0, fontSize: "18px" }}>Severity Distribution</h3>
      <p style={{ marginTop: "8px", color: "#94a3b8" }}>
        Live severity breakdown from the stream.
      </p>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div style={pillStyle("#ef4444")}>High: {counts.high}</div>
        <div style={pillStyle("#f59e0b")}>Medium: {counts.medium}</div>
        <div style={pillStyle("#22c55e")}>Low: {counts.low}</div>
      </div>
    </div>
  );
}

function pillStyle(color) {
  return {
    background: "#111827",
    border: `1px solid ${color}`,
    color,
    borderRadius: "999px",
    padding: "8px 14px",
    fontSize: "14px",
  };
}