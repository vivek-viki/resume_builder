package com.commonservice_microservice.CommonService.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "t_certificates")
@Data
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int userId;
    private String fileType;
    private String fileName;

    @Lob  // For large binary objects
    @Basic(fetch = FetchType.LAZY)
//    @JsonIgnore
    @Column(name = "file", nullable = false)

//    @Column(name = "file", columnDefinition = "BYTEA")  // Explicitly define as BYTEA for PostgreSQL
    private byte[] file;  // Use byte[] to store file data

    // Getters, setters, and constructors
    public Certificate() {}

    public Certificate(int userId, String fileType, String fileName, byte[] file) {
        this.userId = userId;
        this.fileType = fileType;
        this.fileName = fileName;
        this.file = file;
    }
    // Getters and setters...
}
