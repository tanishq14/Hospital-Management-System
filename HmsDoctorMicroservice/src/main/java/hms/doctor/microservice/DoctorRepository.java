package hms.doctor.microservice;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

@Repository
public class DoctorRepository{
	private final JdbcTemplate jdbcTemplate;

    public DoctorRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    

    // Fetch all doctors
    public List<DoctorEntity> findAll() {
        String sql = "SELECT * FROM doctors";
        return jdbcTemplate.query(sql, (rs, rowNum) -> new DoctorEntity(
            rs.getLong("id"),
            rs.getString("name"),
            rs.getString("specialization")
        ));
    }

    // Insert a new doctor
    public int save(DoctorEntity doctor) {
    	BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    	String hashedPassword = passwordEncoder.encode(doctor.getPassword());
    	String sql = "INSERT INTO doctors (name, specialization, password, email, YOE) VALUES (?, ?, ?, ?, ?)";
    	return jdbcTemplate.update(sql, doctor.getName(), doctor.getSpecialization(), hashedPassword, doctor.getEmail(), doctor.getYoe());
    }
    
    @SuppressWarnings("deprecation")
	public List<String> checkByName(String name) {
    	String sql="SELECT name FROM doctors WHERE name =?";
    	return jdbcTemplate.queryForList(sql, new Object[]{name}, String.class);
    }
    
    @SuppressWarnings("deprecation")
	public List<Map<String, Object>> checkLoginCreds(String name, String password){
    	String sql="SELECT name , password FROM doctors WHERE LOWER(name)=LOWER(?)";
    	return jdbcTemplate.queryForList(sql,new Object[]{name});
    }
    
    @SuppressWarnings("deprecation")
	public Long getDoctorIdByName(String name) {
        String sql = "SELECT id FROM doctors WHERE name = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{name}, Long.class);
    }
    
    public int updateDoctorStatus(String status,Long id) {
        String sql = "UPDATE doctors SET status = ? WHERE id = ?"; 
        return jdbcTemplate.update(sql, status, id);
    }
    
    public List<DoctorEntity> getAvailableDoctors() {
    	String sql = "SELECT id, name, specialization, yoe, status FROM doctors";
        return jdbcTemplate.query(sql, (rs, rowNum) -> new DoctorEntity(
            rs.getLong("id"),
            rs.getString("name"),
            rs.getString("specialization"),
            rs.getInt("yoe"),
            rs.getString("status")
        ));
    }
    
}
