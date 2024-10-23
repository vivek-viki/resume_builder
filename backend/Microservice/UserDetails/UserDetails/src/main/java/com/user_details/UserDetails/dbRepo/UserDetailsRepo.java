package com.user_details.UserDetails.dbRepo;

import com.user_details.UserDetails.model.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailsRepo extends JpaRepository<UserDetails, Long> {

    @Query("SELECT s FROM UserDetails  s WHERE s.userId = :userId")
    UserDetails findByUserId(@Param("userId") long userId);
}
