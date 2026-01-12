package com.jobtracker.repository;

import com.jobtracker.model.InterviewRound;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewRoundRepository extends MongoRepository<InterviewRound, String> {

    List<InterviewRound> findByApplicationIdOrderByScheduledAtAsc(String applicationId);

    List<InterviewRound> findByUserIdOrderByScheduledAtDesc(String userId);
}