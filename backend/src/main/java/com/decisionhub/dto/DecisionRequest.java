package com.decisionhub.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DecisionRequest {
    private String title;
    private String description;
    private String category;
    private Boolean isPublic;
    private LocalDateTime deadline;
    private Long communityId;
    private List<OptionRequest> options;
}
