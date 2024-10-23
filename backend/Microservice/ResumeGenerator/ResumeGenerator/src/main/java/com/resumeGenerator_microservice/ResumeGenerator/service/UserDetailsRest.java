package com.resumeGenerator_microservice.ResumeGenerator.service;

import com.resumeGenerator_microservice.ResumeGenerator.model.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UserDetailsRest {

    @Value("${userDetails.baseUrl}")
    private String userDetailsBaseUrl;

    @Value("${userDetails.getDetailsEndpoint}")
    private String getDetailsEndpoint;

    @Autowired
    private RestTemplate restTemplate;

    public UserDetails fetchDataFromUserSerivce(int userId) {
        String userService = userDetailsBaseUrl + getDetailsEndpoint + userId;
        UserDetails data = restTemplate.getForObject(userService, UserDetails.class);
        return data;
    }
}
