import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "../css/App.module.css";

function ResendVerification() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.1.4:8080/api/v1/auth/email-verify/resend",
        {email},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(response.data.message || "Verification email sent successfully.");
      setEmail("");
      setTimeout(() => navigate("/login"), 4000);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError("Email not found. Please check and try again.");
        } else if (err.response.status === 429) {
          setError("Too many requests. Please wait before trying again.");
        } else {
          setError(err.response.data.message || "An unexpected error occurred.");
        }
      } else {
        setError("Unable to connect to the server. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${style.body} d-flex justify-content-center align-items-center w-100 h-100`}>
      <div className="border p-3 m-3 mt-5 mb-5 rounded shadow bg-white w-100 w-sm-25" style={{ maxWidth: "400px" }}>
        <h2 className="text-center">Email Verification</h2>

        {/* 🔔 Dismissible Warning Alert */}
        {showWarning && (
          <div className="alert alert-warning alert-dismissible fade show text-center mt-3" role="alert">
            To verify your email address, enter your email below and we’ll send you a verification link.
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
            />
          </div>

          {/* ✅ Success Message */}
          {message && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              {message}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}

          {/* ❌ Error Message */}
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Sending..." : "Resend Verification Link"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResendVerification;
