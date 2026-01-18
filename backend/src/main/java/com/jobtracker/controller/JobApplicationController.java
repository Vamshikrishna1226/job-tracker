package com.jobtracker.controller;

import com.jobtracker.dto.JobApplicationDto;
import com.jobtracker.model.JobApplication;
import com.jobtracker.service.JobApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    @PostMapping
    public ResponseEntity<JobApplication> create(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody JobApplicationDto.CreateRequest request) {
        return ResponseEntity.ok(jobApplicationService.create(userDetails.getUsername(), request));
    }

    @GetMapping
    public ResponseEntity<List<JobApplication>> getAll(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) String status) {

        if (status != null && !status.isBlank()) {
            return ResponseEntity.ok(jobApplicationService.getByStatus(userDetails.getUsername(), status));
        }
        return ResponseEntity.ok(jobApplicationService.getAllByUser(userDetails.getUsername()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplication> getById(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String id) {
        return ResponseEntity.ok(jobApplicationService.getById(id, userDetails.getUsername()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobApplication> update(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String id,
            @RequestBody JobApplicationDto.UpdateRequest request) {
        return ResponseEntity.ok(jobApplicationService.update(id, userDetails.getUsername(), request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String id) {
        jobApplicationService.delete(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<JobApplicationDto.StatsResponse> getStats(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(jobApplicationService.getStats(userDetails.getUsername()));
    }
}