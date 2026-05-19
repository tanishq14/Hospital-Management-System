import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPatient from "./pages/LoginPatient";
import RegisterPatient from "./pages/RegisterPatient";
import WelcomePatient from "./pages/WelcomePatient";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import PatientAppointments from "./pages/PatientAppointments";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPatient />} />
        <Route path="/register" element={<RegisterPatient />} />
        <Route path="/welcome" element={<WelcomePatient />} />
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
        <Route path="/past-bookings" element={<PatientAppointments />} />
      </Routes>
    </Router>
  );
}

export default App;