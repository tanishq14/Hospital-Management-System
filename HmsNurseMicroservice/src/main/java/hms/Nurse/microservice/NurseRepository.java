package hms.Nurse.microservice;

import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class NurseRepository {
    private final JdbcTemplate jdbcTemplate;
    private final JdbcTemplate secondaryJdbcTemplate;

    public NurseRepository(JdbcTemplate jdbcTemplate, JdbcTemplate secondaryJdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.secondaryJdbcTemplate = secondaryJdbcTemplate;
    }

    @SuppressWarnings("deprecation")
	public NursePatientEntity getPatientById(Long id) {
    	String sql = "SELECT * FROM patients WHERE id = ?";
        
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, (rs, rowNum) -> {
            Long patientId = rs.getLong("id");

            return new NursePatientEntity(
                patientId,
                rs.getString("name"),
                rs.getString("email"),
                rs.getString("BloodPressure") != null ? rs.getString("BloodPressure") : "N/A",
                rs.getString("BodyTemperature") != null ? rs.getString("BodyTemperature") : "N/A",
                rs.getString("HeartRate") != null ? rs.getString("HeartRate") : "N/A",
                rs.getString("Height") != null ? rs.getString("Height") : "N/A",
                rs.getString("Weight") != null ? rs.getString("Weight") : "N/A",
                rs.getString("Medicines") != null ? rs.getString("Medicines") : "None"
            );
        });
    }

    public int updatePatient(NursePatientEntity patient) {
        String sql = "UPDATE patients SET BloodPressure = ?, BodyTemperature = ?, HeartRate = ?, Height = ?, Weight = ?, Medicines = ? WHERE id = ?";
        return jdbcTemplate.update(sql, patient.getBloodPressure(), patient.getBodyTemperature(), patient.getHeartRate(),
            patient.getHeight(), patient.getWeight(), patient.getMedicines(), patient.getId());
    }
    
    public boolean doesPatientExist(Long patientId) {
        String sql = "SELECT COUNT(*) FROM patients WHERE id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, patientId);
        return count != null && count > 0;
    }
    
    public Optional<Long> findAvailableBed() {
        String sql = "SELECT bed_id FROM bed_management_db.beds WHERE status = 'available' LIMIT 1";
        return secondaryJdbcTemplate.query(sql, rs -> {
            if (rs.next()) return Optional.of(rs.getLong("bed_id"));
            return Optional.empty();
        });
    }
    public int assignBed(Long bedId, Long patientId) {
        String sqlUpdateBed = "UPDATE bed_management_db.beds SET status = 'occupied', patient_id = ? WHERE bed_id = ?";
        String sqlUpdatePatient = "UPDATE patients SET assigned_bed_id = ? WHERE id = ?";
        
        jdbcTemplate.update(sqlUpdatePatient, bedId, patientId);
        return secondaryJdbcTemplate.update(sqlUpdateBed, patientId, bedId);
    }
    
    public int countAvailableBeds() {
        String sql = "SELECT COUNT(*) FROM bed_management_db.beds WHERE status = 'available'";
        return secondaryJdbcTemplate.queryForObject(sql, Integer.class);
    }
}
