package com.javaspring.springmad.service;

import com.javaspring.springmad.entity.ExerciseType;
import com.javaspring.springmad.repository.ExerciseTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExerciseTypeService {
    @Autowired
    private ExerciseTypeRepository exerciseTypeRepository;

    public List<ExerciseType> getAllExerciseType() {
        return exerciseTypeRepository.findAll();
    }

    public ExerciseType getExerciseTypeById(Long id) {
        return exerciseTypeRepository.findById(id).orElse(null);
    }

    public ExerciseType createExerciseType(ExerciseType exerciseType) {
            return exerciseTypeRepository.save(exerciseType);
    }

    public ExerciseType updateExerciseType(Long id, ExerciseType exerciseType) {
        Optional<ExerciseType> existingExerciseTypeOptional = exerciseTypeRepository.findById(id);
        if (existingExerciseTypeOptional.isPresent()) {
            ExerciseType existingExerciseType = existingExerciseTypeOptional.get();
            existingExerciseType.setName(exerciseType.getName());
            return exerciseTypeRepository.save(existingExerciseType);
        } else {
            return null;
        }
    }


    public void deleteExerciseType(Long id) {
        exerciseTypeRepository.deleteById(id);
    }
}
