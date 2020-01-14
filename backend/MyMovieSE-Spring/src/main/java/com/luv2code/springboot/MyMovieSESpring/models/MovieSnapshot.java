package com.luv2code.springboot.MyMovieSESpring.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="movie_snapshot", uniqueConstraints = { @UniqueConstraint(columnNames = "imdbID")})
public class MovieSnapshot {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	
	@JsonProperty("Title")
	@NotBlank
	@Column(name="title")
	private String title;
	
	@JsonProperty("Year")
	@Column(name="year")
	private String year;
	
	@Column(name="imdbID")
	private String imdbID;
	
	@JsonProperty("Type")
	@Column(name="type")
	private String type;
	
	@JsonProperty("Poster")
	@Column(name="poster")
	private String poster;

	// Getters and Setters
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getImdbID() {
		return imdbID;
	}

	public void setImdbID(String imdbID) {
		this.imdbID = imdbID;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getPoster() {
		return poster;
	}

	public void setPoster(String poster) {
		this.poster = poster;
	}

}
