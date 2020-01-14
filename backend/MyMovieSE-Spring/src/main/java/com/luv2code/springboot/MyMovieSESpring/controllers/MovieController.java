package com.luv2code.springboot.MyMovieSESpring.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.luv2code.springboot.MyMovieSESpring.models.Movie;
import com.luv2code.springboot.MyMovieSESpring.repository.MovieRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class MovieController {
	
	@Autowired
	MovieRepository movieRepository;
	
	String[] best50Movies = {
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
	
	
	@GetMapping("/movie")
	public void getMovieInfo()
	{
		final String url = "http://www.omdbapi.com/?i=tt7286456&apikey=a9b731fa";
		RestTemplate restTemplate = new RestTemplate();
		String result = restTemplate.getForObject(url, String.class);
		ObjectMapper mapper = new ObjectMapper();
		try {
			Movie myMovie = mapper.readValue(result, Movie.class);
			System.out.println(myMovie.getActors());
			movieRepository.save(myMovie);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}
	
	
	@GetMapping("/filter")
	public String movieFilter() {
		
		// return movies based on filter type selected
		// this is achieved by parsing url
		ObjectMapper mapper = new ObjectMapper();
		Movie myMovieFetched = movieRepository.findAll().get(0);
		
		try {
			String jsonStr = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(myMovieFetched);
			return jsonStr;
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		return "No matching movie found";
	}
	

}
