import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import { RiContactsBook3Line } from "react-icons/ri";
import { isAuthenticated, logout } from "../Utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  let isMounted = true;
  const checkLogin = async () => {
    const loggedIn = await isAuthenticated();
    if (isMounted) setIsLoggedIn(loggedIn);
  };
  checkLogin();
  return () => {
    isMounted = false;
  };
}, [location]);


  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      setIsLoggedIn(false);
      navigate("/home");
    } else {
      alert("Logout failed, try again.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-secondary navbar-light">
      <div className="container">
        {/* Logo and Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/home">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/022/951/462/small_2x/protection-shield-icon-antivirus-icon-png.png"
            alt="AuthServer Logo"
            height="35"
            draggable="false"
          />
          <span className="ms-2 fw-bold text-white">AuthServer</span>
        </Link>

        {/* Mobile toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu items */}
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link mx-2 text-white" to="#">
                <MdOutlineAddBox /> Post
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-2 text-white" to="#">
                <CiCircleInfo /> Alerts
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-2 text-white" to="#">
                <RiContactsBook3Line /> Contacts
              </Link>
            </li>

            <li className="nav-item ms-3">
              {isLoggedIn ? (
                <button onClick={handleLogout} className="btn btn-light text-dark">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="btn btn-primary text-white">
                  Signup
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
