import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/authService";

export default function LoginPage({ setUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    const result = await login(username, password);

    if (result && result.token) {
      setMessage("Login Successful!");
      setUser(result.user.username);
      localStorage.setItem("user", result.user.username);
      navigate("/HomePage");
    } else {
      setMessage("Invalid username or password.");
    }

    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    const result = await register(username, password);

    if (result && result.token) {
      setMessage("Registration Successful!");
      setUser(result.user.username);
      localStorage.setItem("user", result.user.username);
      navigate("/HomePage");
    } else {
      setMessage("Registration failed. Username may already exist.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-greenbrand-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-12">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-greenbrand-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-greenbrand-500 to-greenbrand-700 text-white shadow-lg mb-4">
              <span className="text-3xl">🌱</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">EcoQuest</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{isRegistering ? 'Join the movement' : 'Welcome back'}</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Username</label>
              <input
                type="text"
                placeholder="eco_warrior"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-greenbrand-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-greenbrand-500 transition"
              />
            </div>

            <button
              onClick={isRegistering ? handleRegister : handleLogin}
              disabled={loading}
              className="w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-greenbrand-500 to-greenbrand-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                isRegistering ? 'Create Account' : 'Sign In'
              )}
            </button>

            <button
              onClick={() => { setIsRegistering(!isRegistering); setMessage(''); }}
              className="w-full py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-greenbrand-600 dark:hover:text-greenbrand-400 transition font-medium"
            >
              {isRegistering ? '← Back to Login' : "Don't have an account? Register"}
            </button>
          </div>

          {/* Message */}
          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${message.includes('Successful') ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'}`}>
              {message}
            </div>
          )}
        </div>

        {/* Footer text */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-8">
          By using EcoQuest, you agree to our <span className="text-greenbrand-600 hover:underline cursor-pointer">Terms of Service</span>
        </p>
      </div>
    </div>
  );
}