package hms.doctor.microservice;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class DoctorService {
	
	@Autowired
	private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    // Fetch all doctors
    public List<DoctorEntity> getAllDoctors() {
        return doctorRepository.findAll();
    }

    // Create a new doctor
    public int createDoctor(DoctorEntity doctor) {
    	List<String> doctorExists=doctorRepository.checkByName(doctor.getName());
    	if(!doctorExists.isEmpty()) {
    		return 0;
    	}
    	else {
    		return doctorRepository.save(doctor);
    	}
    }
   
    //Login
    public int checkDoctorLogin(String name, String password) {
    	BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    	List<Map<String, Object>> creds = doctorRepository.checkLoginCreds(name, password);
    	if (!creds.isEmpty()) {
    	    Map<String, Object> firstResult = creds.get(0);
    	    String getName = (String) firstResult.get("name");
    	    String storedHashedPassword = (String) firstResult.get("password");
    	    boolean passwordMatches = passwordEncoder.matches(password, storedHashedPassword);

    	    if (!getName.equalsIgnoreCase(name) || !passwordMatches) {
    	        return 0;
    	    } 
    	    else {
    	        return 1;
    	    }
    	} 
    	else {
    	    return 0;
    	}
    }
    
    //Get Doctor by Name
    public Long getDoctorIdByName(String name) {
        return doctorRepository.getDoctorIdByName(name);
    }
    
    public boolean updateDoctorStatus(String status, Long id) {
    	return doctorRepository.updateDoctorStatus(status,id)>0;
    }
    
    public List<DoctorEntity> getAvailableDoctors() {
        return doctorRepository.getAvailableDoctors();
    }
}
