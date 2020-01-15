import { Component, OnInit } from '@angular/core';
import { MovieService, movieSnapshotInterface } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-box',
  templateUrl: './movie-box.component.html',
  styleUrls: ['./movie-box.component.css']
})
export class MovieBoxComponent implements OnInit {

  // Note: need to initialize the data to
  movieSnapshots: Array<movieSnapshotInterface> = [];
  numOfResults: number = 0;
  numOfSearchFuncCalls: number = 1;

  // Set up the variables for pagination
  numOfPageBtns: number = 5;
  currentPageNumArr: number[];
  pBtnEnabled: boolean;
  nBtnEnabled: boolean;

  currentPage: number = 1;
  moviesPerPage: number = 10;
  totalNumOfPages: number;
  indexOfFirstMovie: number;
  indexOfLastMovie: number;
  currentMovieSnapshots: Array<movieSnapshotInterface>;

  noMatchingMovies: boolean = false;
  
  constructor(private movieService: MovieService) { 
    // By subscribing a observable event, the movie-box component can react
    // with the click done in the search bar even thought there is outlet between them.
    this.movieService.changeEmitted$.subscribe(titleVal => {
      // Clear the movie snapshots data loaded preiously since we only want to see NEW results
      this.movieSnapshots = [];
      // A hard coded way to load more results, this part needs to be modified in the future
      for(let index=1; index <= 5; index++) {
        this.searchMovieByTitle(titleVal, index);
      }
    });

    // Observer pattern
    this.movieService.movieFilter$.subscribe(
      filterArr => this.loadMovieCollectionAfterFilter(filterArr)
    );
    
  }

  // Similar to @PostConstruct
  ngOnInit() {
    //this.loadInitMovieCollection();
  }

  loadCurrentMovieSnapshots(currPage:number) {
    this.indexOfLastMovie = currPage * this.moviesPerPage;
    this.indexOfFirstMovie = this.indexOfLastMovie - this.moviesPerPage;
    console.log("Movie SNAPSHOTS: ", this.movieSnapshots);
    this.currentMovieSnapshots = this.movieSnapshots.slice(this.indexOfFirstMovie, this.indexOfLastMovie);
    //console.log("Load current movie array: ", this.currentMovieSnapshots);
  }

  calTotalNumOfPages() {
    this.totalNumOfPages = Math.ceil(this.movieSnapshots.length / this.moviesPerPage);
    //console.log("Total number of pages: ", this.totalNumOfPages);
  }

  calCurrentPageNumberArray(currPage:number) {
    if(this.totalNumOfPages <= this.numOfPageBtns) {
      this.currentPageNumArr = Array.from(Array(this.totalNumOfPages).keys()).map(x => ++x);
      this.pBtnEnabled = false;
      this.nBtnEnabled = false;
    } else {
      let leftIndex = currPage - 2;
      let rightIndex = currPage + 2;

      if(leftIndex <= 1) {
        this.currentPageNumArr = Array.from(Array(5).keys()).map(x => ++x);
      } else if(rightIndex <= this.totalNumOfPages) {
        this.currentPageNumArr = [currPage-2, currPage-1, currPage, currPage+1, currPage+2];
      } else if(rightIndex - 1 == this.totalNumOfPages) {
        this.currentPageNumArr = [this.totalNumOfPages-4, this.totalNumOfPages-3, this.totalNumOfPages-2, this.totalNumOfPages-1, this.totalNumOfPages]
      }

      // If the current page number is one, there is no previous available
      if(currPage == 1) {
        this.pBtnEnabled = false;
      } else {
        this.pBtnEnabled = true;
      }

      // If the current page number is the total number of pages, there is no next available
      if(currPage == this.totalNumOfPages) {
        this.nBtnEnabled = false;
      } else {
        this.nBtnEnabled = true;
      }
    }
  }

  pageLoadClick(pageNumer: number) {
    this.loadCurrentMovieSnapshots(pageNumer);
    this.calCurrentPageNumberArray(pageNumer);
  }

  // NOTE: this function may be bandoned since it is similar to the func 'loadMovieCollectionAfterFilter'
  // Load initial movie collection data from Spring rest api when front end angular starts
  loadInitMovieCollection() {
    this.movieService.getMovieCollection().subscribe(
      data => {
        this.movieSnapshots = this.movieSnapshots.concat(data.Search);
        this.loadCurrentMovieSnapshots(this.currentPage);
        this.calTotalNumOfPages();
        this.calCurrentPageNumberArray(this.currentPage);
        if(data != null) {
          this.numOfResults += data.Search.length;
        }
        else {
          this.numOfResults += 0;
        }
      }
    );
  }

  // Return a collection of movies based on the criteria selected
  loadMovieCollectionAfterFilter(filterArr: string[]) {
    this.movieService.getMovieCollectionAfterFilter(filterArr).subscribe(
      data => {
        if(data.totalResults == 0) {
          this.noMatchingMovies = true;
          this.movieSnapshots = [];
          this.calTotalNumOfPages();
          this.calCurrentPageNumberArray(this.currentPage);
        } else {
          this.noMatchingMovies = false;
          this.movieSnapshots = data.Search;
          this.loadCurrentMovieSnapshots(this.currentPage);
          this.calTotalNumOfPages();
          this.calCurrentPageNumberArray(this.currentPage);
          if(data != null) {
            this.numOfResults = data.Search.length;
          }
          else {
            this.numOfResults += 0;
          }
        }
      }
    );
  }

  searchMovieByTitle(title: string, pageNum:number) {
    this.movieService.getMovieSnapshot(title, pageNum).subscribe(
      data => {
        this.movieSnapshots = this.movieSnapshots.concat(data.Search);
        this.loadCurrentMovieSnapshots(this.currentPage);
        this.calTotalNumOfPages();
        this.calCurrentPageNumberArray(this.currentPage);
        if(data != null) {
          this.numOfResults += data.Search.length;
        }
        else {
          this.numOfResults += 0;
        }
      }
    );
  }
}
