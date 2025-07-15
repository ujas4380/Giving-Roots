function DoctorHome(){
    return( 
        <div>


<main>

<nav class="navbar navbar-expand-lg bg-light fixed-top shadow-lg">
    <div class="container">
       <a class="navbar-brand mx-auto d-lg-none" href="index.html">
           Doctor Desk
            <strong class="d-block">Health Specialist</strong>
        </a> 

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto">
            
                
                <a class="navbar-brand d-none d-lg-block" href="/home">
                    Doctor Desk
                    <strong class="d-block">Health Specialist</strong>
                </a>
                <li class="nav-item active">
                    <a class="nav-link" href="/doctorAppointments">Pending Appointments</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/doctorConfirmAppointments">Confirm Appointments</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/doctorPatient">Patients</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/doctorLogout">Logout</a>
                </li>

               
            </ul>
        </div>

    </div>
</nav>

</main>
        </div>
    )
}

export default DoctorHome;