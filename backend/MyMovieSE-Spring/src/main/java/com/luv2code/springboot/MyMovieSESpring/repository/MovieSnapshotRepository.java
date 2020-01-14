package com.luv2code.springboot.MyMovieSESpring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luv2code.springboot.MyMovieSESpring.models.MovieSnapshot;

public interface MovieSnapshotRepository extends JpaRepository<MovieSnapshot, Long>{

}
