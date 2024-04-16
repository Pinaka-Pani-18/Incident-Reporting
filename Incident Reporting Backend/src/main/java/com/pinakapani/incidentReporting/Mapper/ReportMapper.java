package com.pinakapani.incidentReporting.Mapper;

import com.pinakapani.incidentReporting.Dto.ReportDto;
import com.pinakapani.incidentReporting.models.Report;

public class ReportMapper {
    public static ReportDto mapToReportDto(Report report){
        return new ReportDto(
                report.getId(),
                report.getIrDate(),
                report.getIrTime(),
                report.getDepartment(),
                report.getIncidentType(),
                report.getDescription(),
                report.getLevel(),
                report.getPerson(),
                report.getDepartmentResOrSolutionPro(),
                report.getStatusUser()
        );
    }
    public static Report mapToReport(ReportDto reportDto){
        return new Report(
                reportDto.getId(),
                reportDto.getIrDate(),
                reportDto.getIrTime(),
                reportDto.getDepartment(),
                reportDto.getIncidentType(),
                reportDto.getDescription(),
                reportDto.getLevel(),
                reportDto.getPerson(),
                reportDto.getDepartmentResOrSolutionPro(),
                reportDto.getStatusUser()
        );
    }
}

