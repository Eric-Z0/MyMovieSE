package com.luv2code.springboot.MyMovieSESpring.payload.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.luv2code.springboot.MyMovieSESpring.models.MovieSnapshot;

public class MovieSnapshotResponse {
	
	@JsonProperty("Search")
	private MovieSnapshot[] search;

	private String totalResults;
	
	@JsonProperty("Response")
	private String response;

	
	public MovieSnapshot[] getSearch() {
		return search;
	}

	public void setSearch(MovieSnapshot[] search) {
		this.search = search;
	}

	public String getTotalResults() {
		return totalResults;
	}

	public void setTotalResults(String totalResults) {
		this.totalResults = totalResults;
	}

	public String getResponse() {
		return response;
	}

	public void setResponse(String response) {
		this.response = response;
	}
	
}
