package com.experience_micorservice.Experience.model;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Data
@NoArgsConstructor
@Component
public class Skills {

    @Value("${skills}")
    private List<String> skills;
}
