package com.jobtracker.repository;

import com.jobtracker.model.JobApplication;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobApplicationRepository extends MongoRepository<JobApplication, String> {

    List<JobApplication> findByUserIdOrderByCreatedAtDesc(String userId);

    List<JobApplication> findByUserIdAndStatus(String userId, String status);

    Optional<JobApplication> findByIdAndUserId(String id, String userId);

    long countByUserIdAndStatus(String userId, String status);
}