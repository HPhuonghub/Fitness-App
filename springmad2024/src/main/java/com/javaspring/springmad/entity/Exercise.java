package com.javaspring.springmad.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String detail;

    @Column(nullable = true)
    private String animation;

    @Column(nullable = true)
    private String video;

    @Column(nullable = true)
    private Integer rep;

    @Column(nullable = true)
    private Integer timer;

//    @OneToMany(cascade = CascadeType.ALL)
//    @JoinColumn(
//            name = "exercise_id",
//            referencedColumnName = "id"
//    )
//    private List<ExerciseCollectionDetail> exerciseCollectionDetails;
}
