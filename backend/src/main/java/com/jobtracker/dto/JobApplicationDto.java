package com.jobtracker.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

public class JobApplicationDto {

    @Data
    public static class CreateRequest {
        @NotBlank(message = "Company name is required")
        private String companyName;

        @NotBlank(message = "Job title is required")
        private String jobTitle;

        private String jobUrl;
        private String location;
        private String notes;
        private Integer salaryMin;
        private Integer salaryMax;
        private LocalDate appliedDate;
        private LocalDate followUpDate;

        @NotBlank(message = "Status is required")
        private String status;
    }

    @Data
    public static class UpdateRequest {
        private String companyName;
        private String jobTitle;
        private String jobUrl;
        private String location;
        private String status;
        private String notes;
        private Integer salaryMin;
        private Integer salaryMax;
        private LocalDate followUpDate;
    }

    @Data
    public static class StatsResponse {
        private long total;
        private long applied;
        private long screening;
        private long interview;
        private long offer;
        private long rejected;
    }
}