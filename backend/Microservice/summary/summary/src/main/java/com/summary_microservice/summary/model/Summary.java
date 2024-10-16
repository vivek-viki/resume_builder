package com.summary_microservice.summary.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "t_summary")
public class Summary {
    @Id
    private int userId;

    @Column(columnDefinition = "TEXT")
    private String summary;
}
