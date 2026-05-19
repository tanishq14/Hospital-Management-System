package hms.Nurse.microservice;
public class BedEntity {
    private Long bedId;
    private String status;
    private Long patientId;

    public BedEntity() {}

    public BedEntity(Long bedId, String status, Long patientId) {
        this.bedId = bedId;
        this.status = status;
        this.patientId = patientId;
    }

    public Long getBedId() { return bedId; }
    public void setBedId(Long bedId) { this.bedId = bedId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }
}