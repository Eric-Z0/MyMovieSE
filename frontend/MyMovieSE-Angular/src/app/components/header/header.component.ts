import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLoggedIn: boolean = false;
  prevSearchVal: string = "empty";

  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

  search(movieTitle: string) {
    if(movieTitle != this.prevSearchVal) {
      this.prevSearchVal = movieTitle;
      this.movieService.emitChange(movieTitle);
    }
  }

  logIn() {
    this.userLoggedIn = true;
  }

  logOut() {
    window.sessionStorage.clear();
    window.location.reload();
  }

}
