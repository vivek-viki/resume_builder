package com.experience_micorservice.Experience.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "t_experience")
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int userId;
    private String company;
    private String designation;
    private String location;
    private String experience;
    private List<String> skills;
    private String tasks;
}
