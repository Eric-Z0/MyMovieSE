package com.luv2code.springboot.MyMovieSESpring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luv2code.springboot.MyMovieSESpring.models.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {

	
}
