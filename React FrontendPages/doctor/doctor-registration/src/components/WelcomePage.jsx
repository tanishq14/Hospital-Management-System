import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const storedDoctorName = localStorage.getItem("doctorName");
    if (!storedDoctorName) {
      navigate("/"); // Redirect to login if not logged in
    } else {
      setDoctorName(storedDoctorName);
    }
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2>Welcome, Dr. {doctorName}</h2>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate("/incoming-requests")}>
          Incoming Requests
        </button>
        <button style={styles.button} onClick={() => navigate("/accepted-requests")}>
          Accepted/Completed Requests
        </button>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
    alignItems: "center",
  },
  button: {
    padding: "15px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "250px",
    textAlign: "center",
  },
};

export default WelcomePage;