package com.pinakapani.incidentReporting.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReportDto {
    private int id;
    private String irDate;
    private String irTime;
    private String department;
    private String incidentType;
    private String description;
    private String level;
    private String person;
    private String departmentResOrSolutionPro;
    private String statusUser;
}