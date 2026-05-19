import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterDoctor = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
    password:"",
    email:"",
    yoe:0
  });
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await fetch("http://localhost:8081/doctors/create", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(doctor),
        });

        if (!response.ok) {
            throw new Error("Failed to register doctor");
        }

        // Set success message
        setMessage(`Doctor registered successfully!`);

        // Clear input fields
        setDoctor({ name: "", specialization: "", password: "", email: "", yoe:"" });

        // Wait 1 second, then navigate to login page
        setTimeout(() => {
            navigate("/");
        }, 1000);

        } catch (error) {
        setMessage("Error registering doctor. Please try again.");
        console.error(error);
        }
    };

  return (
    <div style={styles.container}>
      <h2>Doctor Registration</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
          type="text" 
          name="name" 
          placeholder="Doctor's Name" 
          value={doctor.name} 
          onChange={handleChange} 
          required
          style={styles.input}
        />
        <input 
          type="text" 
          name="specialization" 
          placeholder="Specialization" 
          value={doctor.specialization} 
          onChange={handleChange} 
          required
          style={styles.input}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="password" 
          value={doctor.password} 
          onChange={handleChange} 
          required
          style={styles.input}
        />
        <input 
          type="text" 
          name="email" 
          placeholder="Email" 
          value={doctor.email} 
          onChange={handleChange} 
          required
          style={styles.input}
        />
        <input 
          type="number" 
          name="yoe" 
          placeholder="Year's of Experience" 
          value={doctor.yoe} 
          onChange={handleChange} 
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    width: "300px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default RegisterDoctor;
