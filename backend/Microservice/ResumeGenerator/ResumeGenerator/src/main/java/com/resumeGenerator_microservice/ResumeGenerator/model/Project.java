package com.resumeGenerator_microservice.ResumeGenerator.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
public class Project {

    private int id;
    private int userId;
    private String projectName;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<String> skills;
    private String description;
    private String stringEndDate;
}
