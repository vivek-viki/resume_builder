package com.commonservice_microservice.CommonService.controller;

import com.commonservice_microservice.CommonService.dto.CertificateDTO;
import com.commonservice_microservice.CommonService.model.Certificate;
import com.commonservice_microservice.CommonService.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/certificates")
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    @PostMapping(value = "/addCertificates", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> addCertificates(
            @RequestParam("userId") int userId,
            @RequestParam("id") int id,
            @RequestParam("fileTypes") List<String> fileTypes,
            @RequestParam("fileNames") List<String> fileNames,
            @RequestParam("files") List<MultipartFile> files

    ){
        try {
            int isUpdated = 0;
            for (int i = 0; i < files.size(); i++) {
                MultipartFile file = files.get(i);
                String fileType = fileTypes.get(i);
                String fileName = fileNames.get(i);

                if (!isCertificateExists(userId, fileName)) {
                    certificateService.addCertificate(userId, id, fileType, fileName, file);
                }else {
                    isUpdated = -1;
                }

            }
            return ResponseEntity.status(HttpStatus.OK).body(isUpdated); // file added successfully
        }catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
//        return ResponseEntity.status(HttpStatus.OK).body(-1); // -1 file already present
    }


    public boolean isCertificateExists(int userId, String fileName) {
        // Implement logic to check if the certificate already exists in the database
        return certificateService.existsByUserIdAndFileName(userId, fileName);
    }

    @GetMapping("/getCertificates/{userId}")
    public ResponseEntity<?> getCertificates(@PathVariable int userId){
        try {
            List<Certificate> certificateList = certificateService.getCertificate(userId);

//            List<CertificateDTO> certificateDTOList = certificateList.stream()
//                    .map(certificate -> new CertificateDTO(
//                            certificate.getId(),
//                            certificate.getUserId(),
//                            certificate.getFileType(),
//                            certificate.getFileName()
//                    ))
//                    .collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.OK).body(certificateList);
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/getCertificates/files/{fileId}")
    public ResponseEntity<?> viewFile(@PathVariable int fileId) {
        try {
        Certificate certificate = certificateService.getFileById(fileId);  // Fetch the file from DB

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(certificate.getFileType()))  // Set correct content type
                .body(certificate.getFile());  // Return file as byte[]
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteCertificate/{id}")
    public ResponseEntity<?> deleteCertificate(@PathVariable int id){
        try {
//            Thread.sleep(3000);
            certificateService.deleteCertificate(id);

            return ResponseEntity.status(HttpStatus.OK).body(id);
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
