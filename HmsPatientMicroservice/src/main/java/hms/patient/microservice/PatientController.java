package hms.patient.microservice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/patients")
public class PatientController {

    private final PatientService patientService;
    private final RestTemplate restTemplate;

    public PatientController(PatientService patientService, RestTemplate restTemplate) {
        this.patientService = patientService;
        this.restTemplate = restTemplate;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerPatient(@RequestBody PatientEntity patient) {
        boolean success = patientService.registerPatient(patient);
        return success ? ResponseEntity.ok("Patient registered successfully") :
                         ResponseEntity.status(500).body("Registration failed");
    }

    @PostMapping("/login")
    public ResponseEntity<PatientEntity> loginPatient(@RequestParam String email, @RequestParam String password) {
        PatientEntity patient = patientService.loginPatient(email, password);
        return patient != null ? ResponseEntity.ok(patient) : ResponseEntity.status(401).build();
    }
    @GetMapping("/availableDoctors")
    public ResponseEntity<List<Object>> getAvailableDoctors() {
        List<Object> doctors = patientService.fetchAvailableDoctors();
        return ResponseEntity.ok(doctors);
    }
    
    @PostMapping("/bookAppointment")
    public ResponseEntity<?> createPatientAppointmentAPI(@RequestParam String name, @RequestParam Long doctorId,@RequestParam String doctorName){
    	int response = patientService.createAppointment(name,doctorId,doctorName);
    	if(response>0) {
    		return ResponseEntity.ok("Appointment Created");
    	}
    	else {
    		return ResponseEntity.status(500).body("Appointment failed to create");
    	}
    }
    
    @GetMapping("/getAppointments")
    public ResponseEntity<List<Object>> getPatientAppointmentsAPI(@RequestParam String patientName) {
        List<Object> doctors = patientService.fetchallAppointments(patientName);
        return ResponseEntity.ok(doctors);
    }
}
