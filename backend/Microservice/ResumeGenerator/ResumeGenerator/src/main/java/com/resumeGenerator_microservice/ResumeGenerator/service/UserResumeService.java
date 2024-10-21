package com.resumeGenerator_microservice.ResumeGenerator.service;

import com.resumeGenerator_microservice.ResumeGenerator.dbRepo.UserResumeRepo;
import com.resumeGenerator_microservice.ResumeGenerator.model.UserResume;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserResumeService {

    @Autowired
    private UserResumeRepo userResumeRepo;

    public void userResumeService(UserResume userResume) {
        userResumeRepo.save(userResume);
    }

    public Optional<UserResume> findByTemplateIdAndUserId(int templateId, int userId) {
        return userResumeRepo.findByTemplateIdAndUserId(templateId,userId);
    }

    public void update(UserResume userResume) {
        userResumeRepo.save(userResume);
    }
}
