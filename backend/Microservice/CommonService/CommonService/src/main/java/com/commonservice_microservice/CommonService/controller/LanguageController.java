package com.commonservice_microservice.CommonService.controller;

import com.commonservice_microservice.CommonService.model.Language;
import com.commonservice_microservice.CommonService.service.LanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/language")
public class LanguageController {

    @Autowired
    private LanguageService languageService;

    @PostMapping("/addLanguage")
    public ResponseEntity<?> addLanguage(@RequestBody Language language){
        try {
            Optional<Language> existingLanguage = languageService.findLanguageById(language.getId());

            if (existingLanguage.isPresent()) {
                // If the experience exists, update the record
                Language updatedLanguage = existingLanguage.get();
                updatedLanguage.setUserId(language.getUserId());
                updatedLanguage.setLanguage(language.getLanguage());
                updatedLanguage.setLevel(language.getLevel());

                // Save the updated experience
                Language savedExperience = languageService.updateLanguage(updatedLanguage);
                return ResponseEntity.status(HttpStatus.OK).body(savedExperience);
            }else {
                Language data = languageService.addLanguage(language);

                return ResponseEntity.status(HttpStatus.OK).body(data);
            }
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }


    @GetMapping("/getLanguage/{userId}")
    public ResponseEntity<?> getLanguage(@PathVariable int userId){
        try {
            List<Language> data = languageService.getLanguage(userId);

            return ResponseEntity.status(HttpStatus.OK).body(data);
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteLanguage/{id}")
    public ResponseEntity<?> deleteLanguage(@PathVariable int id){
        try {
            languageService.deleteLanguage(id);

            return ResponseEntity.status(HttpStatus.OK).body(id);
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
