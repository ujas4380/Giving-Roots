import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import '../../css/PatientLogin.css'; // Make sure this CSS exists

function PatientRegister({ updatePatient, updatePatientToken }) {
  const navigate = useNavigate();

  const [patient, setPatient] = useState({
    patientName: "",
    patientEmail: "",
    patientPhoneNumber: "",
    patientAdd: "",
    patientAge: "",
    patientGender: "",
    patientPassword: "",
  });

  const setData = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  const referesh = (e) => {
    e.preventDefault(); 
    patientRegister();
  };

  const patientRegister = async () => {
    console.log(patient);
    const pass1 = document.getElementById("password").value;
    const pass2 = document.getElementById("confirmPassword").value;

    try {
      if (
        pass1 === "" ||
        pass2 === "" ||
        patient.patientName === "" ||
        patient.patientEmail === "" ||
        patient.patientPhoneNumber === "" ||
        patient.patientAdd === "" ||
        patient.patientAge === "" ||
        patient.patientGender === "" ||
        patient.patientPassword === ""
      ) {
        return toast.error("Please fill all the details!", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
      }

      if (pass1 === pass2) {
        await axios.post("http://localhost:8888/patientSignup", patient).then((res) => {
          console.log(res);
          updatePatient(res.data.newPatient);
          updatePatientToken(res.data.token);

          navigate("/patientHome", { replace: true });
          return toast.success("Register Successfully", {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
          });
        });
      } else {
        toast.error("Please enter both passwords the same", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong", { theme: "colored" });
    }
  };

  return (
    <div className="register-page">
      <div className="container register-container">
        <div className="form-card card p-4 shadow rounded-4 mx-auto">
          <h3 className="text-center mb-4 text-dark">Patient Registration</h3>
          <form onSubmit={referesh}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="patientName"
                value={patient.patientName}
                onChange={setData}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                name="patientPhoneNumber"
                pattern="[6-9]\d{9}"
                maxLength={10}
                value={patient.patientPhoneNumber}
                onChange={setData}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="patientEmail"
                value={patient.patientEmail}
                onChange={setData}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="patientAdd"
                value={patient.patientAdd}
                onChange={setData}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Gender</label><br />
              <input type="radio" name="patientGender" value="Male" onChange={setData} /> Male
              <input type="radio" name="patientGender" value="Female" className="ms-3" onChange={setData} /> Female
            </div>

            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                name="patientAge"
                value={patient.patientAge}
                onChange={setData}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                name="patientPassword"
                value={patient.patientPassword}
                onChange={setData}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                name="confirmPassword"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default PatientRegister;
