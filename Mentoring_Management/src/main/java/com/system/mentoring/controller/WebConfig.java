package com.system.mentoring.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Absolute path to mentors-images folder
        Path imageDir = Paths.get("mentors-images");
        String imagePath = imageDir.toFile().getAbsolutePath();

        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:" + imagePath + "/");
    }

}
