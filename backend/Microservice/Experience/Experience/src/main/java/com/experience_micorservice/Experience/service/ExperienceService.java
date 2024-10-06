package com.experience_micorservice.Experience.service;

import com.experience_micorservice.Experience.dbRepo.ExperienceRepo;
import com.experience_micorservice.Experience.dbRepo.SkillsRepo;
import com.experience_micorservice.Experience.model.AddSkills;
import com.experience_micorservice.Experience.model.Experience;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExperienceService {

    @Autowired
    private ExperienceRepo experienceRepo;

    @Autowired
    private SkillsRepo skillsRepo;
    public Experience addExperience(Experience experience) {
        return experienceRepo.save(experience);
    }

    public List<Experience> getExperience(int userId) {
        return experienceRepo.findByUserId(userId);
    }

    public void deleteExperience(int id) {
        experienceRepo.deleteById(id);
    }

    public Optional<Experience> findExperienceById(int id) {
        return experienceRepo.findById(id);
    }

    public Experience updateExperience(Experience experience) {
        return experienceRepo.save(experience); // Save acts as update if id exists
    }

    public Optional<AddSkills> findSkillsById(int id) {
        return skillsRepo.findById(id);
    }

    public AddSkills updateSkills(AddSkills updatedSkills) {
        return skillsRepo.save(updatedSkills);
    }

    public AddSkills addSkills(AddSkills skills) {
        return  skillsRepo.save(skills);
    }

    public AddSkills getSkillData(int userId) {
        return skillsRepo.findByUserId(userId);
    }
}
