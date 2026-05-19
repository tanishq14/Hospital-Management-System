package hms.Nurse.microservice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/nurse")
public class NurseController {
    private final NurseService nurseService;

    public NurseController(NurseService nurseService) {
        this.nurseService = nurseService;
    }

    @GetMapping("/getPatient")
    public ResponseEntity<NursePatientEntity> getPatient(@RequestParam Long id) {
    	NursePatientEntity patientDetails=nurseService.getPatient(id);
        return ResponseEntity.ok(patientDetails);
    }

    @PutMapping("/updatePatient")
    public ResponseEntity<String> updatePatient(@RequestBody NursePatientEntity patient) {
        boolean success = nurseService.updatePatientRecord(patient);
        return success ? ResponseEntity.ok("Patient record updated") : ResponseEntity.badRequest().body("Update failed");
    }
    
    @PostMapping("/assignBed")
    public ResponseEntity<String> assignBed(@RequestParam Long patientId) {
        String response = nurseService.assignBedToPatient(patientId);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/availableBeds")
    public ResponseEntity<Integer> getAvailableBedsCount() {
        int count = nurseService.getAvailableBedsCount();
        return ResponseEntity.ok(count);
    }
}
