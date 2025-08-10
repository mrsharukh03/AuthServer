import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "../css/Login.module.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const navigate = useNavigate();

  // Email regex for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://192.168.1.4:8080/api/v1/auth/password/forget",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(response.data.message || "Check your email for reset instructions.");
      setEmail("");
      setTimeout(() => navigate("/login"), 4000);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (typeof err.response?.data === "string") {
        setError(err.response.data);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${style.body} d-flex justify-content-center align-items-center w-100 h-100`}>
      <div className="border p-3 m-3 mt-5 mb-5 rounded shadow bg-white w-100 w-sm-25" style={{ maxWidth: "400px" }}>
        <h2 className="text-center">Forgot Password</h2>

        {showWarning && (
          <div
            className="alert alert-warning alert-dismissible fade show text-center mt-3"
            role="alert"
          >
            Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setShowWarning(false)}
            ></button>
          </div>
        )}

        <form className="mt-4 w-100" style={{ maxWidth: 400 }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {message && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              {message}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
