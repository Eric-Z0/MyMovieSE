import { Component, ViewChild } from '@angular/core'; // import the component annotation
import { MovieBoxComponent } from './components/movie-box/movie-box.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MovieBoxComponent, {static: false}) movieBoxCom: MovieBoxComponent;

  movieSearchClick(titleVal: string) {
    this.movieBoxCom.searchMovieByTitle(titleVal);
  }
}
