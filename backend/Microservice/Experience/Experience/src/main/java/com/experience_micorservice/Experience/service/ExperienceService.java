package com.experience_micorservice.Experience.service;

import com.experience_micorservice.Experience.dbRepo.ExperienceRepo;
import com.experience_micorservice.Experience.model.Experience;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExperienceService {

    @Autowired
    private ExperienceRepo repo;
    public Experience addExperience(Experience experience) {
        return repo.save(experience);
    }

    public List<Experience> getExperience(int userId) {
        return repo.findByUserId(userId);
    }

    public void deleteExperience(int id) {
        repo.deleteById(id);
    }

    public Optional<Experience> findExperienceById(int id) {
        return repo.findById(id);
    }

    public Experience updateExperience(Experience experience) {
        return repo.save(experience); // Save acts as update if id exists
    }

}
