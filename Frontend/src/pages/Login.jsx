import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import universityBg from "../assets/University.jpg.png";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://university-management-system-kx5w.onrender.com/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username: username.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        // Store login state
        localStorage.setItem("isLoggedIn", "true");

        // Optional: store username
        localStorage.setItem("username", username.trim());

        // Go to dashboard
        navigate("/dashboard");
      } else {
        setError(
          data.message || "Invalid username or password"
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Unable to connect to the backend server"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${universityBg})`,
      }}
    >
      <div className="login-overlay"></div>

      <div className="login-container">
        <div className="login-logo">🎓</div>

        <h1>University Management System</h1>

        <p className="login-subtitle">
          Sign in to access the university portal
        </p>

        <form onSubmit={handleLogin}>
          {/* Username */}
          <div className="login-form-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              autoComplete="username"
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          {/* Password */}
          <div className="login-form-group">
            <label>Password</label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          {/* Show Password */}
          <label className="show-password">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() =>
                setShowPassword((previous) => !previous)
              }
            />

            <span>Show Password</span>
          </label>

          {/* Error */}
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <div className="login-footer">
        University Management System
      </div>
    </div>
  );
}

export default Login;