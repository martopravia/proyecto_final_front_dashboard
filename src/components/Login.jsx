import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useApi } from "../hooks/useApi";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useApi();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { token, user } = await loginUser({ email, password });
      if (token && user.role === "admin") {
        navigate("/admin");
        toast.success("Login successful!");
      }
    } catch (error) {
      console.error("Invalid credentials:", error);
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center ">
      <div className="row w-100 mx-1">
        <div className="d-lg-flex w-100 justify-content-center">
          <div className="col-12 col-lg-6 mb-4  me-lg-3 border rounded shadow p-5 ">
            <h3 className="text-center">Admin Login</h3>
            <form action="input" onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  * Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="admin@test.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">
                  <div>* Password </div>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-control mb-2"
                  placeholder="admin"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i
                  className={`bi ${
                    showPassword ? "bi-eye-slash" : "bi-eye"
                  } position-absolute`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    top: "50%",
                    right: "10px",
                    cursor: "pointer",
                    transform: "translateY(-50%)",
                    fontSize: "1.2rem",
                  }}
                ></i>
                <p>
                  <Link to="/forgot-password">Forgot your password?</Link>
                </p>
              </div>
              <button type="submit" className="btn btn-dark w-100 mt-3">
                Login
              </button>
            </form>
          </div>

          {/* Register */}
        </div>
      </div>
    </div>
  );
};

export default Login;
