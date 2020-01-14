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
  moviesPerPage: number = 10;  // this variable will be replaced by a larger number later 
  totalNumOfPages: number;
  indexOfFirstMovie: number;
  indexOfLastMovie: number;
  currentMovieSnapshots: Array<movieSnapshotInterface>;
  
  // By subscribing a observable event, the movie-box component can react
  // with the click done in the search bar even thought there is outlet between them.
  constructor(private movieService: MovieService) { 
    this.movieService.changeEmitted$.subscribe(titleVal => {
      // A hard coded way to load more results, this part needs to be modified in the future
      for(let index=1; index <= 5; index++) {
        this.searchMovieByTitle(titleVal, index);
      }
    });
  }

  // Similar to @PostConstruct
  ngOnInit() {
    // let defMovieTitle: string = "Batman";
    // for(let index=1; index<= 3; index++){
    //   this.loadMovieSnapshots(defMovieTitle, index);
    // }
  }

  loadCurrentMovieSnapshots(currPage:number) {
    this.indexOfLastMovie = currPage * this.moviesPerPage;
    this.indexOfFirstMovie = this.indexOfLastMovie - this.moviesPerPage;
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

  /*
  // Modify the load function to load more than 10 data
  loadMovieSnapshots(title: string, pageNum: number) {
    this.movieService.getMovieSnapshot(title, pageNum).subscribe(
        data => {
          this.movieSnapshots = this.movieSnapshots.concat(data);
          //console.log("current moview arr: ", this.movieSnapshots);
          // Note: the following three function calls is only a TEMPORARY solution!
          // Need to learn more about 'Promise' and 'Observable' and update the solution later
          this.loadCurrentMovieSnapshots(this.currentPage);
          this.calTotalNumOfPages();
          this.calCurrentPageNumberArray(this.currentPage);
          if(data != null) {
            this.numOfResults += data.length;
            //console.log("current data len: ", data.length);
            //console.log("current numOfResults: ", this.numOfResults);
          }
          else {
            this.numOfResults += 0;
          }
        }
    );
  }
  */

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
