import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { BallTriangle } from 'react-loader-spinner';
function DoctorAppointments({ updateDoctor, updateDoctorToken }) {
  const [pendingAppointment, setPendingAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData1] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      fetch('https://api.example.com/data')
        .then((response) => response.json())
        .then((result) => {
          setData1(result);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
          setLoading(false);
        });
    }, 2000); 
  }, []);


  useEffect(() => {
    getPendingAppointments();
  }, []);

  const getPendingAppointments = async () => {
    let token = localStorage.getItem("DoctorToken");
    token = JSON.parse(token);
    try {
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(
        "http://localhost:8888/doctor/getAllAppointment",
        headers
      );
      console.log(response);
      if (response) {
        setPendingAppointment(response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateAppointment = async (item) => {
    // console.log(item);
    const _id = item._id;
    // console.log(_id);
    let token = localStorage.getItem("DoctorToken");
    token = JSON.parse(token);
    console.log(token);
    try {
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      console.log(headers);
      const response = await axios.put(
        `http://localhost:8888/doctor/acceptAppointment/${_id}`,
        headers
      );
      console.log(response);
      if (response) {
        navigate("/doctorConfirmAppointments");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const rejectAppointment = async (item) => {
    const id = item._id;
    let token = localStorage.getItem("DoctorToken");
    token = JSON.parse(token);
    try {
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.delete(
        `http://localhost:8888/doctor/cancelAppointment/${id}`,
        headers
      );
      // navigate("/doctorConfirmAppointments");
      //window.location.reload(false);
      console.log(response);

      getPendingAppointments(); // changed
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <main>
        <nav class="navbar navbar-expand-lg bg-light fixed-top shadow-lg">
          <div class="container">
            <a class="navbar-brand mx-auto d-lg-none" href="index.html">
              Doctor Desk
              <strong class="d-block">Health Specialist</strong>
            </a>

            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav mx-auto">
                <a class="navbar-brand d-none d-lg-block" href="/home">
                  Doctor Desk
                  <strong class="d-block">Health Specialist</strong>
                </a>
                <li class="nav-item active">
                  <a class="nav-link" href="/doctorAppointments">
                    Pending Appointments
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/doctorConfirmAppointments">
                    Confirm Appointments
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="/doctorPatient">
                    Patients
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/doctorProfile">
                    My Profile
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="/doctor"
                    onClick={() => {
                      updateDoctor({});
                      updateDoctorToken({});
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <section style={{ padding: "15px" }}>
          <div class="flex">
            <div style={{ flex: "50%" }}>
              <h5>9am-12pm</h5>
            </div>
          </div>

          {loading ? (
            <div className="loader">
              <center><BallTriangle color="#007BFF" width={1500} size={100} loading={loading}></BallTriangle></center>
              <center><p>Loading...</p></center>
            </div>
          ) : (
            <table class="table">
              <thead class="table-success">
                <tr>
                  <th>Patient Name</th>
                  <th>Contact Number</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Disease</th>
                  <th>Date</th>

                  <th colspan="2" style={{ "text-align": "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingAppointment.map((item) => {
                  if (
                    item.TimeSlot === "9-12" &&
                    item.appointmentStatus === "Pending"
                  ) {
                    return (
                      <tr>
                        <td>{item.patient.patientName}</td>
                        <td>{item.patient.patientPhoneNumber}</td>
                        <td>{item.patient.patientAge}</td>
                        <td>{item.patient.patientGender}</td>
                        <td>{item.appointmentDiseases}</td>
                        <td>{item.bookingDate}</td>
                        <td>
                          <button
                            type="submit"
                            class="btn btn-success"
                            onClick={() => updateAppointment(item)}
                          >
                            Accept
                          </button>
                        </td>
                        <td>
                          <button
                            type="submit"
                            class="btn btn-danger"
                            onClick={() => rejectAppointment(item)}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          )}
        </section>
        <section style={{ padding: "15px" }}>
          <div class="flex">
            <div style={{ flex: "50%" }}>
              <h5>4pm-7pm</h5>
            </div>
          </div>

          {loading ? (
            <div className="loader">
              <center><BallTriangle color="#007BFF" width={1500} size={100} loading={loading}></BallTriangle></center>
              <center><p>Loading...</p></center>
            </div>
          ) : (
            <table class="table">
              <thead class="table-success">
                <tr>
                  <th>Patient Name</th>
                  <th>Contact Number</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Disease</th>
                  <th>Date</th>
                  <th colspan="2" style={{ "text-align": "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingAppointment.map((item) => {
                  if (
                    item.TimeSlot === "4-7" &&
                    item.appointmentStatus === "Pending"
                  ) {
                    return (
                      <tr>
                        <td>{item.patient.patientName}</td>
                        <td>{item.patient.patientPhoneNumber}</td>
                        <td>{item.patient.patientAge}</td>
                        <td>{item.patient.patientGender}</td>
                        <td>{item.appointmentDiseases}</td>
                        <td>{item.bookingDate}</td>
                        <td>
                          <button
                            type="submit"
                            class="btn btn-success"
                            onClick={() => updateAppointment(item)}
                          >
                            Accept
                          </button>
                        </td>
                        <td>
                          <button
                            type="submit"
                            class="btn btn-danger"
                            onClick={() => rejectAppointment(item)}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}

export default DoctorAppointments;
