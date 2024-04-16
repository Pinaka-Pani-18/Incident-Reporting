package com.pinakapani.incidentReporting.controllers;

import com.pinakapani.incidentReporting.Dto.ReportDto;
import com.pinakapani.incidentReporting.security.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

      @GetMapping("/")
    public String allAccess() {
        return "Welcome to Aravind Eye Care ";
    }

    @GetMapping("/reporting-page")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public String reportingPageAccess() {
        return "Welcome to Aravind Eye Care ";
    }

    @GetMapping("/department-head")
    @PreAuthorize("hasRole('ADMIN')")
    public String DepartmentHeadAcceess() {
        return "Welcome to Aravind Eye Care ";
    }

    @PostMapping("/save")
    public ResponseEntity<ReportDto> createReports(@RequestBody ReportDto reportDto){
        ReportDto savedReport = reportService.createReport(reportDto);
        return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
    }


    @GetMapping("/all")
    public ResponseEntity<List<ReportDto>> getAllReports(){
        List<ReportDto> allReports = reportService.getAllReports();
        return ResponseEntity.ok(allReports);
    }

//    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("{id}")
    public ResponseEntity<ReportDto> getReportId(@PathVariable("id") Integer reportId){
        ReportDto getRepo = reportService.getReportById(reportId);
        return ResponseEntity.ok(getRepo);
    }

//    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<ReportDto> updateReport(@PathVariable("id") Integer employeeId,@RequestBody ReportDto updatedReportDto){
        ReportDto reportDto = reportService.updateReport(employeeId, updatedReportDto);
        return ResponseEntity.ok(reportDto);
    }

//    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteReport(@PathVariable("id") Integer reportId){
        reportService.deleteReport(reportId);
        return ResponseEntity.ok("Successfully deleted the employee");
    }
}
