package com.experience_micorservice.Experience.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@Entity
@Table(name = "t_skills")
public class AddSkills {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;
        private int userId;

        @ElementCollection
        @CollectionTable(name = "t_skills_skill_data", joinColumns = @JoinColumn(name = "add_skills_id"))
        @Column(name = "skill_data") // Column name in the join table
        private List<String> skillData;

}
