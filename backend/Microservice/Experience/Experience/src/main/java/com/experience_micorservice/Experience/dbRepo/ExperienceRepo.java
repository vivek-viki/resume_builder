package com.experience_micorservice.Experience.dbRepo;

import com.experience_micorservice.Experience.model.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExperienceRepo extends JpaRepository<Experience, Integer> {
    @Query("SELECT s FROM Experience s WHERE s.userId = :userId")
    List<Experience> findByUserId(@Param("userId") int userId);
}
