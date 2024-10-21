package com.resumeGenerator_microservice.ResumeGenerator.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class Education {

    private int id;
    private int userId;
    private String college;
    private String course;
    private String program;
    private LocalDate startDate;
    private LocalDate endDate;
    private String cgpa;
    private String specialization;
    private String stringEndDate;

}
