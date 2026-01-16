package com.jobtracker.service;

import com.jobtracker.dto.JobApplicationDto;
import com.jobtracker.model.JobApplication;
import com.jobtracker.repository.JobApplicationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobApplicationServiceImpl implements JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;

    @Override
    public JobApplication create(String userId, JobApplicationDto.CreateRequest request) {
        JobApplication application = JobApplication.builder()
                .userId(userId)
                .companyName(request.getCompanyName())
                .jobTitle(request.getJobTitle())
                .jobUrl(request.getJobUrl())
                .location(request.getLocation())
                .status(request.getStatus())
                .notes(request.getNotes())
                .salaryMin(request.getSalaryMin())
                .salaryMax(request.getSalaryMax())
                .appliedDate(request.getAppliedDate())
                .followUpDate(request.getFollowUpDate())
                .build();

        JobApplication saved = jobApplicationRepository.save(application);
        log.debug("Created application for user {}: {}", userId, saved.getId());
        return saved;
    }

    @Override
    public List<JobApplication> getAllByUser(String userId) {
        return jobApplicationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Override
    public List<JobApplication> getByStatus(String userId, String status) {
        return jobApplicationRepository.findByUserIdAndStatus(userId, status);
    }

    @Override
    public JobApplication getById(String id, String userId) {
        return jobApplicationRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
    }

    @Override
    public JobApplication update(String id, String userId, JobApplicationDto.UpdateRequest request) {
        JobApplication existing = getById(id, userId);

        if (request.getCompanyName() != null) existing.setCompanyName(request.getCompanyName());
        if (request.getJobTitle() != null) existing.setJobTitle(request.getJobTitle());
        if (request.getJobUrl() != null) existing.setJobUrl(request.getJobUrl());
        if (request.getLocation() != null) existing.setLocation(request.getLocation());
        if (request.getStatus() != null) existing.setStatus(request.getStatus());
        if (request.getNotes() != null) existing.setNotes(request.getNotes());
        if (request.getSalaryMin() != null) existing.setSalaryMin(request.getSalaryMin());
        if (request.getSalaryMax() != null) existing.setSalaryMax(request.getSalaryMax());
        if (request.getFollowUpDate() != null) existing.setFollowUpDate(request.getFollowUpDate());

        existing.setUpdatedAt(LocalDateTime.now());
        return jobApplicationRepository.save(existing);
    }

    @Override
    public void delete(String id, String userId) {
        JobApplication application = getById(id, userId);
        jobApplicationRepository.delete(application);
        log.debug("Deleted application {} for user {}", id, userId);
    }

    @Override
    public JobApplicationDto.StatsResponse getStats(String userId) {
        JobApplicationDto.StatsResponse stats = new JobApplicationDto.StatsResponse();
        stats.setTotal(jobApplicationRepository.findByUserIdOrderByCreatedAtDesc(userId).size());
        stats.setApplied(jobApplicationRepository.countByUserIdAndStatus(userId, "APPLIED"));
        stats.setScreening(jobApplicationRepository.countByUserIdAndStatus(userId, "SCREENING"));
        stats.setInterview(jobApplicationRepository.countByUserIdAndStatus(userId, "INTERVIEW"));
        stats.setOffer(jobApplicationRepository.countByUserIdAndStatus(userId, "OFFER"));
        stats.setRejected(jobApplicationRepository.countByUserIdAndStatus(userId, "REJECTED"));
        return stats;
    }
}