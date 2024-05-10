package com.javaspring.springmad.repository;

import com.javaspring.springmad.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

	Exercise findByName(String name);

}
