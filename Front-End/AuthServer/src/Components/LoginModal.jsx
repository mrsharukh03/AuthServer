import React from "react";
import ReactDOM from "react-dom";
import Login from "../Screens/Login";
import Signup from "./Signup";

const LoginModal = ({ onClose, type = "login" }) => {
  const modalContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        color: "white",
        paddingTop: "15rem",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          padding: "1px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "600px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-1rem",
            right: "5px",
            border: "none",
            background: "transparent",
            fontSize: "3rem",
            cursor: "pointer",
            zIndex: 10000,
          }}
        >
          &times;
        </button>

        {type === "signup" ? <Signup /> : <Login />}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default LoginModal;
