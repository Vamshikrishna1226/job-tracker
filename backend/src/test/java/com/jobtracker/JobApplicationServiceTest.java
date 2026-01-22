package com.jobtracker;

import com.jobtracker.dto.JobApplicationDto;
import com.jobtracker.model.JobApplication;
import com.jobtracker.repository.JobApplicationRepository;
import com.jobtracker.service.JobApplicationServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JobApplicationServiceTest {

    @Mock
    private JobApplicationRepository jobApplicationRepository;

    @InjectMocks
    private JobApplicationServiceImpl jobApplicationService;

    @Test
    void shouldCreateJobApplication() {
        JobApplicationDto.CreateRequest request = new JobApplicationDto.CreateRequest();
        request.setCompanyName("Google");
        request.setJobTitle("Software Engineer");
        request.setStatus("APPLIED");

        JobApplication saved = JobApplication.builder()
                .id("123")
                .userId("user1")
                .companyName("Google")
                .jobTitle("Software Engineer")
                .status("APPLIED")
                .build();

        when(jobApplicationRepository.save(any())).thenReturn(saved);

        JobApplication result = jobApplicationService.create("user1", request);

        assertThat(result.getCompanyName()).isEqualTo("Google");
        assertThat(result.getStatus()).isEqualTo("APPLIED");
    }

    @Test
    void shouldReturnAllApplicationsForUser() {
        List<JobApplication> apps = List.of(
                JobApplication.builder().id("1").userId("user1").companyName("Google").build(),
                JobApplication.builder().id("2").userId("user1").companyName("Microsoft").build()
        );

        when(jobApplicationRepository.findByUserIdOrderByCreatedAtDesc("user1")).thenReturn(apps);

        List<JobApplication> result = jobApplicationService.getAllByUser("user1");

        assertThat(result).hasSize(2);
    }
}