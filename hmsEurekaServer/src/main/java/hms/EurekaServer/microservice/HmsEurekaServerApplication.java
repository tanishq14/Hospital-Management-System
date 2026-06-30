package hms.EurekaServer.microservice;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableEurekaServer
public class HmsEurekaServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(HmsEurekaServerApplication.class, args);
	}

	@Bean
	public CommandLineRunner logDashboardUrl() {
		return args -> System.out.println("Eureka Dashboard available at: http://localhost:8761");
	}

}
