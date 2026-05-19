import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPatient = () => {
  const [patient, setPatient] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8083/patients/login?email=${patient.email}&password=${patient.password}`,
        { method: "POST" }
      );

      if (!response.ok) {
        throw new Error("Invalid login");
      }

      const data = await response.json();
      localStorage.setItem("patientName", data.name);
      localStorage.setItem("patientId", data.id);
      navigate("/welcome");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Patient Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.loginButton}>Login</button>
        <button type="button" onClick={() => navigate("/register")} style={styles.registerButton}>
          New Registration
        </button>
      </form>
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
  },
  loginButton: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  registerButton: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default LoginPatient;