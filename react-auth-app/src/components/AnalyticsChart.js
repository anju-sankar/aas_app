import { useEffect, useState } from "react";
import api from "../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function AnalyticsChart() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    api
      .get('/analytics/visits', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Format data for admin (group by date, multiple lines)
        if (storedUser.role === "tenant-admin") {
          const grouped = {};
          res.data.forEach((item) => {
            if (!grouped[item.date]) grouped[item.date] = {};
            grouped[item.date][item.user_id] = item.visits;
          });

          const formatted = Object.entries(grouped).map(([date, users]) => ({
            date,
            ...users,
          }));
          setData(formatted);
        } else {
          // regular user
          const formatted = res.data.map((item) => ({
            date: item.date,
            visits: item.visits,
          }));
          setData(formatted);
        }
      })
      .catch(console.error);
  }, []);

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088FE"];

  return (
    <div style={{
      width: "100%",
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      padding: 16,
      position: "relative"
    }}>
      <h2 style={{
        fontSize: "1.25rem", // reduced from 1.5rem
        fontWeight: 700,
        marginBottom: 8,
        color: "#222"
      }}>
        <span role="img" aria-label="chart">📈</span> User Visits Analytics
      </h2>
      <p style={{ color: "#666", marginBottom: 16, fontSize: "0.95rem" }}>
        {user?.role === "tenant-admin"
          ? "Overview of user visits for all users in the last 7 days."
          : "Your visits in the last 7 days."}
      </p>
      <div style={{ background: "#f7f8fa", borderRadius: 8, padding: 8 }}>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}
              labelStyle={{ fontWeight: 600 }}
            />
            <Legend wrapperStyle={{ paddingTop: 8 }} />
            {user?.role === "tenant-admin"
              ? Object.keys(data[0] || {})
                  .filter((key) => key !== "date")
                  .map((userId, idx) => (
                    <Line
                      key={userId}
                      type="monotone"
                      dataKey={userId}
                      name={`User ${userId}`}
                      stroke={colors[idx % colors.length]}
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 7 }}
                    />
                  ))
              : <Line type="monotone" dataKey="visits" stroke="#8884d8" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 7 }} />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
