package hms.doctor.microservice;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "*") 
@RequestMapping("/doctors")
public class DoctorController {

	@Autowired
	private DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping("/all")
    public List<DoctorEntity> getAllDoctorsAPI() {
        System.out.println("Inside all API");
        return doctorService.getAllDoctors();
     }
    
    
    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity<String> createDoctorAPI(@RequestBody DoctorEntity doctor) {
    	System.out.println("inside create API");
        int result= doctorService.createDoctor(doctor);
        if(result>0) {
        	return ResponseEntity.ok("Doctor created successfully");
        }
        else {
        	return ResponseEntity.status(500).body("Error creating doctor");
        }
    }
    
    @GetMapping("/doctorLoginCheck")
    @ResponseBody
    public ResponseEntity<?> checkDoctorLoginAPI(@RequestParam String name, @RequestParam String password) {
    	int result=doctorService.checkDoctorLogin(name,password);
    	if (result>0) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid name or password");
        }
    }
    
    @GetMapping("/getDoctorId")
    public ResponseEntity<Long> getDoctorIdByName(@RequestParam String name) {
        Long doctorId = doctorService.getDoctorIdByName(name);
        return ResponseEntity.ok(doctorId);
    }
    
    @PatchMapping("/updateStatus")
    public ResponseEntity<String> updateStatusAPI(@RequestParam String status, @RequestParam Long id){
    	boolean updateDoctorStatus=doctorService.updateDoctorStatus(status,id);
    	if(updateDoctorStatus) {
    		return ResponseEntity.ok("Doctor status updated");
        } else {
            return ResponseEntity.badRequest().body("Failed to update doctor status");
        }
    }
    
    @GetMapping("/available")
    public ResponseEntity<List<DoctorEntity>> getAvailableDoctors() {
        List<DoctorEntity> avaliableDoctor = doctorService.getAvailableDoctors();
        return ResponseEntity.ok(avaliableDoctor);
    }
    
}
