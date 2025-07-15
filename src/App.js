import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientLogin from './pages/patient/PatientLogin';
import SuccessPage from './pages/patient/SuccessPage';
import PatientHome from './pages/patient/PatientHome';
import 'bootstrap/dist/css/bootstrap.min.css';
import PatientProfile from './pages/patient/PatientProfile';
import PatientRegister from './pages/patient/PatientRegister';
import PatientAppointmentBook from './pages/patient/PatientAppointmentBook';
import PatientAppointmentHistory from './pages/patient/PatientAppointmentHistory';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminLogin from './pages/Admin/AdminLogin';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorLogin from './pages/Doctor/DoctorLogin';
import DoctorPatient from './pages/Doctor/DoctorPatient';
import DoctorRegister from './pages/Doctor/DoctorRegister';
import DoctorConfirmAppointments from './pages/Doctor/DoctorConfirmAppointments';
import Prescription from './pages/Doctor/Prescription';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import ViewDoctor from './pages/Admin/ViewDoctor';


function App() {
  const [patient, setPatient] = useState({});
  const [patientToken, setPatientToken] = useState({});
  const [doctor, setDoctor] = useState({});
  const [doctorToken, setDoctorToken] = useState({});
  const [admin, setAdmin] = useState({});
  const [adminToken, setAdminToken] = useState({});

  useEffect(() => {
    setPatient(JSON.parse(localStorage.getItem("MyPatient")));
    setPatientToken(JSON.parse(localStorage.getItem("PatientToken")));
  }, []);

  const updatePatient = (patient) => {
    localStorage.setItem("MyPatient", JSON.stringify(patient));
    setPatient(patient);
  };

  const updatePatientToken = (token) => {
    localStorage.setItem("PatientToken", JSON.stringify(token));
    setPatientToken(token);
  };

  const updateDoctorToken = (token) => {
    localStorage.setItem("DoctorToken", JSON.stringify(token));
    setDoctorToken(token);
  };

  const updateDoctor = (doctor) => {
    localStorage.setItem("Doctor", JSON.stringify(doctor));
    setDoctor(doctor);
  };

  const updateAdminToken = (token) => {
    localStorage.setItem("AdminToken", JSON.stringify(token));
    setAdminToken(token);
  };

  const updateAdmin = (admin) => {
    localStorage.setItem("Admin", JSON.stringify(admin));
    setAdmin(admin);
  };

  return (
    <Router>
      <Routes>
        {/* Patient Routes */}
        <Route path="/" element={<PatientLogin updatePatient={updatePatient} updatePatientToken={updatePatientToken} />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/patientProfile" element={<PatientProfile updatePatient={updatePatient} updatePatientToken={updatePatientToken} />} />
        <Route path="/patientRegister" element={<PatientRegister updatePatient={updatePatient} updatePatientToken={updatePatientToken} />} />
        <Route path="/patientAppointment" element={<PatientAppointmentBook />} />
        <Route path="/patientAppointmentHistory" element={<PatientAppointmentHistory />} />
        <Route path="/patientHome" element={<PatientHome updatePatient={updatePatient} updatePatientToken={updatePatientToken} />} />

        {/* Admin Conditional Route */}
        {
          admin && admin._id
            ? <Route path="/admin" element={<AdminDashboard updateAdmin={updateAdmin} updateAdminToken={updateAdminToken} />} />
            : <Route path="/admin" element={<AdminLogin updateAdmin={updateAdmin} updateAdminToken={updateAdminToken} />} />
        }
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/viewDoctor" element={<ViewDoctor updateAdmin={updateAdmin} updateAdminToken={updateAdminToken} />} />

        {/* Doctor Conditional Route */}
        {
          doctor && doctor._id
            ? <Route path="/doctor" element={<DoctorAppointments updateDoctor={updateDoctor} updateDoctorToken={updateDoctorToken} />} />
            : <Route path="/doctor" element={<DoctorLogin updateDoctor={updateDoctor} updateDoctorToken={updateDoctorToken} />} />
        }
        <Route path="/doctorRegister" element={<DoctorRegister />} />
        <Route path="/doctorLogin" element={<DoctorLogin />} />
        <Route path="/doctorHome" element={<DoctorAppointments updateDoctor={updateDoctor} updateDoctorToken={updateDoctorToken} />} />
        <Route path="/doctorPatient" element={<DoctorPatient updateDoctor={updateDoctor} updateDoctorToken={updateDoctorToken} />} />
        <Route path="/doctorAppointments" element={<DoctorAppointments />} />
        <Route path="/doctorConfirmAppointments" element={<DoctorConfirmAppointments updateDoctor={updateDoctor} updateDoctorToken={updateDoctorToken} />} />
        <Route path="/makePrescription" element={<Prescription updateDoctor={updateDoctor} updateDoctorToken={updateDoctorToken} />} />
        <Route path="/doctorProfile" element={<DoctorProfile updateDoctor={updateDoctor} updateDoctorToken={updateDoctorToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
