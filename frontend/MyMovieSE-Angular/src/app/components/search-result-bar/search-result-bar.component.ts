import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-result-bar',
  templateUrl: './search-result-bar.component.html',
  styleUrls: ['./search-result-bar.component.css']
})
export class SearchResultBarComponent implements OnInit {

  @Input() numOfResults: any;

  constructor() { }

  ngOnInit() {
  }

}
