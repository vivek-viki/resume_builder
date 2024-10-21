package com.resumeGenerator_microservice.ResumeGenerator.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
public class Skills {
        private int id;
        private int userId;
        private List<String> skillData;

}
