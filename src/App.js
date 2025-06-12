import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientLogin from './pages/patient/PatientLogin';
import SuccessPage from './pages/patient/SuccessPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientLogin />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
