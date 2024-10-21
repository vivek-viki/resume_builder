package com.resumeGenerator_microservice.ResumeGenerator.service;

import com.resumeGenerator_microservice.ResumeGenerator.dbRepo.HtmlContentRepository;
import com.resumeGenerator_microservice.ResumeGenerator.model.HtmlContent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HtmlContentService {

    @Autowired
    private HtmlContentRepository htmlContentRepository;

    public void addContent(HtmlContent content) {
        htmlContentRepository.save(content);
    }

    public Optional<HtmlContent> findByTemplateId(int templateId) {
        return htmlContentRepository.findByTemplateId(templateId);
    }
}
