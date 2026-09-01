import { useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function Register({ onBackToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setMessage("");
    setError("");

    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.username?.[0] || "Registration failed"
        );
      }

      setMessage("Account created successfully!");
      setUsername("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Create Account</h1>

        <p className="login-subtitle">
          Join CourseHub
        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="login-button"
          onClick={handleRegister}
        >
          Register
        </button>

        {message && (
          <p className="success">{message}</p>
        )}

        {error && (
          <p className="error">{error}</p>
        )}

        <button
          className="cancel-button"
          onClick={onBackToLogin}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Register;