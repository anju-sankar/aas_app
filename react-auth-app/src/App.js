import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import UsersList from "./components/UsersList"; // import your new component
import ProtectedRoute from "./routes/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Dashboard main route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin-only Users route */}
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute>
              {user?.roles?.includes("admin") ? (
        <DashboardLayout>
          <UsersList />
        </DashboardLayout>
      ) : <Navigate to="/dashboard" />}
            </ProtectedRoute>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
