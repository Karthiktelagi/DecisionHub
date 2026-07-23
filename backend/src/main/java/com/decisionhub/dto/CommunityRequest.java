package com.decisionhub.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityRequest {
    private String name;
    private String description;
    private String category;
    private Boolean isPublic;
}
