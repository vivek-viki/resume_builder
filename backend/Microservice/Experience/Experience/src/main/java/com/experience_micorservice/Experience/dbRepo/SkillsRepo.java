package com.experience_micorservice.Experience.dbRepo;

import com.experience_micorservice.Experience.model.AddSkills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillsRepo extends JpaRepository<AddSkills, Integer> {

    @Query("SELECT s FROM AddSkills s WHERE s.userId = :userId")
    AddSkills findByUserId(@Param("userId")  int userId);
}
