import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [doctor, setDoctor] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:8081/doctors/doctorLoginCheck?name=${doctor.name}&password=${doctor.password}`);

      if (!response.ok) {
        throw new Error("Invalid name or password");
      }

      const data = await response.json;
      console.log(data);
      if (data) {
        localStorage.setItem("doctorName",doctor.name);
        navigate("/Welcome");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("Login failed. Check your name and password.");
      console.error(error);
    }
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  return (
    <div style={styles.container}>
      <h2>Doctor Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={doctor.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={doctor.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
        <button type="button" onClick={handleRegister} style={styles.registerButton}>New Registration</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
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
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  registerButton: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default Login;