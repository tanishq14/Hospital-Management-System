import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePatient = () => {
  const navigate = useNavigate();
  const patientName = localStorage.getItem("patientName");

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Welcome, {patientName}</h2>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate("/book-appointment")}>
          Book Appointment
        </button>
        <button style={styles.button} onClick={() => navigate("/past-bookings")}>
          Past Appointments
        </button>
      </div>
    </div>
  );
};


const styles = {
  container: {
    width: "350px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
    backgroundColor: "white",
  },
  header: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
  },
};

export default WelcomePatient;
