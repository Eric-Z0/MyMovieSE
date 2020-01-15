import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-snapshot',
  templateUrl: './movie-snapshot.component.html',
  styleUrls: ['./movie-snapshot.component.css']
})
export class MovieSnapshotComponent implements OnInit {

  // Declare a movieSnapshot property, this indicates it is to be provided to the component
  // by a parent component passing it to the movieSnapshot.
  @Input() movieSnapshot: any;

  constructor() { }

  ngOnInit() {
  }

}
