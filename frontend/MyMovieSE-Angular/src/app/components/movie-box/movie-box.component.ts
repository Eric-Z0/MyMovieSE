import { Component, OnInit } from '@angular/core';
import { MovieService, movieSnapshotInterface } from 'src/app/services/movie.service';
import { Movie } from 'src/app/common/movie';

@Component({
  selector: 'app-movie-box',
  templateUrl: './movie-box.component.html',
  styleUrls: ['./movie-box.component.css']
})
export class MovieBoxComponent implements OnInit {

  movieSnapshots: Array<movieSnapshotInterface>;
  numOfResults: number;
  
  constructor(private movieService: MovieService) { }

  // Similar to @PostConstruct
  ngOnInit() {
    this.loadMovieSnapshots();
  }

  // For testing data binding
  increment() {
    console.log("Run Func");
    this.numOfResults += 1;
  }

  loadMovieSnapshots() {
    this.movieService.getMovieSnapshotList().subscribe(
        data => {
          this.movieSnapshots = data;
          if(data != null) {
            this.numOfResults = data.length;
          }
          else {
            this.numOfResults = 0;
          }
        }
    );
  }

  searchMovieByTitle(title: string) {
    this.movieService.getMovieSnapshot(title).subscribe(
      data => {
        this.movieSnapshots = data;
        if(data != null) {
          this.numOfResults = data.length + 2;
          console.log(this.numOfResults);
        }
        else {
          this.numOfResults = 0;
        }
      }
    );
  }
}
