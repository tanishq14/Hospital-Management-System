package hms.patient.microservice;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PatientRepository {

    private final JdbcTemplate jdbcTemplate;

    public PatientRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Register a new patient
    public int registerPatient(PatientEntity patient) {
        String sql = "INSERT INTO patients (name, email, password) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, patient.getName(), patient.getEmail(), patient.getPassword());
    }

    // Authenticate patient login
    @SuppressWarnings("deprecation")
	public PatientEntity loginPatient(String email, String password) {
        String sql = "SELECT * FROM patients WHERE email = ? AND password = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{email, password}, 
            (rs, rowNum) -> new PatientEntity(
                rs.getLong("id"), 
                rs.getString("name"), 
                rs.getString("email"), 
                rs.getString("password")
            ));
    }
}
