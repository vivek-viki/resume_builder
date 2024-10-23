package com.commonservice_microservice.CommonService.service;

import com.commonservice_microservice.CommonService.dbRepo.CertificateRepo;
import com.commonservice_microservice.CommonService.model.Certificate;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class CertificateService {

    @Autowired
    private CertificateRepo certificateRepo;

    public void addCertificate(int userId, int id, String fileType, String fileName, MultipartFile files) throws IOException {
        // Convert MultipartFile to byte[]
        byte[] file = files.getBytes();
        System.out.println("File data size: " + file.length);
        System.out.println("File data type: " + file.getClass().getName()); // Should be [B for byte[]
        System.out.println("User ID: " + userId);
        System.out.println("File Type: " + fileType);
        System.out.println("File Name: " + fileName);

        // Create and save the certificate object
        Certificate certificate = new Certificate(userId, fileType, fileName, file);
         certificateRepo.save(certificate);
    }

    @Transactional
    public List<Certificate> getCertificate(int userId){
        return certificateRepo.findByUserId(userId);
    }

    public Certificate getFileById(int fileId) {
        return certificateRepo.findById(fileId);
    }

    public boolean existsByUserIdAndFileName(int userId, String fileName) {
        return certificateRepo.existsByUserIdAndFileName(userId, fileName);
    }

    public void deleteCertificate(int id) {
        certificateRepo.deleteById(id);
    }
}
