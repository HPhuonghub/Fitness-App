package com.javaspring.springmad.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class CustomCollection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "id"
    )
    private User user;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(
            name = "customcollection_id",
            referencedColumnName = "id"
    )
    private List<CustomeCollectionDetail> customeCollectionDetails;
}
