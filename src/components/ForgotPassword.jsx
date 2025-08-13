import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/tokens/forgot-password",
        { email }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Error: " + err.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="text-center my-5 border rounded shadow p-5 w-100 w-lg-50 mx-auto">
        <h2>Forgot your password?</h2>
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2 my-3"
        >
          <label htmlFor="email" className="visually-hidden">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
            style={{ maxWidth: "300px" }}
          />
          <button className="btn btn-dark" type="submit">
            Send Reset Link
          </button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default ForgotPassword;
