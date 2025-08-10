import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Signin from "../Components/Signin";
import Signup from "../Components/Signup";
import style from "../css/Login.module.css";
import { isAuthenticated } from "../Utils/auth";

function Login() {
  const [isSignin, setIsSignin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await isAuthenticated();
      if (loggedIn) {
        navigate("/home", { replace: true });
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className={`${style.body} d-flex justify-content-center align-items-center w-100 h-100`}>
      <div className="border p-3 m-3 mt-5 mb-5 rounded shadow bg-white w-100 w-sm-25" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-3">
          <img
            id="AuthServerLogo"
            src="https://static.vecteezy.com/system/resources/thumbnails/022/951/462/small_2x/protection-shield-icon-antivirus-icon-png.png"
            alt="AuthServer Logo"
            draggable="false"
            height="55"
          />
        </div>

        {isSignin ? <Signin switchForm={setIsSignin} /> : <Signup switchForm={setIsSignin} />}
      </div>
    </div>
  );
}

export default Login;
