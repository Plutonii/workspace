package ru.plutonii.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by plutonii on 28.04.17.
 */
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"ru.plutonii.controller"})
public class MVCConfig extends WebMvcConfigurerAdapter{
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("PUT", "DELETE", "POST", "GET", "OPTIONS")
                .allowedHeaders("Content-Type", "Accept", "X-Requested-With", "token")
                .exposedHeaders("token")
                .allowCredentials(false).maxAge(3600);
    }
}