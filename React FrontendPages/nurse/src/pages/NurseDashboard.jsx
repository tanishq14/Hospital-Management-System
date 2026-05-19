import React from "react";
import { useNavigate } from "react-router-dom";

const NurseDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Welcome Nurse</h2>
      <button style={styles.button} onClick={() => navigate("/update-patient")}>
        Update Patient Record
      </button>
      <button style={styles.button} onClick={() => navigate("/assign-bed")}>
        Assign Bed to Patient
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px",
  },
};

export default NurseDashboard;
