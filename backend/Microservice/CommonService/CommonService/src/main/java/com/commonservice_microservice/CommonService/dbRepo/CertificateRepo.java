package com.commonservice_microservice.CommonService.dbRepo;

import com.commonservice_microservice.CommonService.model.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificateRepo extends JpaRepository<Certificate, Integer>{

    @Query("SELECT s FROM Certificate s WHERE s.userId = :userId")
    List<Certificate> findByUserId(@Param("userId") int userId);

    @Query("SELECT s FROM Certificate s WHERE s.id = :userId")
    Certificate findById(@Param("userId") int userId);

    @Query("SELECT COUNT(s) > 0 FROM Certificate s WHERE s.userId = :userId AND s.fileName = :fileName")
    boolean existsByUserIdAndFileName(@Param("userId") int userId, @Param("fileName") String fileName);
}
