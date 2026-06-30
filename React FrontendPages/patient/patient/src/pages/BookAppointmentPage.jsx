import React, { useEffect, useState } from "react";

const BookAppointmentPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const patientName = localStorage.getItem("patientName"); // Retrieve logged-in patient ID

  const fetchDoctors = () => {
    fetch("http://localhost:8083/patients/availableDoctors") //
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error fetching doctors:", error));
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleBookAppointment = async (doctorId,doctorName) => {
    try {
      const response = await fetch(
        `http://localhost:8083/patients/bookAppointment?name=${patientName}&doctorId=${doctorId}&doctorName=${doctorName}`,
        { method: "POST" }
      );

      if (!response.ok) {
        throw new Error("Failed to book appointment");
      }

      setMessage("Appointment booked successfully!");
      setMessageType("success");
      fetchDoctors(); // Refresh the doctor list after booking
    } catch (error) {
      setMessage("Failed to book appointment. Please try again.");
      setMessageType("error");
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Book Appointment</h2>
      {message && (
        <p style={messageType === "success" ? styles.successMessage : styles.errorMessage}>
          {message}
        </p>
      )}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Years of Experience</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.length === 0 ? (
            <tr>
              <td colSpan="5">No doctors available.</td>
            </tr>
          ) : (
            doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.name}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.yoe}</td>
                <td style={{ color: doctor.status === "busy" ? "red" : "green" }}>
                  {doctor.status}
                </td>
                <td>
                  {doctor.status === "free" ? (
                    <button style={styles.button} onClick={() => handleBookAppointment(doctor.id,doctor.name)}>
                      Book
                    </button>
                  ) : (
                    <span style={styles.disabledText}>Busy</span>
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
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  disabledText: {
    color: "gray",
    fontWeight: "bold",
  },
  successMessage: {
    color: "green",
    fontSize: "14px",
    marginTop: "10px",
  },
  errorMessage: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
  },
};

export default BookAppointmentPage;