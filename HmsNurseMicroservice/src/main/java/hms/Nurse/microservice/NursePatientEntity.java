package hms.Nurse.microservice;

public class NursePatientEntity {
    private Long id;
	private String name;
    private String email;
    private String bloodPressure;
    private String bodyTemperature;
    private String heartRate;
    private String height;
    private String weight;
    private String medicines;
    
    
    public NursePatientEntity(Long id, String name, String email, String bloodPressure, String bodyTemperature,
			String heartRate, String height, String weight, String medicines) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.bloodPressure = bloodPressure;
		this.bodyTemperature = bodyTemperature;
		this.heartRate = heartRate;
		this.height = height;
		this.weight = weight;
		this.medicines = medicines;
	}
    
    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getBloodPressure() {
		return bloodPressure;
	}
	public void setBloodPressure(String bloodPressure) {
		this.bloodPressure = bloodPressure;
	}
	public String getBodyTemperature() {
		return bodyTemperature;
	}
	public void setBodyTemperature(String bodyTemperature) {
		this.bodyTemperature = bodyTemperature;
	}
	public String getHeartRate() {
		return heartRate;
	}
	public void setHeartRate(String heartRate) {
		this.heartRate = heartRate;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getWeight() {
		return weight;
	}
	public void setWeight(String weight) {
		this.weight = weight;
	}
	public String getMedicines() {
		return medicines;
	}
	public void setMedicines(String medicines) {
		this.medicines = medicines;
	}
	

   
}

