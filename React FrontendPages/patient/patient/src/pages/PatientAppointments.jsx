import React, { useEffect, useState } from "react";

const PatientAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const patientName = localStorage.getItem("patientName"); // Retrieve logged-in patient ID

  useEffect(() => {
    fetch(`http://localhost:8083/patients/getAppointments?patientName=${patientName}`)
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  return (
    <div style={styles.container}>
      <h2>My Appointments</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Doctor Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="3">No appointments found.</td>
            </tr>
          ) : (
            appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.id}</td>
                <td>{appt.doctorName}</td>
                <td style={{ color: getStatusColor(appt.status) }}>{appt.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "orange";
    case "accepted":
      return "green";
    case "rejected":
      return "red";
    default:
      return "black";
  }
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
};

export default PatientAppointmentsPage;
