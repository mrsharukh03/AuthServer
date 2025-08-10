import { useState, useEffect } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "../css/Login.module.css";
import axios from "../Utils/axiosConfig";

function Signin({ switchForm }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [socialLoginMessage, setSocialLoginMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (socialLoginMessage) {
      const timer = setTimeout(() => setSocialLoginMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [socialLoginMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "", server: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Please enter your password";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        "http://192.168.1.4:8080/api/v1/auth/login",
        form,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setForm({ email: "", password: "" });
      setErrors({});
      setSuccessMessage("Login successful! Redirecting...");
      setLoading(false);

      setTimeout(() => {
        if (location.pathname === "/home") {
          window.location.reload();
        } else {
          navigate("/home", { replace: true });
        }
      }, 1500);
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrors({ server: error.response.data.message });
      } else {
        setErrors({ server: "Something went wrong. Please try again later." });
      }
    }
  };

  const handleSocialClick = (provider) => {
    setSocialLoginMessage(`Login with ${provider} is under progress...`);
  };

  return (
    <div className={`${styles.container} container w-75`}>
      <div className="row align-items-center">
        <h3 className="col-12 ps-3 text-center">Sign in </h3>
      </div>

      {socialLoginMessage && (
        <div className="alert alert-info text-center mt-3">{socialLoginMessage}</div>
      )}

      {successMessage && (
        <div className="alert alert-success text-center mt-3">{successMessage}</div>
      )}

      <form className="row mt-3" onSubmit={handleSubmit}>
        <div className="col-12 mx-auto mt-5 mb-5">
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            disabled={loading || successMessage}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div className="col-12 mx-auto mb-5">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            disabled={loading || successMessage}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        {errors.server && (
          <div className="col-12 mx-auto mb-3">
            <p style={{ color: "red", textAlign: "center" }}>{errors.server}</p>
          </div>
        )}

        <div className="col mx-auto mb-3">
          <div className="d-flex justify-content-between">
            <Link to="/forget-password">Forget Password</Link>
            <Link onClick={() => switchForm(false)}>Create Account</Link>
          </div>
        </div>

        <div className="col-12 col-xl-8 mx-auto">
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading || successMessage}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Signing...
              </>
            ) : (
              "Login"
            )}
          </button>
        </div>

        <div className="d-flex justify-content-center align-items-center mt-3">
          <button
            type="button"
            className="btn"
            onClick={() => handleSocialClick("Google")}
            disabled={loading || successMessage}
          >
            <FaGoogle size={23} />
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => handleSocialClick("GitHub")}
            disabled={loading || successMessage}
          >
            <FaGithub size={23} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signin;
