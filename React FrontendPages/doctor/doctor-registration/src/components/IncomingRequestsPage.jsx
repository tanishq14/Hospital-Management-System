import React, { useEffect, useState } from "react";

const IncomingRequestsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState(null);

  useEffect(() => {
    const storedDoctorName = localStorage.getItem("doctorName");
    if (!storedDoctorName) {
      console.error("Doctor Name not found! Redirecting to login.");
      window.location.href = "/";
      return;
    }

    // Fetch Doctor ID using name
    fetch(`http://localhost:8081/doctors/getDoctorId?name=${storedDoctorName}`)
      .then((response) => response.json())
      .then((doctorId) => {
        setDoctorId(doctorId); // Update doctorId state
      })
      .catch((error) => console.error("Error fetching doctor ID:", error));
  }, []);

  useEffect(() => {
    if (doctorId) {
      fetch(`http://localhost:8082/appointments/getDoctorAppointment?doctorId=${doctorId}`)
        .then((response) => response.json())
        .then((data) => {
          const pendingAppointments = data.filter((appt) => appt.status === "pending");
          setAppointments(pendingAppointments);
        })
        .catch((error) => console.error("Error fetching appointments:", error));
    }
  }, [doctorId]);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const response = await fetch(
        `http://localhost:8082/appointments/${appointmentId}/status?status=${status}`, 
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update status: ${errorText}`);
      }

      
      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt.id === appointmentId ? { ...appt, status } : appt
        )
      );
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Incoming Requests</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="4">No pending requests.</td>
            </tr>
          ) : (
            appointments.map((appt) => (
              <tr key={appt.id} style={styles.listItem}>
                <td>{appt.id}</td>
                <td>{appt.patientName}</td>
                <td>{appt.status}</td>
                <td>
                  {appt.status === "pending" && (
                    <>
                      <button
                        style={styles.button}
                        onClick={() => handleUpdateStatus(appt.id, "accepted")}
                      >
                        Accept
                      </button>
                      <button
                        style={styles.rejectButton}
                        onClick={() => handleUpdateStatus(appt.id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// Inline styles
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
  button: {
    marginLeft: "10px",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  rejectButton: {
    marginLeft: "10px",
    padding: "10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default IncomingRequestsPage;