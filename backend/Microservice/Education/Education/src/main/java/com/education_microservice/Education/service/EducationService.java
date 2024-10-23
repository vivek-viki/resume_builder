package com.education_microservice.Education.service;

import com.education_microservice.Education.dbRepo.EducationRepo;
import com.education_microservice.Education.model.Education;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EducationService {

    @Autowired
    private EducationRepo educationRepo;

    public Optional<Education> findEducationById(int id) {
        return educationRepo.findById(id);
    }

    public Education updateEducation(Education updatedEducation) {
        return educationRepo.save(updatedEducation);
    }

    public Education addEducation(Education education) {
        return educationRepo.save(education);
    }

    public List<Education> getEducation(int userId) {
        return educationRepo.findByUserId(userId);
    }

    public void deleteEducation(int id) {
        educationRepo.deleteById(id);
    }
}
