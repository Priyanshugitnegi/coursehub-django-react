function Login({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
  error,
  onRegister,
}) {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>CourseHub</h1>
        <p className="login-subtitle">Login to your account</p>

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
          onClick={handleLogin}
        >
          Login
        </button>

        

        {error && <p className="error">{error}</p>}

        <p className="register-text">
  Don't have an account?
</p>

<button
  className="cancel-button"
  onClick={onRegister}
>
  Create Account
</button>
      </div>
    </div>
  );
}

export default Login;