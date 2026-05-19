import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterDoctor from "./components/RegisterDoctor";
import Login from "./components/Login";
import WelcomePage from "./components/WelcomePage";
import IncomingRequestsPage from "./components/IncomingRequestsPage";
import AcceptedRequestsPage from "./components/AcceptedRequestsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<RegisterDoctor />} />
        <Route path="/Welcome" element={<WelcomePage />} />
        <Route path="/incoming-requests" element={<IncomingRequestsPage />} />
        <Route path="/accepted-requests" element={<AcceptedRequestsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
