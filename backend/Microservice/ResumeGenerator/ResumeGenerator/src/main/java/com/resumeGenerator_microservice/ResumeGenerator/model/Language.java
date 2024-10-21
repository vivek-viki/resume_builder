package com.resumeGenerator_microservice.ResumeGenerator.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Language {
    private int id;
    private int userId;
    private String language;
    private String level;

}
