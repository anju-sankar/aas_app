import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function OAuthSuccess() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();
  const { fetchUser } = useContext(AuthContext);

  useEffect(() => {
    const handleOAuth = async () => {
      if (token) {
        localStorage.setItem("token", token);
        const user = await fetchUser();
        navigate(user ? "/dashboard" : "/login");
      }
    };
    handleOAuth();
  }, [token]);

  return (
    <div className="flex justify-center items-center h-40">
      <span className="text-gray-500 text-lg animate-pulse">Signing you in...</span>
    </div>
  );
}
