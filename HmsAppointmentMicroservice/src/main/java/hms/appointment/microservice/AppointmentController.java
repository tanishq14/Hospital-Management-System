package hms.appointment.microservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("/appointments")
public class AppointmentController {

	private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    // Get doctor appointments using doctor's name
    @GetMapping("/doctor")
    public ResponseEntity<Long> getDoctorAppointments(@RequestParam String name) {
        Long appointments = appointmentService.getAppointmentsByDoctorName(name);
        return ResponseEntity.ok(appointments);
    }
    
    @GetMapping("/getDoctorAppointment")
    public ResponseEntity<List<AppointmentEntity>> doctorAppointmentsAPI(@RequestParam Long doctorId){
    	List<AppointmentEntity> pendingAppointments=appointmentService.getAppointmentsDetail(doctorId);
    	return ResponseEntity.ok(pendingAppointments);
    }
    
    // Update appointment status
    @PatchMapping("/{appointmentId}/status")
    public ResponseEntity<String> updateAppointmentStatus(@PathVariable Long appointmentId, @RequestParam String status) {
        boolean updated = appointmentService.updateAppointmentStatus(appointmentId, status);
        if (updated) {
            return ResponseEntity.ok("Appointment status updated");
        } else {
            return ResponseEntity.badRequest().body("Failed to update appointment status");
        }
    }
    
    @PostMapping("/createAppointment")
    public ResponseEntity<Integer> createAppointmentAPI(@RequestBody PatientEntity request){
        int response = appointmentService.createAppointmentService(request.getName(), request.getDoctorId(), request.getDoctorName());

        return response > 0 ? ResponseEntity.ok(response) :
                              ResponseEntity.badRequest().body(0);
    }
    
    @GetMapping("/getPatientAppointment")
    public ResponseEntity<List<Object>> getAppointmentsforPatient(@RequestParam String patientName){
    	List<Object> appointments=appointmentService.getPatientAppointmentService(patientName);
    	return ResponseEntity.ok(appointments);
    }
}
