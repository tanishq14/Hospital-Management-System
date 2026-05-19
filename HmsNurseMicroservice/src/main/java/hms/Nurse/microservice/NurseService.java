package hms.Nurse.microservice;

import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class NurseService {
    private final NurseRepository nurseRepository;

    public NurseService(NurseRepository nurseRepository) {
        this.nurseRepository = nurseRepository;
    }

    public NursePatientEntity getPatient(Long id) {
        return nurseRepository.getPatientById(id);
    }

    public boolean updatePatientRecord(NursePatientEntity patient) {
        return nurseRepository.updatePatient(patient) > 0;
    }
    
    public String assignBedToPatient(Long patientId) {
        
        if (!nurseRepository.doesPatientExist(patientId)) {
            return "Error: Patient ID " + patientId + " does not exist!";
        }

        
        Optional<Long> availableBed = nurseRepository.findAvailableBed();
        if (availableBed.isPresent()) {
            nurseRepository.assignBed(availableBed.get(), patientId);
            return "Bed " + availableBed.get() + " assigned to Patient " + patientId;
        } else {
            return "No beds available";
        }
    }
    
    public int getAvailableBedsCount() {
        return nurseRepository.countAvailableBeds();
    }
}
