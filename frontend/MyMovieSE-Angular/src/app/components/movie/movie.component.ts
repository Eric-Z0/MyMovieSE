import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie: any = {};

  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService) { }

  ngOnInit() {
    console.log("Movie Component oninit!");
    this.route.params.subscribe((params: Params) => {
      this.movieService.getMovieByImdbId(params['movie_id']).subscribe(
        data => {
          this.movie = data;
        }
      );
      if(!this.movie) {
        this.router.navigate(['/not-found']);
      }
    });
  }

}
