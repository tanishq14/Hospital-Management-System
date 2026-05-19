package hms.doctor.microservice;


public class DoctorEntity {

    private Long id;
    private String name;
    private String specialization;
	private String password;
    private String email;
    private int yoe;
    private String status;


    public DoctorEntity(Long id, String name, String specialization) {
        this.id = id;
        this.name = name;
        this.specialization = specialization;
    }
    public DoctorEntity(Long id, String name, String specialization,int yoe,String status) {
        this.id = id;
        this.name = name;
        this.specialization = specialization;
        this.yoe=yoe;
        this.status=status;
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

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
    public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	public int getYoe() {
		return yoe;
	}

	public void setYoe(int yoe) {
		this.yoe = yoe;
	}
	
	public void setStatus(String status) {
		this.status=status;
	}
	public String getStatus() {
		return status;
	}

	public DoctorEntity() {
    }
    @Override
    public String toString() {
        return "DoctorEntity [id=" + id + ", name=" + name + ", specialization=" + specialization + "]";
    }
}
