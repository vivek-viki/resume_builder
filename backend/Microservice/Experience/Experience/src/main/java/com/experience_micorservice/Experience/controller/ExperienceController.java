package com.experience_micorservice.Experience.controller;

import com.experience_micorservice.Experience.model.AddSkills;
import com.experience_micorservice.Experience.model.Experience;
import com.experience_micorservice.Experience.model.Skills;
import com.experience_micorservice.Experience.service.ExperienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/experience")
public class ExperienceController {

    @Autowired
    private ExperienceService service;

    @Autowired
    private Skills skills;



    @PostMapping("/addExperience")
    public ResponseEntity<?> addExperience(@RequestBody Experience experience){
        try {

            Optional<Experience> existingExperience = service.findExperienceById(experience.getId());

            if (existingExperience.isPresent()) {
                // If the experience exists, update the record
                Experience updatedExperience = existingExperience.get();
                updatedExperience.setUserId(experience.getUserId());
                updatedExperience.setCompany(experience.getCompany());
                updatedExperience.setDesignation(experience.getDesignation());
                updatedExperience.setLocation(experience.getLocation());
                updatedExperience.setExperience(experience.getExperience());
                updatedExperience.setSkills(experience.getSkills());
                updatedExperience.setTasks(experience.getTasks());

                // Save the updated experience
                Experience savedExperience = service.updateExperience(updatedExperience);
                return ResponseEntity.status(HttpStatus.OK).body(savedExperience);
            } else {
                Experience data = service.addExperience(experience);

                return ResponseEntity.status(HttpStatus.OK).body(data);
            }
        }catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/getExperience/{userId}")
    public ResponseEntity<?> getExperience(@PathVariable int userId){
        try {
            List<Experience> data = service.getExperience(userId);

            return ResponseEntity.status(HttpStatus.OK).body(data);
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteExperience/{id}")
    public ResponseEntity<?> deleteExperience(@PathVariable int id){
        try {
             service.deleteExperience(id);

            return ResponseEntity.status(HttpStatus.OK).body(id);
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/getSkills")
    public ResponseEntity<?> getSkills(){
        try {
            Thread.sleep(3000);
            List<String> skillList = skills.getSkills();

            return ResponseEntity.status(HttpStatus.OK).body(skillList);
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/addSkills")
    public ResponseEntity<?> addSkills(@RequestBody AddSkills skills){
        try {
            Thread.sleep(3000);
            Optional<AddSkills> existingSkills = service.findSkillsById(skills.getId());

            if (existingSkills.isPresent()) {
                // If the experience exists, update the record
                AddSkills updatedSkills = existingSkills.get();
                updatedSkills.setUserId(skills.getUserId());
                updatedSkills.setSkillData(skills.getSkillData());

                // Save the updated experience
                AddSkills savedSkills = service.updateSkills(updatedSkills);
                return ResponseEntity.status(HttpStatus.OK).body(savedSkills);
            } else {
                AddSkills addskills = service.addSkills(skills);

                return ResponseEntity.status(HttpStatus.OK).body(addskills);
            }
        }catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/getSkillData/{userId}")
    public ResponseEntity<?> getSkillData(@PathVariable int userId){
        try {
            AddSkills data = service.getSkillData(userId);

            return ResponseEntity.status(HttpStatus.OK).body(data);
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
