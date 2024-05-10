package com.javaspring.springmad.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ExerciseCollectionDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private int idx;

    @Column(nullable = false)
    private boolean state;

    @ManyToOne
    @JoinColumn(name = "exercise_id", referencedColumnName = "id")
//    @JsonBackReference
    private Exercise exercise;

    @ManyToOne
    @JoinColumn(name = "exercise_collection_id", referencedColumnName = "id")
    @JsonBackReference
    private ExerciseCollection exerciseCollection;
}
