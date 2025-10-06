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
        if (storedUser.role === "admin") {
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
    <div>
      <h2>User Visits Analytics (Last 7 Days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {user?.role === "admin"
            ? Object.keys(data[0] || {})
                .filter((key) => key !== "date")
                .map((userId, idx) => (
                  <Line
                    key={userId}
                    type="monotone"
                    dataKey={userId}
                    name={`User ${userId}`}
                    stroke={colors[idx % colors.length]}
                  />
                ))
            : <Line type="monotone" dataKey="visits" stroke="#8884d8" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
