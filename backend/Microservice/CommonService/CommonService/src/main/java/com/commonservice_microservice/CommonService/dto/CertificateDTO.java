package com.commonservice_microservice.CommonService.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CertificateDTO {
    private int id;
    private int userId;
    private String fileType;
    private String fileName;
}
