import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sort-nav-bar',
  templateUrl: './sort-nav-bar.component.html',
  styleUrls: ['./sort-nav-bar.component.css']
})
export class SortNavBarComponent implements OnInit {

  @Output() onSearch = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  search(movieTitle: string) {
    this.onSearch.emit(movieTitle);
  }

}
