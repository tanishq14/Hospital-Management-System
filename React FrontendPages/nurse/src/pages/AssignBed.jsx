import React, { useEffect, useState } from "react";

const AssignBed = () => {
  const [patientId, setPatientId] = useState("");
  const [message, setMessage] = useState("");
  const [availableBeds, setAvailableBeds] = useState(0);

  const fetchAvailableBeds = () => {
    fetch("http://localhost:8084/nurse/availableBeds")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch available beds");
        return response.json();
      })
      .then((data) => setAvailableBeds(data))
      .catch((error) => console.error("Error fetching bed count:", error));
  };

  useEffect(() => {
    fetchAvailableBeds();
  }, []);

  const handleAssignBed = async () => {
    if (!patientId) {
      alert("Enter a valid Patient ID");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8084/nurse/assignBed?patientId=${patientId}`, {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setMessage(errorData?.message || "Failed to assign bed.");
        return;
      }

      const data = await response.text();
      setMessage(data);
      fetchAvailableBeds();

    } catch (error) {
      setMessage("Failed to assign bed.");
      console.error("Error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Assign Bed to Patient</h2>
      
      
      <p style={styles.counter}>Available Beds: <strong>{availableBeds}</strong></p>

      <input
        type="text"
        placeholder="Enter Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleAssignBed} style={styles.button}>Assign Bed</button>
      <p>{message}</p>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  counter: { fontSize: "18px", fontWeight: "bold", marginBottom: "10px" },
  input: { padding: "10px", fontSize: "16px", margin: "10px" },
  button: { padding: "10px", fontSize: "16px", backgroundColor: "#007bff", color: "white" },
};

export default AssignBed;