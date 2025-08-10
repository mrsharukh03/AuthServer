import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "../css/App.module.css"; // Optional if you're using the same background

function EmailVerification() {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const verifyEmail = async () => {
    try {
      const response = await axios.post("http://192.168.1.4:8080/api/v1/auth/email-verify", {
  token: token, // from route param or state
}, {
  headers: {
    "Content-Type": "application/json",
  }
});


      setStatus("✅ " + response.data.message + " Redirecting to login...");
      setIsSuccess(true);

      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data ||
        error.message ||
        "Something went wrong during verification.";
      setStatus(`${msg}`);
      setIsSuccess(false);
    }
  };

  verifyEmail();
}, [token, navigate]);


  return (
    <div className={`${style.body} d-flex justify-content-center align-items-center w-100 h-100`}>
      <div className="border p-4 m-3 rounded shadow bg-white w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center">Email Verification</h2>

        <div
          className={`alert mt-4 text-center ${
            isSuccess === null
              ? "alert-info"
              : isSuccess
              ? "alert-success"
              : "alert-danger"
          }`}
          role="alert"
        >
          {status}
        </div>

        <div className="text-center mt-3">
          {isSuccess === false && (
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/resend-verification")}
            >
              Resend Verification Email
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
