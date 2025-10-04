import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Widgets from "./Widgets";
import AnalyticsChart from "./AnalyticsChart";

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch stats
    const fetchData = async () => {
      try {
        const statsRes = await axios.get("http://localhost:8000/api/stats"); // dummy endpoint
        setStats(statsRes.data);

        const chartRes = await axios.get("http://localhost:8000/api/analytics"); // dummy
        setChartData(chartRes.data);

        const usersRes = await axios.get("http://localhost:8000/api/users"); // dummy
        setUsers(usersRes.data);
      } catch (err) {
        console.error(err);
        // fallback dummy data
        setStats([
          { title: "Users", value: 120 },
          { title: "Active Sessions", value: 45 },
          { title: "Revenue", value: "$3,200" },
          { title: "Errors", value: 2 },
        ]);

        setChartData([
          { day: "Mon", visits: 30 },
          { day: "Tue", visits: 45 },
          { day: "Wed", visits: 60 },
          { day: "Thu", visits: 40 },
          { day: "Fri", visits: 80 },
        ]);

        setUsers([
          { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
        ]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Topbar />
        <div className="p-6">
          <Widgets stats={stats} />
          <AnalyticsChart data={chartData} />
        </div>
      </div>
    </div>
  );
}
