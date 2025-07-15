import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import '../../css/PatientNavbar.css';

function PatientNavbar({ updatePatient, updatePatientToken }) {
  const handleLogout = () => {
    toast.success("Logout Successfully", {
      position: "top-right",
      autoClose: 1500,
      theme: "colored",
    });
    updatePatient({});
    updatePatientToken({});
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light fixed-top shadow-lg">
      <ToastContainer />
      <div className="container">
        <a className="navbar-brand mx-auto d-lg-none" href="/Patienthome">
          Doctor Desk
          <strong className="d-block">Health Specialist</strong>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <a className="navbar-brand d-none d-lg-block" href="/Patienthome">
              Doctor Desk
              <strong className="d-block">Health Specialist</strong>
            </a>
            <li className="nav-item"><a className="nav-link" href="/patientAppointment">Appointment</a></li>
            <li className="nav-item"><a className="nav-link" href="/patientAppointmentHistory">Appointment History</a></li>
            <li className="nav-item"><a className="nav-link" href="/Patienthome#contact">Contact</a></li>
            <li className="nav-item"><a className="nav-link" href="/Patienthome#about">About</a></li>
            <li className="nav-item"><a className="nav-link" href="/patientProfile">Profile</a></li>
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default PatientNavbar;
