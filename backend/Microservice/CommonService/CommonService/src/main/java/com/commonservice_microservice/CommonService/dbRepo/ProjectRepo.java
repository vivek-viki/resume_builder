package com.commonservice_microservice.CommonService.dbRepo;

import com.commonservice_microservice.CommonService.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepo extends JpaRepository<Project, Integer> {
    @Query("SELECT s FROM Project s WHERE s.userId = :userId")
    List<Project> findByUserId(@Param("userId") int userId);
}
