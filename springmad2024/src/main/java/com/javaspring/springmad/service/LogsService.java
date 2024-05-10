package com.javaspring.springmad.service;

import com.javaspring.springmad.entity.Logs;
import com.javaspring.springmad.repository.LogsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LogsService {
    @Autowired
    private LogsRepository logsRepository;

    public List<Logs> getAllLogs() {
        return logsRepository.findAll();
    }
    
    public List<Logs> getLogsByUserCollectionDetailUserId(Long userCollectionDetailId) {
        return logsRepository.findByUserCollectionDetailUserId(userCollectionDetailId);
    }

    public Logs getLogsById(Long id) {
        return logsRepository.findById(id).orElse(null);
    }

    public Logs createLogs(Logs logs) {
            return logsRepository.save(logs);
    }

    public Logs updateLogs(Long id, Logs logs) {
        Optional<Logs> existingLogsOptional = logsRepository.findById(id);
        if (existingLogsOptional.isPresent()) {
            Logs existingLogs = existingLogsOptional.get();
            existingLogs.setDescription(logs.getDescription());
            return logsRepository.save(existingLogs);
        } else {
            return null;
        }
    }


    public void deleteLogs(Long id) {
        logsRepository.deleteById(id);
    }
}
