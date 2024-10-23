package com.resumeGenerator_microservice.ResumeGenerator.dbRepo;

import com.resumeGenerator_microservice.ResumeGenerator.model.HtmlContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HtmlContentRepository extends JpaRepository<HtmlContent, Integer> {

//    @Query("SELECT s FROM UserResume s WHERE s.templateId = :templateId")
    Optional<HtmlContent> findByTemplateId(int templateId);
}
