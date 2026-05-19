package hms.appointment.microservice;

public class PatientEntity {
	private String name;
    private Long doctorId;
    private String doctorName;

   
    public String getDoctorName() {
		return doctorName;
	}


	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}


	public PatientEntity(String name, Long doctorId, String doctorName) {
        this.name = name;
        this.doctorId = doctorId;
        this.doctorName=doctorName;
    }

    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }
}
