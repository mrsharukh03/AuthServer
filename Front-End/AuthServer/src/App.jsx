import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import style from './css/App.module.css';
import Login from './Screens/Login';
import TestPage from './TestPage';
import ProtectedRoute from './ProtectedRoute';
import EmailVerification from './Components/EmailVerification';
import ResendVerification from './Components/ResendVerification';
import Home from './Screens/Home';
import ForgetPassword from './Components/ForgetPassword';
import NotFound from './Screens/NotFound';
import AccountRecovery from './Components/AccountRecovery';

const App = () => {
  return (
      <div className={`${style.body} pt-5 mt-3`}>
         <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email-verify/:token" element={<EmailVerification />} />
          <Route path="/resend-verification" element={<ResendVerification />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<AccountRecovery />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TestPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test"
            element={
              <ProtectedRoute>
                <TestPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
  );
};

export default App;
