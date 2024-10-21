package com.resumeGenerator_microservice.ResumeGenerator.service;

import com.resumeGenerator_microservice.ResumeGenerator.model.Certificate;
import com.resumeGenerator_microservice.ResumeGenerator.model.Education;
import com.resumeGenerator_microservice.ResumeGenerator.model.Language;
import com.resumeGenerator_microservice.ResumeGenerator.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class CommonServiceRest {

    @Value("${commonService.baseUrl}")
    private String commonServiceBaseUrl;

    @Value("${commonService.getLanguageEndpoint}")
    private String getLanguageEndpoint;

    @Value("${commonService.getCertificatesEndpoint}")
    private String getCertificatesEndpoint;

    @Value("${commonService.getProjectEndpoint}")
    private String getProjectEndpoint;

    @Autowired
    private RestTemplate restTemplate;

    public List<Language> fetchDataFromLanguageCommonService(int userId) {
        String languageCommonService = commonServiceBaseUrl + getLanguageEndpoint + userId;
        Language[] data = restTemplate.getForObject(languageCommonService, Language[].class);
        return Arrays.asList(data);
    }

    public List<Certificate> fetchDataFromCertificateCommonService(int userId) {
        String certificateCommonService = commonServiceBaseUrl + getCertificatesEndpoint + userId;
        Certificate[] data = restTemplate.getForObject(certificateCommonService, Certificate[].class);
        return Arrays.asList(data);
    }

    public List<Project> etchDataFromProjectCommonService(int userId) {
        String projectCommonService = commonServiceBaseUrl + getProjectEndpoint + userId;
        Project[] data = restTemplate.getForObject(projectCommonService, Project[].class);
        return Arrays.asList(data);
    }
}
