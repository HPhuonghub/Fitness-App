package com.javaspring.springmad.repository;

import com.javaspring.springmad.entity.ExerciseCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExerciseCollectionRepository extends JpaRepository<ExerciseCollection, Long> {

    ExerciseCollection findByName(String name);

    @Query("SELECT SUM(ec.calories) FROM ExerciseCollection ec")
    Double getTotalCalories();

    @Query("SELECT ec FROM ExerciseCollection ec JOIN ec.userCollectionDetails ucd WHERE ucd.user.id = :userId")
    List<ExerciseCollection> findByUserId(@Param("userId") Long userId);
}
