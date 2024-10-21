package com.resumeGenerator_microservice.ResumeGenerator.service;

import com.itextpdf.html2pdf.HtmlConverter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class PdfService {

    public byte[] convertHtmlToPdf(String htmlContent) throws IOException {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            HtmlConverter.convertToPdf(htmlContent, outputStream);
            return outputStream.toByteArray();  // Return PDF as byte array
        } catch (Exception e) {
            // Handle exception (e.g., logging)
            e.printStackTrace();
            return new byte[0]; // Return an empty byte array on error
        }
    }
}
