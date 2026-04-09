import TopNav from "../components/layout/TopNav";
import FilterBar from "../components/dashboard/FilterBar";
import MetricsGrid from "../components/dashboard/MetricsGrid";
import AnomalyTrendChart from "../components/dashboard/AnomalyTrendChart";
import SeverityDistributionChart from "../components/dashboard/SeverityDistributionChart";
import TopDevicesPanel from "../components/dashboard/TopDevicesPanel";
import RecentEventsTable from "../components/dashboard/RecentEventsTable";
import useStreamData from "../hooks/useStreamData";

export default function Dashboard() {
  const { events, metrics, connected } = useStreamData();

  return (
    <div
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white",
        padding: "24px",
      }}
    >
      <TopNav connected={connected} />

      <div style={{ marginTop: "16px" }}>
        <FilterBar />
      </div>

      <div style={{ marginTop: "16px" }}>
        <MetricsGrid metrics={metrics} />
      </div>

      <div
        style={{
          marginTop: "16px",
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "16px",
        }}
      >
        <AnomalyTrendChart events={events} />
        <SeverityDistributionChart events={events} />
      </div>

      <div
        style={{
          marginTop: "16px",
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: "16px",
          alignItems: "start",
        }}
      >
        <TopDevicesPanel events={events} />
        <RecentEventsTable events={events} />
      </div>
    </div>
  );
}