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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <form className="bg-white border border-gray-200 p-8 rounded-2xl shadow-xl w-full max-w-md relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg p-3">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path fill="#6366f1" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        </div>
  <h2 className="text-2xl font-extrabold mb-2 text-center text-gray-800 tracking-tight">Sign In</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">Welcome back! Please login to your account.</p>
        {error && <p className="text-red-500 mb-3 text-center font-medium">{error}</p>}

        {/* Email/Password Login */}
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

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-400 font-semibold">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition shadow"
          >
            <svg width="20" height="20" viewBox="0 0 48 48"><g><path fill="#FFC107" d="M43.6 20.5H42V20.5H24V27.5H35.1C33.6 31.1 30.1 33.5 24 33.5C17.4 33.5 12 28.1 12 21.5C12 14.9 17.4 9.5 24 9.5C26.9 9.5 29.5 10.5 31.5 12.2L36.3 7.4C32.7 4.3 28.1 2.5 24 2.5C13.5 2.5 5 11 5 21.5C5 32 13.5 40.5 24 40.5C34.5 40.5 43 32 43 21.5C43 20.3 43.1 19.4 43.6 20.5Z"/><path fill="#FF3D00" d="M6.3 14.7L12.1 18.7C13.7 15.1 18.4 11.5 24 11.5C26.9 11.5 29.5 12.5 31.5 14.2L36.3 9.4C32.7 6.3 28.1 4.5 24 4.5C16.1 4.5 9.1 10.1 6.3 14.7Z"/><path fill="#4CAF50" d="M24 44.5C28.1 44.5 32.7 42.7 36.3 39.6L31.5 34.8C29.5 36.5 26.9 37.5 24 37.5C18.4 37.5 13.7 33.9 12.1 30.3L6.3 34.3C9.1 38.9 16.1 44.5 24 44.5Z"/><path fill="#1976D2" d="M43.6 20.5H42V20.5H24V27.5H35.1C34.4 29.2 33.2 30.7 31.5 32L36.3 36.8C39.2 34.1 41.1 30.6 41.9 27.5C42.6 25.2 43 22.9 43.6 20.5Z"/></g></svg>
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('github')}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white p-3 rounded-lg font-semibold hover:bg-gray-900 transition shadow"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.186 6.839 9.525.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.099 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48A10.025 10.025 0 0022 12.021C22 6.484 17.523 2 12 2z"/></svg>
            Continue with GitHub
          </button>
        </div>
      </form>
    </div>
  );
}
