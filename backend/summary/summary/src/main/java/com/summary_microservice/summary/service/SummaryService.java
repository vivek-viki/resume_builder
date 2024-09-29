package com.summary_microservice.summary.service;

import com.summary_microservice.summary.dbRepo.SummaryRepo;
import com.summary_microservice.summary.model.Summary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SummaryService {

    @Autowired
    private SummaryRepo repo;

    public Summary addSummary(Summary summary){
        return repo.save(summary);
    }

    public String getSummary(int userId) {
        return repo.findByUserId(userId);
    }
}
