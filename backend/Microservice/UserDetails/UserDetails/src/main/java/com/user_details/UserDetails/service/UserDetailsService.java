package com.user_details.UserDetails.service;

import com.user_details.UserDetails.dbRepo.UserDetailsRepo;
import com.user_details.UserDetails.model.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsService {

    @Autowired
    private UserDetailsRepo repo;

    public void addDetails(UserDetails details) {
        repo.save(details);
    }

    public UserDetails getDetails(long userId) {
        return repo.findByUserId(userId);
    }
}
