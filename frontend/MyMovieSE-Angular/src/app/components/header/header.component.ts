import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() onSearch = new EventEmitter();
  userLoggedIn: boolean = false;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

  search(movieTitle: string) {
    this.movieService.emitChange(movieTitle);
    //this.onSearch.emit(movieTitle);
  }

  logIn() {
    this.userLoggedIn = true;
  }

  logOut() {
    window.sessionStorage.clear();
    window.location.reload();
  }

}
