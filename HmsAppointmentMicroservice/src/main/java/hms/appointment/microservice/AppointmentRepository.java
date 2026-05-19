package hms.appointment.microservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public class AppointmentRepository {
	
	@Autowired
	private final JdbcTemplate jdbcTemplate;

    public AppointmentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
	
    @SuppressWarnings("deprecation")
	public List<AppointmentEntity> getAppointmentsByDoctorId(Long doctorId) {
        String sql = "SELECT * FROM appointments WHERE doctor_id = ?";
        return jdbcTemplate.query(sql, new Object[]{doctorId}, (rs, rowNum) ->
                new AppointmentEntity(rs.getLong("id"),rs.getLong("doctor_id"),rs.getString("patient_name"), rs.getString("status")));
    }
    
    public int updateAppointmentStatus(Long appointmentId, String status) {
        String sql = "UPDATE appointments SET status = ? WHERE id = ?"; 
        return jdbcTemplate.update(sql, status, appointmentId);
    }
    
    public int createAppointmentRepo(String name, Long doctorId,String doctorName) {
    	String sql = "INSERT INTO appointments (patient_name, doctor_id, status, doctor_name) VALUES (?, ?, 'pending',?)";
    	return jdbcTemplate.update(sql,name,doctorId,doctorName);
    }
    
    @SuppressWarnings("deprecation")
	public List<Object> getPatientAppointmentRepo(String patientName){
    	String sql="SELECT id, status, doctor_name FROM appointments WHERE patient_name=?";
    	return jdbcTemplate.query(sql, new Object[] {patientName},(rs,rowNum)->new AppointmentEntity(rs.getLong("id"),rs.getString("status"),rs.getString("doctor_name")));
    }
}
