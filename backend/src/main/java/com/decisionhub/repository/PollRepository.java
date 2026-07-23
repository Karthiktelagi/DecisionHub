package com.decisionhub.repository;

import com.decisionhub.entity.Poll;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PollRepository extends JpaRepository<Poll, Long> {
    List<Poll> findByDecisionId(Long decisionId);
    List<Poll> findByStatus(Poll.PollStatus status);
    Long countByDecisionId(Long decisionId);
}
