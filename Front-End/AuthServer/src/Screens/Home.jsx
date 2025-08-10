import React, { useEffect, useState } from "react";
import Navbar from "../Components/NavBar";
import LoginModal from "../Components/LoginModal";
import { isAuthenticated } from "../Utils/auth";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [modalClosed, setModalClosed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated() && !modalClosed) {
      // User logged out and modal not closed yet => show modal once
      setShowLogin(true);
    }
  }, [modalClosed]);

  const handleCloseModal = () => {
    setShowLogin(false);
    setModalClosed(true);
  };

  return (
    <div>
      <Navbar />
      {showLogin && <LoginModal onClose={handleCloseModal} type="login" />}
    </div>
  );
};

export default Home;
