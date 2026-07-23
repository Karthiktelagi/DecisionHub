package com.decisionhub.repository;

import com.decisionhub.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    List<Vote> findByPollId(Long pollId);
    List<Vote> findByUserId(Long userId);
    Boolean existsByPollIdAndUserId(Long pollId, Long userId);
    Long countByPollOptionId(Long pollOptionId);
    List<Vote> findByPollIdAndUserId(Long pollId, Long userId);
}
