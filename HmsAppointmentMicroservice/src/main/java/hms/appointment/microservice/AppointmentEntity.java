package hms.appointment.microservice;

public class AppointmentEntity {
    private Long id;
	private Long doctorId;  // Reference to Doctor
    private String patientName;
    private String status; // pending, accepted, rejected
    private String doctorName;

    public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
    public AppointmentEntity() {}

    public AppointmentEntity(Long id,Long doctorId, String patientName, String status) {
    	this.id=id;
        this.doctorId = doctorId;
        this.patientName = patientName;
        this.status = status;
    }
    
    public AppointmentEntity(Long id, String status, String doctorName) {
    	this.id=id;
    	this.status=status;
    	this.doctorName=doctorName;
    }
}
