import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../common/movie';

// Defines and exports the TypeScript interface for movieSnapshot object
export interface movieSnapshotInterface {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

// An interface used to unwarp json file
interface GetResponse {
  Search: Array<movieSnapshotInterface>
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private testUrl = 'http://www.omdbapi.com/?s=joker&apikey=a9b731fa'
  
  constructor(private httpClient: HttpClient) { }

  // First attempt
  GetMovieSnapshot(): Observable<movieSnapshotInterface[]> {
    return this.httpClient.get<GetResponse>(this.testUrl).pipe(
      map(response => response.Search)
    );
  }
}