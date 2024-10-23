package com.resumeGenerator_microservice.ResumeGenerator.service;

import com.resumeGenerator_microservice.ResumeGenerator.model.Experience;
import com.resumeGenerator_microservice.ResumeGenerator.model.Skills;
import com.resumeGenerator_microservice.ResumeGenerator.model.Summary;
import org.aspectj.lang.reflect.LockSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class ExperienceRest {

    @Value("${experience.baseUrl}")
    private String experienceBaseUrl;

    @Value("${experience.getExperienceEndpoint}")
    private String getExperienceEndpoint;

    @Value("${experience.getSkillEndpoint}")
    private String getSkillEndpoint;

    @Autowired
    private RestTemplate restTemplate;

    public List<Experience> fetchDataFromExperienceService(int userId) {
        String ExperienceService = experienceBaseUrl + getExperienceEndpoint + userId;
        Experience[] data = restTemplate.getForObject(ExperienceService, Experience[].class);
        return Arrays.asList(data);
    }

    public Skills fetchDataFromSkillsService(int userId) {
        String ExperienceService = experienceBaseUrl + getSkillEndpoint + userId;
        Skills data = restTemplate.getForObject(ExperienceService, Skills.class);
        return data;
    }
}
