package com.luv2code.springboot.MyMovieSESpring.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.luv2code.springboot.MyMovieSESpring.entity.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {

	
}
