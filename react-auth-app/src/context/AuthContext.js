import { createContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser && savedUser !== "undefined") {
      try {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse saved user:", err);
        localStorage.removeItem("user"); // clear bad data
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/login", { email, password });

      const userWithRoles = {
        ...res.data.user,
        roles: res.data.roles || [], // add roles array
      };

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(userWithRoles));

      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`;
      setUser(userWithRoles);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (name, email, password, passwordConfirmation) => {
    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      // Backend returns roles as well
      const userWithRoles = {
        ...res.data.user,
        roles: res.data.roles || [],
      };

      localStorage.setItem("user", JSON.stringify(userWithRoles));
      localStorage.setItem("token", res.data.access_token);

      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`;
      setUser(userWithRoles);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await api.get("me"); // make sure your Laravel route /api/user exists
      const userWithRoles = {
        ...res.data.user,
        roles: res.data.roles || [],
      };
      localStorage.setItem("user", JSON.stringify(userWithRoles));
      setUser(userWithRoles);
      return userWithRoles;
    } catch (err) {
      console.error("fetchUser failed:", err.response?.data || err.message);
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
