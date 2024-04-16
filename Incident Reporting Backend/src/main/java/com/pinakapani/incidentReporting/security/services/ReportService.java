package com.pinakapani.incidentReporting.security.services;

import com.pinakapani.incidentReporting.Dto.ReportDto;
import com.pinakapani.incidentReporting.Exception.ResourceNotFoundException;
import com.pinakapani.incidentReporting.Mapper.ReportMapper;
import com.pinakapani.incidentReporting.models.Report;
import com.pinakapani.incidentReporting.repository.ReportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReportService {

    @Autowired
    private ReportRepo reportRepo;

    public ReportDto createReport(ReportDto reportDto){
        Report report = ReportMapper.mapToReport(reportDto);
        Report savedReport = reportRepo.save(report);
        return ReportMapper.mapToReportDto(savedReport);
    }

    public List<ReportDto> getAllReports() {
        List<Report> reports = reportRepo.findAll();
        return reports.stream().map((e) ->  ReportMapper.mapToReportDto(e)).collect(Collectors.toList());
    }

    public ReportDto getReportById(Integer repoId) {
        Report report = reportRepo.findById(repoId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Report is not exists with the given id : " + repoId));
        return ReportMapper.mapToReportDto(report);
    }

    public ReportDto updateReport(Integer reportId,ReportDto updatedReportDto) {
        Report report =  reportRepo.findById(reportId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Report is not exists with the given id : " + reportId));

        report.setIrDate(updatedReportDto.getIrDate());
        report.setIrTime(updatedReportDto.getIrTime());
        report.setDepartment(updatedReportDto.getDepartment());
        report.setIncidentType(updatedReportDto.getIncidentType());
        report.setLevel(updatedReportDto.getLevel());
        report.setPerson(updatedReportDto.getPerson());
        report.setDescription(updatedReportDto.getDescription());
        report.setStatusUser(updatedReportDto.getStatusUser());
        report.setDepartmentResOrSolutionPro(updatedReportDto.getDepartmentResOrSolutionPro());

        Report updatedReport = reportRepo.save(report);

        return ReportMapper.mapToReportDto(updatedReport);
    }

    public void deleteReport(Integer reportId) {
        Report report =  reportRepo.findById(reportId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Report is not exists with the given id : " + reportId));
        System.out.println(report);
        reportRepo.deleteById(reportId);
    }
}
