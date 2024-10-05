package com.summary_microservice.summary.controller;

import com.summary_microservice.summary.model.Summary;
import com.summary_microservice.summary.service.SummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/summary")
public class SummaryController {

    @Autowired
    private SummaryService service;

    @PostMapping("/addSummary")
    public ResponseEntity<String> addSummary(@RequestBody Summary summary) {
        try {
            service.addSummary(summary);

            return ResponseEntity.status(HttpStatus.OK).body("Summary added successfully.");
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/getSummary")
    public ResponseEntity<?> getSummary(@RequestBody Summary summary){
        try {
//            Thread.sleep(5000);
            Summary data = service.getSummary(summary.getUserId());

            return ResponseEntity.status(HttpStatus.OK).body(data);
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
