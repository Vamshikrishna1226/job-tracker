package com.jobtracker.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "interview_rounds")
public class InterviewRound {

    @Id
    private String id;

    private String applicationId;
    private String userId;
    private String roundType;
    private String outcome;
    private String interviewerName;
    private String feedback;
    private LocalDateTime scheduledAt;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}