package com.decisionhub.service;

import com.decisionhub.dto.CommentRequest;
import com.decisionhub.entity.Comment;
import com.decisionhub.entity.Decision;
import com.decisionhub.entity.User;
import com.decisionhub.repository.CommentRepository;
import com.decisionhub.repository.DecisionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final DecisionRepository decisionRepository;

    @Transactional
    public Comment addComment(CommentRequest request, User user) {
        Decision decision = decisionRepository.findById(request.getDecisionId())
                .orElseThrow(() -> new RuntimeException("Decision not found"));

        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setDecision(decision);
        comment.setUser(user);

        if (request.getParentId() != null) {
            Comment parent = commentRepository.findById(request.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent comment not found"));
            comment.setParent(parent);
        }

        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByDecision(Long decisionId) {
        return commentRepository.findByDecisionIdAndParentIsNull(decisionId);
    }

    @Transactional
    public Comment updateComment(Long id, String content, User user) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        if (!comment.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        comment.setContent(content);
        return commentRepository.save(comment);
    }

    @Transactional
    public void deleteComment(Long id, User user) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        if (!comment.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        commentRepository.delete(comment);
    }
}
