package com.javaspring.springmad.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ExerciseCollection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private boolean publicity;

    @Column(nullable = false)
    private String calories;

    @Column(nullable = true)
    private String image;

    @OneToMany(mappedBy = "exerciseCollection")
    private List<UserCollectionDetail> userCollectionDetails;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(
            name = "exercise_collection_id",
            referencedColumnName = "id"
    )
    private List<ExerciseCollectionDetail> exerciseCollectionDetails;


}
