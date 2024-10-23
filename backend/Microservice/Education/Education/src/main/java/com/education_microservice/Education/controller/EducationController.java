package com.education_microservice.Education.controller;

import com.education_microservice.Education.model.Education;
import com.education_microservice.Education.service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/education")
public class EducationController {

    @Autowired
    private EducationService educationService;

    @PostMapping("/addEducation")
    public ResponseEntity<?> addEducation(@RequestBody Education education){
        try {
            Optional<Education> existingEducation = educationService.findEducationById(education.getId());

            if (existingEducation.isPresent()) {
                // If the Education exists, update the record
                Education updatedEducation = existingEducation.get();
                updatedEducation.setUserId(education.getUserId());
                updatedEducation.setCollege(education.getCollege());
                updatedEducation.setCourse(education.getCourse());
                updatedEducation.setProgram(education.getProgram());
                updatedEducation.setStartDate(education.getStartDate());
                updatedEducation.setEndDate(education.getEndDate());
                updatedEducation.setCgpa(education.getCgpa());
                updatedEducation.setSpecialization(education.getSpecialization());


                // Save the updated Education
                Education savedEducation = educationService.updateEducation(updatedEducation);
                return ResponseEntity.status(HttpStatus.OK).body(savedEducation);
            }else {
                if(education.getEndDate() == null)
                    education.setStringEndDate("Pursuing");
                Education data = educationService.addEducation(education);

                return ResponseEntity.status(HttpStatus.OK).body(data);
            }
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/getEducation/{userId}")
    public ResponseEntity<?> getEducation(@PathVariable int userId){
        try {
            List<Education> data = educationService.getEducation(userId);

            return ResponseEntity.status(HttpStatus.OK).body(data);
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteEducation/{id}")
    public ResponseEntity<?> deleteEducation(@PathVariable int id){
        try {
            educationService.deleteEducation(id);

            return ResponseEntity.status(HttpStatus.OK).body(id);
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
