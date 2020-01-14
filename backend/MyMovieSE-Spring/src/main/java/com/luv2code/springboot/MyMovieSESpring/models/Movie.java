package com.luv2code.springboot.MyMovieSESpring.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@Table(name="movie", uniqueConstraints = { @UniqueConstraint(columnNames = "title")})
public class Movie {

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
	
	@JsonProperty("Rated")
	private String rated;
	
	@JsonProperty("Released")
	private String released;
	
	@JsonProperty("Runtime")
	private String runtime;
	
	@JsonProperty("Genre")
	@Column(name="genre")
	private String genre;
	
	@JsonProperty("Director")
	@Column(name="director")
	private String director;
	
	@JsonProperty("Writer")
	private String writer;
	
	@JsonProperty("Actors")
	@Column(name="actors")
	private String actors;
	
	@JsonProperty("Plot")
	@Column(name="plot")
	private String plot;
	
	@JsonProperty("Language")
	@Column(name="language")
	private String language;
	
	@JsonProperty("Country")
	@Column(name="country")
	private String country;
	
	@JsonProperty("Awards")
	private String awards;

	@JsonProperty("Poster")
	@Column(name="poster")
	private String poster;
	
	@JsonProperty("Metascore")
	private String metascore;

	@Column(name="rating")
	private String imdbRating;
	
	private String imdbVotes;
	
	@Column(name="imdbID")
	private String imdbID;
	
	@JsonProperty("Type")
	private String type;
	
	@JsonProperty("DVD")
	private String dvd;
	
	@JsonProperty("BoxOffice")
	private String boxOffice;
	
	@JsonProperty("Production")
	private String production;
	
	@JsonProperty("Website")
	private String website;
	
	@JsonProperty("Response")
	private String reponse;
	
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

	public String getRated() {
		return rated;
	}

	public void setRated(String rated) {
		this.rated = rated;
	}

	public String getReleased() {
		return released;
	}

	public void setReleased(String released) {
		this.released = released;
	}

	public String getRuntime() {
		return runtime;
	}

	public void setRuntime(String runtime) {
		this.runtime = runtime;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public String getDirector() {
		return director;
	}

	public void setDirector(String director) {
		this.director = director;
	}

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	public String getActors() {
		return actors;
	}

	public void setActors(String actors) {
		this.actors = actors;
	}

	public String getPlot() {
		return plot;
	}

	public void setPlot(String plot) {
		this.plot = plot;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getAwards() {
		return awards;
	}

	public void setAwards(String awards) {
		this.awards = awards;
	}

	public String getPoster() {
		return poster;
	}

	public void setPoster(String poster) {
		this.poster = poster;
	}
	
	public String getMetascore() {
		return metascore;
	}

	public void setMetascore(String metascore) {
		this.metascore = metascore;
	}

	public String getImdbRating() {
		return imdbRating;
	}

	public void setImdbRating(String imdbRating) {
		this.imdbRating = imdbRating;
	}

	public String getImdbVotes() {
		return imdbVotes;
	}

	public void setImdbVotes(String imdbVotes) {
		this.imdbVotes = imdbVotes;
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

	public String getDvd() {
		return dvd;
	}

	public void setDvd(String dvd) {
		this.dvd = dvd;
	}

	public String getBoxOffice() {
		return boxOffice;
	}

	public void setBoxOffice(String boxOffice) {
		this.boxOffice = boxOffice;
	}

	public String getProduction() {
		return production;
	}

	public void setProduction(String production) {
		this.production = production;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getReponse() {
		return reponse;
	}

	public void setReponse(String reponse) {
		this.reponse = reponse;
	}
}