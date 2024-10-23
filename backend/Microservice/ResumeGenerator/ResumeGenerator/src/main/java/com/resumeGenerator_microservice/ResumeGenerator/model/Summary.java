package com.resumeGenerator_microservice.ResumeGenerator.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Summary {
    private int userId;
    private String summary;
}
