export default function AnomalyTrendChart({ events = [] }) {
  const recentPoints = events.slice(0, 20).reverse();

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
      <h3 style={{ margin: 0, fontSize: "18px" }}>Anomaly Trend</h3>
      <p style={{ marginTop: "8px", color: "#94a3b8" }}>
        Live anomaly score feed from streaming events.
      </p>

      <div
        style={{
          marginTop: "20px",
          height: "120px",
          borderRadius: "12px",
          border: "1px dashed #334155",
          padding: "12px",
          overflowX: "auto",
          display: "flex",
          alignItems: "end",
          gap: "8px",
        }}
      >
        {recentPoints.length === 0 ? (
          <div style={{ color: "#64748b" }}>Waiting for stream data...</div>
        ) : (
          recentPoints.map((event) => {
            const height = Math.max(
              12,
              Math.min(100, Math.abs(event.anomalyScore) * 1000)
            );

            return (
              <div
                key={event.id}
                title={`${event.deviceId}: ${event.anomalyScore}`}
                style={{
                  width: "18px",
                  height: `${height}px`,
                  borderRadius: "6px 6px 0 0",
                  background:
                    event.severity === "high"
                      ? "#ef4444"
                      : event.severity === "medium"
                      ? "#f59e0b"
                      : "#22c55e",
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}