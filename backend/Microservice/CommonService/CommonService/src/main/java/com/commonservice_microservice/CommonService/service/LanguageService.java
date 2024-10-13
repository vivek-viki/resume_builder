package com.commonservice_microservice.CommonService.service;

import com.commonservice_microservice.CommonService.dbRepo.LanguageRepo;
import com.commonservice_microservice.CommonService.model.Language;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LanguageService {

    @Autowired
    private LanguageRepo languageRepo;
    public Language addLanguage(Language language) {
        return languageRepo.save(language);
    }

    public List<Language> getLanguage(int userId) {
        return languageRepo.findByUserId(userId);
    }

    public Optional<Language> findLanguageById(int id) {
        return languageRepo.findById(id);
    }

    public Language updateLanguage(Language updatedLanguage) {
        return languageRepo.save(updatedLanguage);
    }

    public void deleteLanguage(int id) {
        languageRepo.deleteById(id);
    }
}
