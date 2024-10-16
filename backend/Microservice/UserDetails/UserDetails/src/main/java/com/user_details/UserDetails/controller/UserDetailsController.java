package com.user_details.UserDetails.controller;

import com.user_details.UserDetails.model.UserDetails;
import com.user_details.UserDetails.service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/details")
public class UserDetailsController {

    @Autowired
    private UserDetailsService service;

    @PostMapping("/addDetails")
    public ResponseEntity<String> addDetails(@RequestBody UserDetails details){
        try {
            service.addDetails(details);

            return ResponseEntity.status(HttpStatus.OK).body("UserDetails added successfully.");
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/getDetails/{userId}")
    public ResponseEntity<?> getDetails(@PathVariable long userId){
        try{
            UserDetails details = service.getDetails(userId);
            return ResponseEntity.status(HttpStatus.OK).body(details);
        }
        catch (Exception e){
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
