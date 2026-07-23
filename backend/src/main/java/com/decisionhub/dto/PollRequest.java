package com.decisionhub.dto;

import com.decisionhub.entity.Poll.PollType;
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
public class PollRequest {
    private String title;
    private PollType type;
    private Boolean isAnonymous;
    private Long decisionId;
    private LocalDateTime closesAt;
    private List<String> options;
}
