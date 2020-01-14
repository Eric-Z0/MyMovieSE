import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sort-nav-bar',
  templateUrl: './sort-nav-bar.component.html',
  styleUrls: ['./sort-nav-bar.component.css']
})
export class SortNavBarComponent implements OnInit {

  @Output() onSearch = new EventEmitter();

  // Set up the variables to implement the 'selected' effect
  // Flags for movie category
  movieFlag: boolean = false;
  seriesFlag: boolean = false;
  episodeFlag: boolean = false;
  categoryFlagArr: boolean[] = [this.movieFlag, this.seriesFlag, this.episodeFlag];

  // Flags for movie genre
  animationFlag: boolean = false;
  adventureFlag: boolean = false;
  comedyFlag: boolean = false;
  familyFlag: boolean = false;
  fantasyFlag: boolean = false;
  musicalFlag: boolean = false;
  genreFlagArr: boolean[] = [this.animationFlag, this.adventureFlag, this.comedyFlag, this.familyFlag, this.fantasyFlag, this.musicalFlag];

  // Flags for movie year
  m2019Flag: boolean = false;
  m2018Flag: boolean = false;
  m2017Flag: boolean = false;
  m2016Flag: boolean = false;
  m2015Flag: boolean = false;
  yearFlagArr: boolean[] = [this.m2019Flag, this.m2018Flag, this.m2017Flag, this.m2016Flag, this.m2015Flag];

  // Flags for movie country
  usaFlag: boolean = false;
  europeFlag: boolean = false;

  // Flag for movie langauge
  enFlag: boolean = false;
  fnFlag: boolean = false;


  constructor() { }

  ngOnInit() {
  }

  FilterByCategory(category: string) {

    for(let index=0; index<this.categoryFlagArr.length; index++) {
      this.categoryFlagArr[index] = false;
    }

    switch(category) {
      case "Movie":
        this.categoryFlagArr[0] = true;
        break;
      case "Series":
        this.categoryFlagArr[1] = true;
        break;
      case "Episode":
        this.categoryFlagArr[2] = true;
        break;
    }

    console.log(category);
  }

  FilterByGenre(genre: string) {

    for(let index=0; index<this.genreFlagArr.length; index++) {
      this.genreFlagArr[index] = false;
    }

    switch(genre) {
      case "Animation":
        this.genreFlagArr[0] = true;
        break;
      case "Adventure":
        this.genreFlagArr[1] = true;
        break;
      case "Comedy":
        this.genreFlagArr[2] = true;
        break;
      case "Family":
        this.genreFlagArr[3] = true;
        break;
      case "Fantasy":
        this.genreFlagArr[4] = true;
        break;
      case "Musical":
        this.genreFlagArr[5] = true;
        break;
    }
    console.log(genre);
  }

  FilterByYear(year: string) {

    for(let index=0; index<this.yearFlagArr.length; index++) {
      this.yearFlagArr[index] = false;
    }

    switch(year) {
      case "2019":
        this.yearFlagArr[0] = true;
        break;
      case "2018":
        this.yearFlagArr[1] = true;
        break;
      case "2017":
        this.yearFlagArr[2] = true;
        break;
      case "2016":
        this.yearFlagArr[3] = true;
        break;
      case "2015":
        this.yearFlagArr[4] = true;
        break;
    }
    console.log(year);
  }

  FilterByCountry(country: string) {
    if(country == "USA") {
      this.usaFlag = true;
      this.europeFlag = false;
    } else {
      this.usaFlag = false;
      this.europeFlag = true;
    }

    console.log(country);
  }

  FilterByLanguage(lang: string) {
    if(lang == "English") {
      this.enFlag = true;
      this.fnFlag = false;
    } else {
      this.enFlag = false;
      this.fnFlag = true;
    }
    console.log(lang);
  }

}
