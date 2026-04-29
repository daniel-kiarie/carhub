import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // State for UI error messages
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(""); // Clear previous errors

    try {
      // CRITICAL: Use relative path so Vite Proxy works correctly
      const { data } = await axios.post(
        "/api/auth/login", 
        { email, password },
        { timeout: 5000 } // 5 second timeout to prevent infinite hanging
      );

      login(data);
      console.log("Logged in user:", data);

      // Redirect based on role
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error);
      
      let message = "Login failed";
      if (error.code === 'ECONNABORTED') {
        message = "Server timed out. Is the backend running?";
      } else if (error.response) {
        message = error.response.data.message || "Invalid credentials";
      } else {
        message = "Cannot connect to server. Check your connection.";
      }
      
      setErrorMsg(message);
      alert(message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome Back</h2>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              placeholder="email@example.com"
              required
              disabled={loading}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-gray-100"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              placeholder="••••••••"
              required
              disabled={loading}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-gray-100"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded-lg font-bold transition-all shadow-md ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-slate-900 hover:bg-slate-800 active:scale-95"
            }`}
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;