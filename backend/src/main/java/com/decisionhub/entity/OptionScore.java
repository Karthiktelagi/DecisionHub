package com.decisionhub.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="option_scores")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OptionScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double score;

    private String notes;

    @ManyToOne
    @JoinColumn(name = "option_id")
    @JsonIgnore
    private Option option;

    @ManyToOne
    @JoinColumn(name = "factor_id")
    private ComparisonFactor factor;
}
