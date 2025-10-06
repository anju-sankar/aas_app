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

  return <p>Signing you in...</p>;
}
