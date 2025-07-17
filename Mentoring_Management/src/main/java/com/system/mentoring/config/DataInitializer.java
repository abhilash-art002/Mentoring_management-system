package com.system.mentoring.config;

import com.system.mentoring.entity.Role;
import com.system.mentoring.entity.User;
import com.system.mentoring.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initAdminUser(UserRepository userRepository) {
        return args -> {
            String defaultAdminEmail = "admin@gmail.com";

            // Check if admin user already exists
            if (userRepository.findByEmail(defaultAdminEmail).isEmpty()) {
                User admin = new User();
                admin.setName("Admin User");
                admin.setEmail(defaultAdminEmail);
                admin.setPassword("admin"); // Consider encoding this in production
                admin.setProfileImage("default1.jpg");
                admin.setRole(Role.ADMIN);

                userRepository.save(admin);
                System.out.println("✅ Default Admin user inserted.");
            } 
        };
    }
}
