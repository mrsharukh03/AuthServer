import { FaGithub, FaGoogle, FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styles from "../css/Login.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { isAuthenticated } from "../Utils/auth";

function Signup({switchForm}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoginMessage, setSocialLoginMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
  const checkAuth = async () => {
    const loggedIn = await isAuthenticated();
    if (loggedIn) {
      navigate("/home");
    }
  };
  checkAuth();
}, [navigate]);


  useEffect(() => {
    if (socialLoginMessage) {
      const timer = setTimeout(() => setSocialLoginMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [socialLoginMessage]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setServerError("");
  };

  const validate = () => {
    const newErrors = {};
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) newErrors.name = "Please enter your name";
    if (!form.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.password.trim()) {
      newErrors.password = "Please enter your password";
    } else if (!strongPasswordRegex.test(form.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number and special character";
    }
    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      setServerError("");
      setSuccessMessage("");
      const response = await axios.post(
        "http://192.168.1.4:8080/api/v1/auth/signup",
        {
          fullName: form.name,
          email: form.email,
          password: form.password,
        }
      );

      setLoading(false);
      setSuccessMessage(response.data.message);
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
      setServerError("");
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.message) {
        setServerError(error.response.data.message);
      } else if (typeof error.response?.data === "string") {
        setServerError(error.response.data);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    }
  };

  const handleSocialClick = (provider) => {
    setSocialLoginMessage(`Registration with ${provider} is under progress...`);
  };

  return (
      <div
        className={`${styles.container} container`}
      >
        <div className="row align-items-center">
        <h3 className="col-12 ps-3 text-center">Sign up </h3>
      </div>

        {socialLoginMessage && (
          <div className="alert alert-info text-center mt-3" role="alert">
            {socialLoginMessage}
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success text-center mt-3" role="alert">
            {successMessage}
          </div>
        )}

        {serverError && (
          <div className="alert alert-danger text-center mt-3" role="alert">
            {serverError}
          </div>
        )}

        <form className="row mt-3" onSubmit={handleSubmit}>
          <div className="col-12 col-xl-8 mb-3 mx-auto">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            <p style={{ color: "red" }}>{errors.name}</p>
          </div>

          <div className="col-12 col-xl-8 mb-3 mx-auto">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <p style={{ color: "red" }}>{errors.email}</p>
          </div>

          <div className="col-12 col-xl-8 mb-3 mx-auto">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <p style={{ color: "red" }}>{errors.password}</p>
          </div>

          <div className="col-12 col-xl-8 mb-3 mx-auto">
            <input
              type="password"
              className="form-control border"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
            />
            <p style={{ color: "red" }}>{errors.confirmPassword}</p>
          </div>

          <div className="col-12 col-xl-8 mx-auto mb-3">
            <div className="row">
              <Link
                to="/resend-verification"
                className="text-center mb-3"
              >
                 Verify email
              </Link>
              <Link
                className="text-center mb-3"
              onClick={() => switchForm(true)}>
                 Existing user? Login
              </Link>
            </div>
              <div className="col-12 d-flex justify-content-center">
  <button
    type="submit"
    className="btn btn-primary w-75"
    disabled={loading}
  >
    {loading ? (
      <>
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        ></span>
        Creating account
      </>
    ) : (
      "Signup"
    )}
  </button>
</div>

          </div>

          <div className="d-flex justify-content-center align-items-center">
              <button
                type="button" className="btn"
                onClick={() => handleSocialClick("Google")}
              ><FaGoogle size={23} /></button>
              <button
                type="button" className="btn"
                onClick={() => handleSocialClick("GitHub")}
              ><FaGithub size={23} /></button>
          </div>
        </form>
      </div>
  );
}

export default Signup;
