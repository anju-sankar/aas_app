import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) navigate("/dashboard");
    else setError(res.message);
  };

  const handleSocialLogin = (provider) => {
    // Redirect to your backend social login endpoint
    window.location.href = `${process.env.REACT_APP_API_URL}/${provider}`;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        {/* Email/Password Login */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="mt-3 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            className="w-full bg-gray-800 text-white p-2 rounded hover:bg-gray-900"
          >
            Continue with GitHub
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("facebook")}
            className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
          >
            Continue with Facebook
          </button>
        </div>
      </form>
    </div>
  );
}
