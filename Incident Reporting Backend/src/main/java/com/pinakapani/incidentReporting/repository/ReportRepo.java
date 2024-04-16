package com.pinakapani.incidentReporting.repository;


import com.pinakapani.incidentReporting.models.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepo extends JpaRepository<Report, Integer> {

}
