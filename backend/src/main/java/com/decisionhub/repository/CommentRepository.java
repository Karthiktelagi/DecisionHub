package com.decisionhub.repository;

import com.decisionhub.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByDecisionId(Long decisionId);
    List<Comment> findByDecisionIdAndParentIsNull(Long decisionId);
    Long countByDecisionId(Long decisionId);
}
