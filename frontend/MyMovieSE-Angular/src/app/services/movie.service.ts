import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

// Defines and exports the TypeScript interface for movieSnapshot object
export interface movieSnapshotInterface {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface movieInterface {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: string[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}


// An interface used to unwarp json file
interface GetMovieSearchResponse {
  Search: Array<movieSnapshotInterface>;
  totalResults: number;
  Response: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  //private testUrl = 'http://www.omdbapi.com/?s=Batman&page=2&apikey=a9b731fa'
  
  constructor(private httpClient: HttpClient) { }

  // Get movie collection from Spring backend database
  getMovieCollection() {
    let url: string = 'http://3.19.27.205/api/test/upload';
    return this.httpClient.get<GetMovieSearchResponse>(url);
  }

  getMovieCollectionAfterFilter(filter: string[]) {
    let filterUrl: string = `http://3.19.27.205/api/test/filter/c=${filter[0]}/g=${filter[1]}/y=${filter[2]}/r=${filter[3]}/l=${filter[4]}/`;
    console.log(filterUrl);
    return this.httpClient.get<GetMovieSearchResponse>(filterUrl);
  }

  // Get movie snapshot(s) based on movie title
  getMovieSnapshot(movieTile: string, pageNum:number=1): Observable<GetMovieSearchResponse> {
    let searchMovieByTitleUrl: string = `http://www.omdbapi.com/?s=${movieTile}&page=${pageNum}&apikey=a9b731fa`;
    return this.httpClient.get<GetMovieSearchResponse>(searchMovieByTitleUrl);
  }

  // Get movie detailed info based on its imdb id
  getMovieByImdbId(imdbID: number): Observable<movieInterface> {
    let searchMovieByIdUrl: string = `http://www.omdbapi.com/?i=${imdbID}&apikey=a9b731fa`;
    return this.httpClient.get<movieInterface>(searchMovieByIdUrl);
  }


  //-----------------------------------------------------------------------------

  // A feasible solution to let the event pass over outlet (when user click the search button
  // in the header component, the event will pass into the outlet and the MovieBox component will
  // react and display the movie)
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();
  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

  //-----------------------------------------------------------------------------

  private movieFilterSource = new BehaviorSubject<string[]>(['', '', '', '','']);
  movieFilter$ = this.movieFilterSource.asObservable();

  // Event movie selection criteria clicked
  movieCriteriaClicked(filterArr: string[]) {
    this.movieFilterSource.next(filterArr);
  }

  //----------------------------------------------------------------------------



}