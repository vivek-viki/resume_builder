package com.resumeGenerator_microservice.ResumeGenerator.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "t_user_resume")
public class UserResume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int userId;

    private int templateId;

    @Column(columnDefinition = "VARCHAR(255) DEFAULT 'application/pdf'")
    private String fileType = "application/pdf"; // Default value in code
    @Column(columnDefinition = "TEXT")
    private String resume;

    public UserResume(int templateId, int userId, String resume) {
        this.templateId = templateId;
        this.userId = userId;
        this.resume = resume;
    }
}
