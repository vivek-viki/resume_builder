package com.resumeGenerator_microservice.ResumeGenerator.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDetails {
    private long userId;
    private String name;
    private String designation;
    private long number;
    private String mailId;
    private String address;
    private String links;
}
