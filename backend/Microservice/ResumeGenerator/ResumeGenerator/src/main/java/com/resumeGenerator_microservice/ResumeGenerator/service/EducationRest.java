package com.resumeGenerator_microservice.ResumeGenerator.service;

import com.resumeGenerator_microservice.ResumeGenerator.model.Education;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class EducationRest {

    @Value("${education.baseUrl}")
    private String educationBaseUrl;

    @Value("${education.getEducationEndpoint}")
    private String getEducationEndpoint;

    @Autowired
    private RestTemplate restTemplate;

    public List<Education> fetchDataFromEducationService(int userId) {
        String ExperienceService = educationBaseUrl + getEducationEndpoint + userId;
        Education[] data = restTemplate.getForObject(ExperienceService, Education[].class);
        return Arrays.asList(data);
    }
}
