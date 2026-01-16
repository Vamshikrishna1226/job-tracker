package com.jobtracker.service;

import com.jobtracker.dto.JobApplicationDto;
import com.jobtracker.model.JobApplication;

import java.util.List;

public interface JobApplicationService {

    JobApplication create(String userId, JobApplicationDto.CreateRequest request);

    List<JobApplication> getAllByUser(String userId);

    List<JobApplication> getByStatus(String userId, String status);

    JobApplication getById(String id, String userId);

    JobApplication update(String id, String userId, JobApplicationDto.UpdateRequest request);

    void delete(String id, String userId);

    JobApplicationDto.StatsResponse getStats(String userId);
}