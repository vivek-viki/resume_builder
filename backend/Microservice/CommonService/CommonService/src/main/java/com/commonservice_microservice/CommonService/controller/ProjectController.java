package com.commonservice_microservice.CommonService.controller;

import com.commonservice_microservice.CommonService.model.Project;
import com.commonservice_microservice.CommonService.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("/addProject")
    public ResponseEntity<?> addProject(@RequestBody Project project){
        try {
                Optional<Project> existingProject = projectService.findProjectById(project.getId());

            if (existingProject.isPresent()) {
                // If the experience exists, update the record
                Project updatedProject = existingProject.get();
                updatedProject.setUserId(project.getUserId());
                updatedProject.setStartDate(project.getStartDate());
                updatedProject.setEndDate(project.getEndDate());
                updatedProject.setDescription(project.getDescription());

                // Save the updated experience
                Project savedProject = projectService.updateProject(updatedProject);
                return ResponseEntity.status(HttpStatus.OK).body(savedProject);
            }else {
                Project data = projectService.addProject(project);

                return ResponseEntity.status(HttpStatus.OK).body(data);
            }
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/getProject/{userId}")
    public ResponseEntity<?> getProject(@PathVariable int userId){
        try {
            List<Project> data = projectService.getProject(userId);

            return ResponseEntity.status(HttpStatus.OK).body(data);
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteProject/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable int id){
        try {
            projectService.deleteProject(id);

            return ResponseEntity.status(HttpStatus.OK).body(id);
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
