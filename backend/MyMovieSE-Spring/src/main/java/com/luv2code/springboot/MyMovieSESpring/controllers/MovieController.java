package com.luv2code.springboot.MyMovieSESpring.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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
@RequestMapping("/api/movie")
public class MovieController {
	
	@Autowired
	MovieSnapshotRepository movieSnapshotRepository;
	
	@Autowired
	MovieRepository movieRepository;
	
	/*
	TODO: Write a function that will return a user's first 5 movies they browsed
	recently based on user id
	
	@GetMapping("/id={userId}/browseHistory")
	@PreAuthorize("hasRole('User')")
	public String getBrowseHistory()
	{
		// S1: 
		
	}
	*/
	
	// This function returns a detailed info related to a movie based on its id
	// Note: this function may be not be used
	@GetMapping("/i={id}")
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
		
		if(!category.equals("All") && !category.isEmpty())
		{
			Stream<Movie> streamMovies =  movies.stream().filter(m -> m.getType().equals(category));
			movies = streamMovies.collect(Collectors.toList());
			System.out.println("Cat is selected!");
		}
		
		if(!genre.equals("All") && !genre.isEmpty()) 
		{
			Stream<Movie> streamMovies =  movies.stream().filter(m -> m.getGenre().contains(genre));
			movies = streamMovies.collect(Collectors.toList());
			System.out.println("genre is selected!");
		}
		
		if(!year.equals("All") && !year.isEmpty()) {
			
			Stream<Movie> streamMovies =  movies.stream().filter(m -> m.getYear().equals(year));
			movies = streamMovies.collect(Collectors.toList());
			System.out.println("year is selected!");
		}
		
		if(!country.equals("All") && !country.isEmpty())
		{
			Stream<Movie> streamMovies =  movies.stream().filter(m -> m.getCountry().contains(country));
			movies = streamMovies.collect(Collectors.toList());
			System.out.println("country is selected!");
		}
		
		if(!lang.equals("All") && !lang.isEmpty()) 
		{
			Stream<Movie> streamMovies =  movies.stream().filter(m -> m.getLanguage().contains(lang));
			movies = streamMovies.collect(Collectors.toList());
			System.out.println("lang is selected!");
		}
		
		ObjectMapper mapper = new ObjectMapper();
		
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
			msRes.setTotalResults(String.valueOf(msArray.length));
			msRes.setResponse("True");
			
			try {
				System.out.println("Number of movies found: " + msList.size());
				String jsonResStr = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(msRes);
				return jsonResStr;
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
			
		}
		
		// If there is no matching movies found
		String jsonResNoMatchStr = null;
		MovieSnapshotResponse msRes = new MovieSnapshotResponse();
		msRes.setSearch(null);
		msRes.setTotalResults(String.valueOf(0));
		msRes.setResponse("True");
		
		try {
			jsonResNoMatchStr = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(msRes);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		System.out.println("No matching movies found");
		return jsonResNoMatchStr;
	}
	

}
