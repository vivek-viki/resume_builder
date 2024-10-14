package com.commonservice_microservice.CommonService.service;

import com.commonservice_microservice.CommonService.dbRepo.ProjectRepo;
import com.commonservice_microservice.CommonService.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepo projectRepo;
    public Optional<Project> findProjectById(int id) {
        return projectRepo.findById(id);
    }

    public Project updateProject(Project updatedProject) {
        return projectRepo.save(updatedProject);
    }

    public Project addProject(Project project) {
        return projectRepo.save(project);
    }

    public List<Project> getProject(int userId) {
        return projectRepo.findByUserId(userId);
    }

    public void deleteProject(int id) {
        projectRepo.deleteById(id);
    }
}
