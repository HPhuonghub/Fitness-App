package com.javaspring.springmad.service;

import com.javaspring.springmad.entity.ExerciseTypeDetail;
import com.javaspring.springmad.repository.ExerciseTypeDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExerciseTypeDetailService {
    @Autowired
    private ExerciseTypeDetailRepository exerciseTypeDetailRepository;

    public List<ExerciseTypeDetail> getAllExerciseTypeDetail() {
        return exerciseTypeDetailRepository.findAll();
    }

    public ExerciseTypeDetail getExerciseTypeDetailById(Long id) {
        return exerciseTypeDetailRepository.findById(id).orElse(null);
    }

    public ExerciseTypeDetail createExerciseTypeDetail(ExerciseTypeDetail exerciseType) {
            return exerciseTypeDetailRepository.save(exerciseType);
    }

//    public ExerciseTypeDetail updateExerciseTypeDetail(Long id, ExerciseTypeDetail exerciseType) {
//        Optional<ExerciseTypeDetail> existingExerciseTypeDetailOptional = exerciseTypeDetailRepository.findById(id);
//        if (existingExerciseTypeDetailOptional.isPresent()) {
//            ExerciseTypeDetail existingExerciseTypeDetail = existingExerciseTypeDetailOptional.get();
//            existingExerciseTypeDetail.setName(exerciseType.getName());
//            return exerciseTypeDetailRepository.save(existingExerciseTypeDetail);
//        } else {
//            return null;
//        }
//    }


    public void deleteExerciseTypeDetail(Long id) {
        exerciseTypeDetailRepository.deleteById(id);
    }
}
