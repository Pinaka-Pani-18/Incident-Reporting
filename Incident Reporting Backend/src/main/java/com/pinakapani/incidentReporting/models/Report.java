package com.pinakapani.incidentReporting.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "incidentReport")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String irDate;
    private String irTime;
    @NotBlank
    @Size(max = 20)
    private String department;

    @NotBlank
    @Size(max = 10)
    private String incidentType;

    @NotBlank
    @Size(max = 20)
    private String description;

    @NotBlank
    @Size(max = 10)
    private String level;

    @NotBlank
    @Size(max = 20)
    private String person;

    @NotBlank
    @Size(max = 20)
    private String departmentResOrSolutionPro;

    @NotBlank
    @Size(max = 20)
    private String statusUser;
}

