package com.resumeGenerator_microservice.ResumeGenerator.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class Certificate {
    private int id;

    private int userId;
    private String fileType;
    private String fileName;
    private byte[] file;  // Use byte[] to store file data

}
