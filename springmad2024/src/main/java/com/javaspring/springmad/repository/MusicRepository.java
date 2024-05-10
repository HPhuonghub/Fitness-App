package com.javaspring.springmad.repository;

import com.javaspring.springmad.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepository extends JpaRepository<Music, Long> {

}
