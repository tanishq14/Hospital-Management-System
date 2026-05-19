import React, { useState } from "react";

const PatientDetails = () => {
  const [patientId, setPatientId] = useState("");
  const [patientData, setPatientData] = useState({
    name: "",
    email: "",
    bloodPressure: "",
    bodyTemperature: "",
    heartRate: "",
    height: "",
    weight: "",
    medicines: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPatientData = async () => {
    if (!patientId) {
      alert("Please enter a Patient ID.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:8084/nurse/getPatient?id=${patientId}`);
      if (!response.ok) throw new Error("Patient not found.");
      
      const data = await response.json();
      
      if (!data || Object.keys(data).length === 0) {
        throw new Error("No data available for this patient.");
      }

      setPatientData(data);
    } catch (error) {
      setError(error.message);
      setPatientData({
        name: "",
        email: "",
        bloodPressure: "",
        bodyTemperature: "",
        heartRate: "",
        height: "",
        weight: "",
        medicines: "",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!patientData) {
      alert("No patient data to update.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8084/nurse/updatePatient`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: patientId, ...patientData }),
      });

      if (response.ok) {
        alert("Patient record updated successfully!");
      } else {
        alert("Failed to update patient record.");
      }
    } catch (error) {
      console.error("Error updating patient record:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Patient Details</h2>

      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          style={styles.input}
        />
        <button onClick={fetchPatientData} style={styles.button}>
          {loading ? "Fetching..." : "Fetch Details"}
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.form}>
        <label><strong>ID:</strong> {patientId || "N/A"}</label>
        <input type="text" placeholder="Name" value={patientData.name} readOnly style={styles.input} />
        <input type="text" placeholder="Email" value={patientData.email} readOnly style={styles.input} />
        <input type="text" placeholder="Blood Pressure" value={patientData.bloodPressure}
          onChange={(e) => setPatientData({ ...patientData, bloodPressure: e.target.value })}
          style={styles.input}
        />
        <input type="text" placeholder="Body Temperature" value={patientData.bodyTemperature}
          onChange={(e) => setPatientData({ ...patientData, bodyTemperature: e.target.value })}
          style={styles.input}
        />
        <input type="text" placeholder="Heart Rate" value={patientData.heartRate}
          onChange={(e) => setPatientData({ ...patientData, heartRate: e.target.value })}
          style={styles.input}
        />
        <input type="text" placeholder="Height" value={patientData.height}
          onChange={(e) => setPatientData({ ...patientData, height: e.target.value })}
          style={styles.input}
        />
        <input type="text" placeholder="Weight" value={patientData.weight}
          onChange={(e) => setPatientData({ ...patientData, weight: e.target.value })}
          style={styles.input}
        />
        <input type="text" placeholder="Medicines" value={patientData.medicines}
          onChange={(e) => setPatientData({ ...patientData, medicines: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleUpdate} style={styles.updateButton}>Update Details</button>
      </div>
    </div>
  );
};


const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  inputGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    alignItems: "center",
  },
  input: {
    display: "block",
    width: "60%",
    margin: "10px auto",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  updateButton: {
    marginTop: "15px",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
  },
  form: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "5px",
    width: "50%",
    margin: "20px auto",
    textAlign: "left",
  },
};

export default PatientDetails;