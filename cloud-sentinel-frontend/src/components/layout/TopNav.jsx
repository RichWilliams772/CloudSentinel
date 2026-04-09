export default function TopNav({ connected }) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        padding: "18px 24px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "999px",
            background: "#0b3b7a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
          }}
        >
          CS
        </div>

        <div>
          <div style={{ fontSize: "22px", fontWeight: "700" }}>CloudSentinel</div>
          <div style={{ fontSize: "14px", color: "#94a3b8" }}>
            Real-Time IoT Anomaly Detection Platform
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            border: `1px solid ${connected ? "#10b981" : "#ef4444"}`,
            color: connected ? "#10b981" : "#ef4444",
            borderRadius: "999px",
            padding: "10px 16px",
            fontSize: "14px",
            fontWeight: "600",
            background: "#082f26",
          }}
        >
          {connected ? "Streaming Active" : "Disconnected"}
        </div>

        <div style={{ color: "#94a3b8", fontSize: "14px" }}>
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}