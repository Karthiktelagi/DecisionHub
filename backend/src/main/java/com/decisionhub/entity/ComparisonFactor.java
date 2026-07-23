package com.decisionhub.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="comparison_factors")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComparisonFactor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @Builder.Default
    private double weight = 1.0;

    @ManyToOne
    @JoinColumn(name = "decision_id")
    @JsonIgnore
    private Decision decision;
}
