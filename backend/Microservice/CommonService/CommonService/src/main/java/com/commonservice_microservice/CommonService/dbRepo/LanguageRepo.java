package com.commonservice_microservice.CommonService.dbRepo;

import com.commonservice_microservice.CommonService.model.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LanguageRepo extends JpaRepository<Language, Integer> {
    @Query("SELECT s FROM Language s WHERE s.userId = :userId")
    List<Language> findByUserId(@Param("userId") int userId);
}
