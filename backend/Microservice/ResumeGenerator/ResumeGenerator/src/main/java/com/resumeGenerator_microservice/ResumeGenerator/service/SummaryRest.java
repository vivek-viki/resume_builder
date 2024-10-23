package com.resumeGenerator_microservice.ResumeGenerator.service;

import com.resumeGenerator_microservice.ResumeGenerator.model.Summary;
import com.resumeGenerator_microservice.ResumeGenerator.model.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SummaryRest {

    @Value("${summary.baseUrl}")
    private String summaryBaseUrl;

    @Value("${summary.getSummaryEndpoint}")
    private String getSummaryEndpoint;

    @Autowired
    private RestTemplate restTemplate;

    public Summary fetchDataFromSummaryService(int userId) {
        String summaryService = summaryBaseUrl + getSummaryEndpoint + userId;
        Summary data = restTemplate.getForObject(summaryService, Summary.class);
        return data;
    }
}
