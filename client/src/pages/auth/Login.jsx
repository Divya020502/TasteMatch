import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { showSuccess, showError } from "../../utils/toast";
import { loginUser } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      login(res.data.token, res.data.user);
      showSuccess("Welcome back");
      navigate("/");
    } catch {
      showError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your TasteMatch account</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              className="login-input"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <div className="login-links">
          <Link to="/forgot-password" className="login-link forgot-password">
            Forgot your password?
          </Link>
          <p>
            Don&apos;t have an account?{" "}
            <Link to="/register" className="login-link register-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
