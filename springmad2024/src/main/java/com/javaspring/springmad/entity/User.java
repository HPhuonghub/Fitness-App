package com.javaspring.springmad.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    private String full_name;

    @Column(nullable = false)
    private String hashed_password;

    private boolean is_active;

    @Column(nullable = false)
    private String user_level;

    @Column(nullable = false)
    private float weight;

    @Column(nullable = false)
    private float height;

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role role;

    @OneToMany(mappedBy = "user")
    private Set<UserCollectionDetail> userCollectionDetails;
	
}
