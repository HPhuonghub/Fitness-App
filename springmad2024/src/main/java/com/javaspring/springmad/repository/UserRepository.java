package com.javaspring.springmad.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaspring.springmad.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	User findByUsername(String username);

}
