import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/PatientLogin.css';
function PatientLogin() {
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPassword, setPatientPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // reset error on submit

    try {
      const response = await axios.post("http://localhost:8888/api/patientSignin", {
        patientEmail,
        patientPassword
      });
      if (response.status === 200) {
        toast.success("Login successful!", { autoClose: 1000 });
        setTimeout(() => {
          navigate('/patientHome');
        }, 1500);
      }
    } catch (error) {
      console.error(error);
    //   setErrorMessage(error.response?.data?.error || "Invalid credentials");
      toast.error("Invalid Credentials", { autoClose: 1000 })
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <h1>Doctor Desk</h1>
        <h2>Patient Portal</h2>
        <p>Access your appointments, prescriptions, and health data securely.</p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2920/2920277.png"
          alt="Doctor Illustration"
        />
      </div>

      <div className="login-right">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Patient Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={patientEmail}
            onChange={(e) => setPatientEmail(e.target.value)}
            required
            className="login-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={patientPassword}
            onChange={(e) => setPatientPassword(e.target.value)}
            required
            className="login-input"
          />

          <div className="forgot-password">
          </div>
          {errorMessage && <div className="login-error">{errorMessage}</div>}

          <button type="submit" className="login-button">Login</button>

          <div className="signup-link">
            New user? <a href="/patientRegister">Sign up</a>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default PatientLogin;
