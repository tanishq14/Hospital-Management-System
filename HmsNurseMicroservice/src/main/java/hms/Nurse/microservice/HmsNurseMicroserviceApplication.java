package hms.Nurse.microservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class,
    JdbcTemplateAutoConfiguration.class
})
@EnableDiscoveryClient
public class HmsNurseMicroserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(HmsNurseMicroserviceApplication.class, args);
    }
}
