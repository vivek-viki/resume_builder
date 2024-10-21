package com.resumeGenerator_microservice.ResumeGenerator.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "t_resume_template")
public class HtmlContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int templateId;
    @Column(columnDefinition = "TEXT")
    private String template;

    public HtmlContent(int templateId, String template) {
        this.templateId = templateId;
        this.template = template;
    }
}
