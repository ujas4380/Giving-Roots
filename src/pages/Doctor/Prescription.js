// import { addmedicine } from '../../css/addmedicine.js'
// import '../../css/addmedicine.css'
import React, { useState } from 'react';
import { NavLink, Navigate, useNavigate, useLocation } from "react-router-dom";
import { saveAs } from 'file-saver';
import axios from "axios";

function Prescription() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        patientName: '',
        patientNumber: 0,
        patientAge: 0,
        MedicineName: '',
        Dosage: '',
        Duration: '',
        specialIntro: '',
    });

    const location = useLocation();
    console.log(location.state.item)
    const patient = location.state.item;
    console.log(patient);
    const patientName = patient.patient.patientName;
    const patientNUmber = patient.patient.patientPhoneNumber;
    const patientAge = patient.patient.patientAge;
    const _id = patient._id
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value });
    };


    const createAndDownloadPdf = async () => {
        console.log("Data", data);
        axios
            .post('http://localhost:8888/create-pdf', data)
            .then((res) => {
                // const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                // saveAs(pdfBlob, 'newPdf.pdf');
                let token = localStorage.getItem("DoctorToken");
                token = JSON.parse(token);
                try {
                    const headers = { headers: { Authorization: `Bearer ${token}` } };
                    const response = axios.delete(
                        `http://localhost:8888/doctor/cancelAppointment/${_id}`,
                        headers
                    );
                    navigate("/doctorConfirmAppointments");

                    console.log(response);
                } catch (error) {
                    console.log("error", error);
                }
                console.log(res);
            });
    };

    var counter = 1

    return (
        <div>
            <section class="h-100 h-custom">
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-lg-8 col-xl-6">
                            <div class="card rounded-3">

                                <div class="card-body p-4 p-md-5">

                                    <h1>Prescription Form</h1>


                                    <div class="form-group">
                                        <label for="patientName">Patient Name:</label>
                                        <input type="text" class="form-control"
                                            id="patientName"
                                            name="patientName"
                                            // value={patient.patient.patientName}
                                            onChange={handleChange}
                                            required /><br />
                                    </div>




                                    <div class="form-group">
                                        <label for="patientPhoneNumber">Patient Phone Number:</label>
                                        <input type="tel" class="form-control"
                                            id="patientPhoneNumber"
                                            name="patientNumber"
                                            // value={patientNUmber}
                                            onChange={handleChange}
                                            required /><br />
                                    </div>


                                    <h2 id="counter"> Medicines:1</h2>


                                    <label for="medication1Name">Medication 1 Name:</label>
                                    <input type="text" class="form-control"
                                        onChange={handleChange}
                                        id="medication1Name"
                                        name="MedicineName" required /><br />

                                    <div class="form-group">
                                        <label for="medication1Dosage">Dosage:</label>
                                        <input type="text" class="form-control"
                                            onChange={handleChange} id="Dosage" 
                                            name="Dosage" required /><br />
                                    </div>



                                    <div class="form-group">
                                        <label for="medication1Duration">Duration:</label>
                                        <input type="text" id="medication1Duration"
                                            class="form-control"
                                            onChange={handleChange} name="Duration" required /><br />

                                    </div>


                                    <div class="form-group">
                                        <label for="specialInstructions">Special Instructions:</label>
                                        <textarea id="specialInstructions"
                                            onChange={handleChange}
                                            class="form-control" name="specialIntro" rows="4"></textarea><br />
                                    </div>
                                    <input type="submit" className="btn btn-primary" onClick={() => createAndDownloadPdf()} value="Submit" />
                                    {/* <button className="btn btn-primary" onClick={addmedicine}>Add medicine</button> */}



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Prescription