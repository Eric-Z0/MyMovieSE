import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-sort-nav-bar',
  templateUrl: './sort-nav-bar.component.html',
  styleUrls: ['./sort-nav-bar.component.css']
})
export class SortNavBarComponent implements OnInit {

  // Set up the variables to implement the 'selected' effect
  // Flags for movie category
  cateAllFlag: boolean = false;
  movieFlag: boolean = false;
  seriesFlag: boolean = false;
  episodeFlag: boolean = false;
  categoryFlagArr: boolean[] = [this.cateAllFlag, this.movieFlag, this.seriesFlag, this.episodeFlag];

  // Flags for movie genre
  genreAllFlag: boolean = false;
  animationFlag: boolean = false;
  adventureFlag: boolean = false;
  comedyFlag: boolean = false;
  familyFlag: boolean = false;
  fantasyFlag: boolean = false;
  musicalFlag: boolean = false;
  genreFlagArr: boolean[] = [this.genreAllFlag, this.animationFlag, this.adventureFlag, this.comedyFlag, this.familyFlag, this.fantasyFlag, this.musicalFlag];

  // Flags for movie year
  yearAllFlag: boolean = false;
  m2019Flag: boolean = false;
  m2018Flag: boolean = false;
  m2017Flag: boolean = false;
  m2016Flag: boolean = false;
  m2015Flag: boolean = false;
  yearFlagArr: boolean[] = [this.yearAllFlag, this.m2019Flag, this.m2018Flag, this.m2017Flag, this.m2016Flag, this.m2015Flag];

  // Flags for movie country
  conAllFlag: boolean = false;
  usaFlag: boolean = false;
  canFlag: boolean = false;
  franceFlag: boolean = false;
  japanFlag: boolean = false;
  countryFlagArr: boolean[] = [this.conAllFlag, this.usaFlag, this.canFlag, this.franceFlag, this.japanFlag];

  // Flag for movie langauge
  langAllFlag: boolean = false;
  enFlag: boolean = false;
  fnFlag: boolean = false;
  geFlag: boolean = false;
  langFlagArr: boolean[] = [this.langAllFlag, this.enFlag, this.fnFlag, this.geFlag];

  // A filter array stores all the criteria selected
  filterCollection: string[] = new Array(5);

  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

  getMovieAfterFilter() {
    this.movieService.movieCriteriaClicked(this.filterCollection);
  }

  filterByCategory(category: string) {

    for(let index=0; index<this.categoryFlagArr.length; index++) {
      this.categoryFlagArr[index] = false;
    }

    switch(category) {
      case "All":
        this.categoryFlagArr[0] = true;
        break;
      case "Movie":
        this.categoryFlagArr[1] = true;
        break;
      case "Series":
        this.categoryFlagArr[2] = true;
        break;
      case "Episode":
        this.categoryFlagArr[3] = true;
        break;
    }

    this.filterCollection[0] = category;
    this.getMovieAfterFilter();
    //console.log(category);
  }

  filterByGenre(genre: string) {

    for(let index=0; index<this.genreFlagArr.length; index++) {
      this.genreFlagArr[index] = false;
    }

    switch(genre) {
      case "All":
        this.genreFlagArr[0] = true;
        break;
      case "Animation":
        this.genreFlagArr[1] = true;
        break;
      case "Adventure":
        this.genreFlagArr[2] = true;
        break;
      case "Comedy":
        this.genreFlagArr[3] = true;
        break;
      case "Family":
        this.genreFlagArr[4] = true;
        break;
      case "Fantasy":
        this.genreFlagArr[5] = true;
        break;
      case "Musical":
        this.genreFlagArr[6] = true;
        break;
    }

    this.filterCollection[1] = genre;
    this.getMovieAfterFilter();
    //console.log(genre);
  }

  filterByYear(year: string) {

    for(let index=0; index<this.yearFlagArr.length; index++) {
      this.yearFlagArr[index] = false;
    }

    switch(year) {
      case "All":
        this.yearFlagArr[0] = true;
        break;
      case "2019":
        this.yearFlagArr[1] = true;
        break;
      case "2018":
        this.yearFlagArr[2] = true;
        break;
      case "2017":
        this.yearFlagArr[3] = true;
        break;
      case "2016":
        this.yearFlagArr[4] = true;
        break;
      case "2015":
        this.yearFlagArr[5] = true;
        break;
    }

    this.filterCollection[2] = year;
    this.getMovieAfterFilter();
    //console.log(year);
  }

  filterByCountry(country: string) {

    for(let index=0; index<this.countryFlagArr.length; index++) {
      this.countryFlagArr[index] = false;
    }

    switch(country) {
      case "All":
        this.countryFlagArr[0] = true;
        break;
      case "USA":
        this.countryFlagArr[1] = true;
        break;
      case "Canada":
        this.countryFlagArr[2] = true;
        break;
      case "France":
        this.countryFlagArr[3] = true;
        break;
      case "Japan":
        this.countryFlagArr[4] = true;
        break;
    }

    this.filterCollection[3] = country;
    this.getMovieAfterFilter();
    //console.log(country);
  }

  filterByLanguage(lang: string) {

    for(let index=0; index<this.langFlagArr.length; index++) {
      this.langFlagArr[index] = false;
    }

    switch(lang) {
      case "All":
        this.langFlagArr[0] = true;
        break;
      case "English":
        this.langFlagArr[1] = true;
        break;
      case "French":
        this.langFlagArr[2] = true;
        break;
      case "German":
        this.langFlagArr[3] = true;
        break;
    }

    this.filterCollection[4] = lang;
    this.getMovieAfterFilter();
    //console.log(lang);
  }

}
