package com.javaspring.springmad.controller;

import com.javaspring.springmad.entity.UserCollectionDetail;
import com.javaspring.springmad.entity.Logs;
import com.javaspring.springmad.service.LogsService;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
public class LogsController {

    @Autowired
    private LogsService logsService;

    @GetMapping
    public ResponseEntity<List<Logs>> getAllLogs() {
        List<Logs> logs = logsService.getAllLogs();

        return new ResponseEntity<>(logs, HttpStatus.OK);
    }
    
    @GetMapping("/user/{id}")
    public ResponseEntity<List<Logs>> getAllLogsByUserId(@PathVariable Long id) {
        List<Logs> logsUser = logsService.getLogsByUserCollectionDetailUserId(id);

        if (logsUser != null) {
            return new ResponseEntity<>(logsUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/count")
    public int getLogsCount() {
        List<Logs> logs = logsService.getAllLogs();

        return logs.size();
    }

    @GetMapping("/count/{id}")
    public int getLogsCountByUserId(@PathVariable Long id) {
        List<Logs> logsUser = logsService.getLogsByUserCollectionDetailUserId(id);

        return logsUser.size();
    }

    @GetMapping("/calories/{id}")
    public float getCaloriesByUserId(@PathVariable Long id) {
        
        float totalCalories = 0;
        
        List<Logs> logsUser = logsService.getLogsByUserCollectionDetailUserId(id);

        List<UserCollectionDetail> userCollectionDetails = new ArrayList<UserCollectionDetail>();

        for (int i = 0; i < logsUser.size(); i++) {
            var log = logsUser.get(i);
            
            var userCollectionDetail = log.getUserCollectionDetail();
            
            var exerciseCollection = userCollectionDetail.getExerciseCollection();
            
            totalCalories += Float.parseFloat(exerciseCollection.getCalories());

        }

        return totalCalories;
    }
    
     @GetMapping("/minutes/{id}")
    public int getTimesByUserId(@PathVariable Long id) {
        int totalMinute = 0;
        
        List<Logs> logsUser = logsService.getLogsByUserCollectionDetailUserId(id);
        
        for(int i = 0 ; i < logsUser.size();i++){
            var log = logsUser.get(i);
            
            totalMinute += Integer.parseInt(log.getDescription());
        }

        return totalMinute;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Logs> getLogsById(@PathVariable Long id) {
        Logs logs = logsService.getLogsById(id);
        if (logs != null) {
            return new ResponseEntity<>(logs, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Logs> createLogs(@RequestBody Logs logs) {
        Logs createdLogs = logsService.createLogs(logs);
        if (createdLogs != null) {
            return new ResponseEntity<>(createdLogs, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Logs> updateLogs(@PathVariable Long id, @RequestBody Logs logs) {
        Logs existingLogs = logsService.getLogsById(id);
        if (existingLogs != null) {
            Logs updatedLogs = logsService.updateLogs(id, logs);
            return new ResponseEntity<>(updatedLogs, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLogs(@PathVariable Long id) {
        Logs existingLogs = logsService.getLogsById(id);
        if (existingLogs != null) {
            logsService.deleteLogs(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
