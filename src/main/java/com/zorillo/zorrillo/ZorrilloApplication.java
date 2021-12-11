package com.zorillo.zorrillo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EntityScan(basePackages = ("com.zorrillo.zorillo"))
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class ZorrilloApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZorrilloApplication.class, args);
	}

	// Cross origin for CORS
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
                                        .allowedOrigins("/**") // poner http://localhost:8080 o /**                                        .allowedMethods("*")
                                        .allowedHeaders("*");
			}
		};
	}
}
