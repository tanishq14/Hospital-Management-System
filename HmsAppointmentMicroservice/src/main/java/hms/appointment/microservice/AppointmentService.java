package hms.appointment.microservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private final RestTemplate restTemplate;
    
    public AppointmentService(AppointmentRepository appointmentRepository, RestTemplate restTemplate) {
        this.appointmentRepository = appointmentRepository;
        this.restTemplate = restTemplate;
    }

    public Long getAppointmentsByDoctorName(String doctorName) {
        String doctorServiceUrl = "http://localhost:8081/doctors/getDoctorId?name=" + doctorName;
        Long doctorId = restTemplate.getForObject(doctorServiceUrl, Long.class);
        System.out.println(doctorId);
        return doctorId;
    }
    
    public List<AppointmentEntity> getAppointmentsDetail(Long doctorId){
    	return appointmentRepository.getAppointmentsByDoctorId(doctorId);
    }

    // Update appointment status
    public boolean updateAppointmentStatus(Long appointmentId, String status) {
        return appointmentRepository.updateAppointmentStatus(appointmentId, status) > 0;
    }
    
    public int createAppointmentService(String name,Long doctorId,String doctorName) {
    	return appointmentRepository.createAppointmentRepo(name,doctorId,doctorName);
    }
    
    public List<Object> getPatientAppointmentService(String patientName){
    	return appointmentRepository.getPatientAppointmentRepo(patientName);
    }
}
