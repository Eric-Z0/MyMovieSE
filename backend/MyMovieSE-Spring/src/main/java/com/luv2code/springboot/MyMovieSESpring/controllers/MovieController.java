package com.luv2code.springboot.MyMovieSESpring.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.luv2code.springboot.MyMovieSESpring.models.Movie;
import com.luv2code.springboot.MyMovieSESpring.models.MovieSnapshot;
import com.luv2code.springboot.MyMovieSESpring.payload.response.MovieSnapshotResponse;
import com.luv2code.springboot.MyMovieSESpring.repository.MovieRepository;
import com.luv2code.springboot.MyMovieSESpring.repository.MovieSnapshotRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class MovieController {
	
	@Autowired
	MovieSnapshotRepository movieSnapshotRepository;
	
	@Autowired
	MovieRepository movieRepository;
	
	String[] best50MoviesP1 = {
		"Black Panther", "Avengers: Endgame", "Us", "Toy Story 4", "Mission: Impossible - Fallout",
		"Lady Bird", "The Wizard of Oz", "The Irishman", "Citizen Kane", "BlacKkKlansman", "The Cabinet of Dr. Caligari",
		"Get Out", "Spider-Man: Into the Spider-Verse", "Mad Max: Fury Road", "Modern Times", "Booksmart",
		"Roma", "Moonlight", "A Star Is Born", "The Third Man", "Wonder Woman", "Dunkirk", "Casablanca",
		"Inside Out", "The Farewell", "It Happened One Night", "La Grande illusion", "Eighth Grade", "All About Eve",
		"Coco", "A Quiet Place", "Star Wars: The Last Jedi", "Spotlight", "Selma", "E.T. The Extra-Terrestrial", 
		"Spider-Man: Far From Home", "Snow White and the Seven Dwarfs", "The Shape of Water", "The Bride of Frankenstein",
		"Thor: Ragnarok", "Arrival", "The Godfather", "Singin' in the Rain", "Logan", "The Big Sick", "Incredibles 2", 
		"Paddington 2", "The Favourite", "King Kong", "The Adventures of Robin Hood"		
	};
	
	String[] best50MoviesP2 = {
			"Metropolis", "Once Upon a Time In Hollywood", "Laura", "Gravity", "Top Hat", "Leave No Trace",
			"Boyhood", "The Maltese Falcon", "Manchester by the Sea", "Argo", "12 Years a Slave", "Baby Driver",
			"Zootopia", "War for the Planet of the Apes", "Psycho", "The Florida Project", "La La Land", "The Night of the Hunter",
			"Spider-Man: Homecoming", "Widows", "Alien", "Seven Samurai", "North by Northwest", "Shoplifters",
			"Sunset Boulevard", "Shazam", "Won't You Be My Neighbor?", "Hell or High Water", "Toy Story 2",
			"Up", "Toy Story 3", "There will be blood", "Mulholland Drive", "The Dark Knight", "Tokyo Story",
			"Lost in Translation", "Spirited Away", "Blade Runner", "Under the Skin", "Brokeback Mountain", "Boyhood"
	};
	
	/*
	// THE FOLLOWING COMMENTED OUT CODE ONLY USED FOR DB INITIALIZATION AND TESTING
	
	@GetMapping("/init")
	public String initMovieDB() {
		
		RestTemplate restTemplate = new RestTemplate();
		ObjectMapper mapper = new ObjectMapper();
		MovieSnapshotResponse msRes;
		
		for(int index=0; index < best50MoviesP2.length; index++) 
		{
			String movieUrl = String.format("http://www.omdbapi.com/?s=%s&apikey=a9b731fa", best50MoviesP2[index]);
			String result = restTemplate.getForObject(movieUrl, String.class);
			System.out.println();
			
			try {
				msRes = mapper.readValue(result, MovieSnapshotResponse.class);
				MovieSnapshot[] msArray = msRes.getSearch();
				
				movieSnapshotRepository.save(msArray[0]);
				//for(int i=0; i<msArray.length; i++) {
				//	movieSnapshotRepository.save(msArray[i]);
				//}
				
			} catch (JsonMappingException e) {
				e.printStackTrace();
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
		}
		
		return "Database has been initialized";
	}
	
	
	// An auxiliary function to load
	@GetMapping("/addAllToMovieDB")
	public String loadMovieDetailsToDB()
	{
		List<MovieSnapshot> msList = movieSnapshotRepository.findAll();
		RestTemplate restTemplate = new RestTemplate();
		ObjectMapper mapper = new ObjectMapper();
		
		for(int index=0; index < msList.size(); index++) {
			String imdbID = msList.get(index).getImdbID();
			String movieUrl = String.format("http://www.omdbapi.com/?i=%s&apikey=a9b731fa", imdbID);
			String result = restTemplate.getForObject(movieUrl, String.class);
			try {
				Movie myMovie = mapper.readValue(result, Movie.class);
				myMovie.setWriter("empty"); // a temporary fix to insert movie data into SQL
				movieRepository.save(myMovie);
			} catch (JsonMappingException e) {
				e.printStackTrace();
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
		}
		
		return "Load movie details finished";
	}
	
	
	// An auxiliary function to load
	@GetMapping("/addToMovieDB/i={id}")
	public void loadMovieDetailToDB(@PathVariable("id") String imdbId)
	{
		final String url = "http://www.omdbapi.com/?i=" + imdbId + "&apikey=a9b731fa";
		RestTemplate restTemplate = new RestTemplate();
		String result = restTemplate.getForObject(url, String.class);
		ObjectMapper mapper = new ObjectMapper();
		
		try {
			Movie myMovie = mapper.readValue(result, Movie.class);
			movieRepository.save(myMovie);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}
	
	*/
	
	// When the front end starts this url will be requested
	@GetMapping("/upload")
	public String uploadMovieCollection() {
		
		List<MovieSnapshot> msList = movieSnapshotRepository.findAll();
		MovieSnapshot[] msArray = new MovieSnapshot[msList.size()];
		
		for(int index=0; index < msList.size(); index++) {
			msArray[index] = msList.get(index);
		}
		
		MovieSnapshotResponse msRes = new MovieSnapshotResponse();
		msRes.setSearch(msArray);
		msRes.setTotalResults("" + msArray.length);
		msRes.setResponse("True");
		
		ObjectMapper mapper = new ObjectMapper();
		
		try {
			String jsonStr = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(msRes);
			return jsonStr;
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		return "Unable to upload movies";
	}
	
	// This function returns a detailed info related to a movie based on its id
	// Note: this function may be not be used
	@GetMapping("/movie/i={id}")
	public String getMovieInfo(@PathVariable("id") String imdbId)
	{
		Movie movie = movieRepository.findByImdbID(imdbId);
		
		if(movie != null)
		{
			ObjectMapper mapper = new ObjectMapper();
			try {
				String jsonStr = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(movie);
				return jsonStr;
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
		} 
		
		return "No matching movie found";
	}
	
	// This function returns a collection of movieSnapshots base on criteria set by user
	@GetMapping("/filter/c={cat}/g={genre}/y={year}/r={country}/l={lang}")
	public String movieFilter(@PathVariable("cat") String category,
			@PathVariable("genre") String genre,
			@PathVariable("year") String year,
			@PathVariable("country") String country,
			@PathVariable("lang") String lang) 
	{
		List<Movie> movies = movieRepository.findAll();
		
		if(category != null && !category.isEmpty()) {
			
			Stream<Movie> streamMovies =  movies.stream().filter(m -> m.getType().equals(category));
			movies = streamMovies.collect(Collectors.toList());
			//System.out.println("Cat is selected!");
		}
		
		if(genre != null && !genre.isEmpty()) {
			
			Stream<Movie> streamMovies =  movies.stream().filter(m -> m.getGenre().equals(genre));
			movies = streamMovies.collect(Collectors.toList());
			//System.out.println("genre is selected!");
		}
		
		if(year != null && !year.isEmpty()) {
			
			Stream<Movie> streamMovies =  movies.stream().filter(m -> m.getYear().equals(year));
			movies = streamMovies.collect(Collectors.toList());
			//System.out.println("year is selected!");
		}
		
		if(country != null && !country.isEmpty()) {
			
			Stream<Movie> streamMovies =  movies.stream().filter(m -> m.getCountry().equals(country));
			movies = streamMovies.collect(Collectors.toList());
			//System.out.println("country is selected!");
		}
		
		if(lang != null && !lang.isEmpty()) {
			
			Stream<Movie> streamMovies =  movies.stream().filter(m -> m.getLanguage().equals(lang));
			movies = streamMovies.collect(Collectors.toList());
			//System.out.println("lang is selected!");
		}
		
		if(movies.size() != 0) {
			
			List<MovieSnapshot> msList = new ArrayList<>();
			
			for(int index=0; index < movies.size(); index++) {
				String imdbID = movies.get(index).getImdbID();
				MovieSnapshot ms = movieSnapshotRepository.findByImdbID(imdbID);
				msList.add(ms);
			}
			
			// Convert List to Array
			MovieSnapshot[] msArray = new MovieSnapshot[msList.size()];
			
			for(int index=0; index < msList.size(); index++) {
				msArray[index] = msList.get(index);
			}
			
			MovieSnapshotResponse msRes = new MovieSnapshotResponse();
			msRes.setSearch(msArray);
			msRes.setTotalResults("" + msArray.length);
			msRes.setResponse("True");
			
			ObjectMapper mapper = new ObjectMapper();
			
			try {
				String jsonStr = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(msRes);
				return jsonStr;
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
			
		}
		
		return "No matching movie found";
	}
	

}
