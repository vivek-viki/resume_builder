package com.resumeGenerator_microservice.ResumeGenerator.dbRepo;

import com.resumeGenerator_microservice.ResumeGenerator.model.UserResume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserResumeRepo extends JpaRepository<UserResume, Integer> {

    @Query("SELECT s FROM UserResume s WHERE s.templateId = :templateId AND s.userId = :userId")
    Optional<UserResume> findByTemplateIdAndUserId(@Param("templateId") int templateId,@Param("userId") int userId);
}
