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
    const tenantDomain = window.location.hostname;
    window.location.href = `${process.env.REACT_APP_WEB_URL}/${provider}?tenant_domain=${tenantDomain}`;
  };

  return (
   <div className="flex flex-col justify-center items-center min-h-screen px-4 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
    <form className="bg-white border border-gray-200 p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-md relative">
      <div className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg p-3 md:p-4">
        <svg
          width="30"
          height="30"
          fill="none"
          viewBox="0 0 24 24"
          className="md:w-8 md:h-8 w-7 h-7"
        >
          <path
            fill="#6366f1"
            d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          />
        </svg>
      </div>

        <h2 className="text-2xl font-extrabold mb-2 text-center text-gray-800 tracking-tight">Sign In</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Welcome back! Please login to your account.
        </p>
        {error && <p className="text-red-500 mb-3 text-center font-medium">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-2 shadow"
        >
          Login
        </button>

        <p className="mt-2 text-sm text-gray-600 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">Register</Link>
        </p>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-400 font-semibold">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition shadow"
          >
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('github')}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white p-3 rounded-lg font-semibold hover:bg-gray-900 transition shadow"
          >
            Continue with GitHub
          </button>
        </div>
      </form>
    </div>
  );
}
