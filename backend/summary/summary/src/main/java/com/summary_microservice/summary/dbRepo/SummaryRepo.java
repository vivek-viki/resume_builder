package com.summary_microservice.summary.dbRepo;

import com.summary_microservice.summary.model.Summary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SummaryRepo extends JpaRepository<Summary, Integer> {

    @Query("SELECT s FROM Summary s WHERE s.userId = :userId")
    String findByUserId(@Param("userId") int userId);
}
