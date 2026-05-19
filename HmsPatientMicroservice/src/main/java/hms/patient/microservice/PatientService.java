package hms.patient.microservice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final RestTemplate restTemplate;

    public PatientService(PatientRepository patientRepository, RestTemplate restTemplate) {
        this.patientRepository = patientRepository;
        this.restTemplate = restTemplate;
    }

    public boolean registerPatient(PatientEntity patient) {
        return patientRepository.registerPatient(patient) > 0;
    }

    public PatientEntity loginPatient(String email, String password) {
        return patientRepository.loginPatient(email, password);
    }
    //calling controller API in doctor microservice.
    @SuppressWarnings("unchecked")
	public List<Object> fetchAvailableDoctors() {
        String doctorServiceUrl = "http://localhost:8081/doctors/available";
        return restTemplate.getForObject(doctorServiceUrl, List.class);
    }
    
    public int createAppointment(String name, Long doctorId, String doctorName) {
    	
    	String appointmentServiceUrl = "http://localhost:8082/appointments/createAppointment";

       PatientEntity requestBody = new PatientEntity(name, doctorId,doctorName);

        return restTemplate.postForObject(appointmentServiceUrl, requestBody, Integer.class);
    }
    
    @SuppressWarnings("unchecked")
	public List<Object> fetchallAppointments(String patientName){
    	String appointmentServiceUrl="http://localhost:8082/appointments/getPatientAppointment?patientName="+patientName;
    	return restTemplate.getForObject(appointmentServiceUrl, List.class);
    }
    
}
