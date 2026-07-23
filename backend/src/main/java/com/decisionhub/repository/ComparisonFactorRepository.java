package com.decisionhub.repository;

import com.decisionhub.entity.ComparisonFactor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComparisonFactorRepository extends JpaRepository<ComparisonFactor, Long> {
    List<ComparisonFactor> findByDecisionId(Long decisionId);
}
