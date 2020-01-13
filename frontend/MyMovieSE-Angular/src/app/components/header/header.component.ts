import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() onSearch = new EventEmitter();
  userLoggedIn: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  search(movieTitle: string) {
    this.onSearch.emit(movieTitle);
  }

  logIn() {
    this.userLoggedIn = true;
  }

  logOut() {
    window.sessionStorage.clear();
    window.location.reload();
  }

}
