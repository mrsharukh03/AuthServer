import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../Utils/axiosConfig"; // axios instance with withCredentials: true
import { BsFillLightningChargeFill } from "react-icons/bs";

function AccountRecovery() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("");
  const [formError, setFormError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 Direct Login Handler
  const handleDirectLogin = async () => {
    setStatus("Logging in...");
    setFormError("");
    try {
      const response = await axios.post(
        "/api/v1/auth/direct-login",
        { token },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setStatus("✅ " + response.data.message + " Redirecting to home...");
      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data ||
        error.message ||
        "Something went wrong during login.";
      setStatus(`${msg}`);
    }
  };

  // 🔁 Reset Password Handler
  const handleResetPassword = async () => {
    setFormError("");
    setStatus("");

    if (!password || password.length < 6) {
      setFormError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const resetRes = await axios.post(
  "/api/v1/auth/password/reset",
  { password, token },  // ✅ now both sent
  {
    headers: { "Content-Type": "application/json" },
  }
);

      setStatus("✅ " + resetRes.data.message + " Redirecting to home...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err.message ||
        "Failed to reset password.";
      setFormError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="border p-4 rounded shadow bg-white"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center">Secure Access</h2>

        {status && (
          <div
            className={`alert text-center mt-3 ${
              status.startsWith("✅") ? "alert-success" : "alert-danger"
            }`}
          >
            {status}
          </div>
        )}

        {/* ✅ Direct Login BUTTON - OUTSIDE FORM */}
        <div className="d-grid gap-2 mt-3">
          <button
            type="button" // 🔥 Very important
            className="btn bg-warning text-danger d-flex align-items-center justify-content-center gap-2"
            onClick={handleDirectLogin}
            disabled={loading}
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                <BsFillLightningChargeFill />
                Direct Login
              </>
            )}
          </button>
        </div>

        <hr />

        {/* ✅ Reset Password FORM */}
        <form className="mt-3">
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Re-enter new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          {formError && (
            <div className="alert alert-danger">{formError}</div>
          )}

          <button
          onClick={handleResetPassword}
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AccountRecovery;
