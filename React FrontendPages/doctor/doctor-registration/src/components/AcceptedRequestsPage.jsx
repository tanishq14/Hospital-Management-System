import React, { useEffect, useState } from "react";

const AcceptedRequestsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const storedDoctorName = localStorage.getItem("doctorName");

  useEffect(() => {
    if (!storedDoctorName) {
      console.error("Doctor Name not found! Redirecting to login.");
      window.location.href = "/";
      return;
    }

    // Fetch Doctor ID using name
    fetch(`http://localhost:8081/doctors/getDoctorId?name=${storedDoctorName}`)
      .then((response) => response.json())
      .then((id) => setDoctorId(id))
      .catch((error) => console.error("Error fetching doctor ID:", error));
  }, []);

  useEffect(() => {
    if (doctorId) {
      fetch(`http://localhost:8082/appointments/getDoctorAppointment?doctorId=${doctorId}`)
        .then((response) => response.json())
        .then((data) => {
          const acceptedAppointments = data.filter((appt) => appt.status === "accepted");
          setAppointments(acceptedAppointments);
        })
        .catch((error) => console.error("Error fetching appointments:", error));
    }
  }, [doctorId]); // Fetch appointments only when doctorId is available

  
  const handleFreeSchedule = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/doctors/updateStatus?status=free&id=${doctorId}`,
        { method: "PATCH" }
      );

      if (!response.ok) {
        throw new Error("Failed to update doctor status.");
      }

      alert("Your schedule is now free!");
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Accepted Requests</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="3">No accepted requests.</td>
            </tr>
          ) : (
            appointments.map((appt) => (
              <tr key={appt.id} style={styles.listItem}>
                <td>{appt.id}</td>
                <td>{appt.patientName}</td>
                <td>{appt.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {appointments.length > 0 && (
        <button style={styles.freeButton} onClick={handleFreeSchedule}>
          Free Schedule
        </button>
      )}
    </div>
  );
};


const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  table: {
    width: "80%",
    margin: "auto",
    borderCollapse: "collapse",
  },
  listItem: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  freeButton: {
    marginTop: "20px",
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AcceptedRequestsPage;