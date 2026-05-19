import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NurseDashboard from "./pages/NurseDashboard";
import UpdatePatientRecord from "./pages/UpdatePatientRecord";
import AssignBed from "./pages/AssignBed";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NurseDashboard />} />
        <Route path="/update-patient" element={<UpdatePatientRecord />} />
        <Route path="/assign-bed" element={<AssignBed />} />
      </Routes>
    </Router>
  );
};

export default App;
