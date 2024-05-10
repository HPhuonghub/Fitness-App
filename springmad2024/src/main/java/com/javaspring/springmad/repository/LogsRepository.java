package com.javaspring.springmad.repository;

import com.javaspring.springmad.entity.Logs;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogsRepository extends JpaRepository<Logs, Long> {

    List<Logs> findByUserCollectionDetailUserId(Long userCollectionDetailUserId);

}
