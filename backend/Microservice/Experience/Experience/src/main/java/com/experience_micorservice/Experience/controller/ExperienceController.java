package com.experience_micorservice.Experience.controller;

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
            List<String> skillList = skills.getSkills();

            return ResponseEntity.status(HttpStatus.OK).body(skillList);
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
