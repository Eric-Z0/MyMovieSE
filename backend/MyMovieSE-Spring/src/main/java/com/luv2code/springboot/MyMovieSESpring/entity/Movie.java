package com.luv2code.springboot.MyMovieSESpring.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="movie")
@Data
public class Movie {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	
	@Column(name="genre")
	private String genre;
	
	@Column(name="year")
	private String year;
	
	@Column(name="country")
	private String country;
	
	@Column(name="language")
	private String language;
	
	@Column(name="rating")
	private double rating;
	
	@Column(name="director")
	private String director;
	
	@Column(name="actors")
	private String[] actors;
	
	@Column(name="plot")
	private String plot;
	
	@Column(name="poster_url")
	private String posterUrl;
	
}
