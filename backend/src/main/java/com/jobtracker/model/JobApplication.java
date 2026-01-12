package com.jobtracker.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "job_applications")
public class JobApplication {

    @Id
    private String id;

    private String userId;
    private String companyName;
    private String jobTitle;
    private String jobUrl;
    private String location;
    private String status;
    private String notes;
    private Integer salaryMin;
    private Integer salaryMax;
    private LocalDate appliedDate;
    private LocalDate followUpDate;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}