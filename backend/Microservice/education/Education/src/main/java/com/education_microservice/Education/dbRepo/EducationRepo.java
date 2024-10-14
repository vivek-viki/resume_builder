package com.education_microservice.Education.dbRepo;

import com.education_microservice.Education.model.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EducationRepo extends JpaRepository<Education, Integer> {

    @Query("SELECT s FROM Education s WHERE s.userId = :userId")
    List<Education> findByUserId(@Param("userId") int userId);
}
