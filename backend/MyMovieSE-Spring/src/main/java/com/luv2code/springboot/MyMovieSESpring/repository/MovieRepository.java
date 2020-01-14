package com.luv2code.springboot.MyMovieSESpring.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luv2code.springboot.MyMovieSESpring.models.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {

	Movie findByImdbID(String imdbID);
	
}
