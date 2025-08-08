import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/tokens/reset-password",
        {
          token,
          newPassword,
        }
      );
      toast.success("Password reset successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container text-center mt-5 border rounded shadow p-5">
      <h2>Reset your password</h2>
      <form onSubmit={handleSubmit}>
        <div
          className="position-relative mx-auto mb-4"
          style={{ maxWidth: "400px" }}
        >
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="form-control"
            required
          />
          <i
            className={`bi ${
              showPassword ? "bi-eye-slash" : "bi-eye"
            } position-absolute top-50 end-0 translate-middle-y me-3`}
            onClick={() => setShowPassword(!showPassword)}
            style={{
              cursor: "pointer",
              fontSize: "1.2rem",
              zIndex: 5,
            }}
          ></i>
        </div>
        <button type="submit" className="btn btn-dark">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
