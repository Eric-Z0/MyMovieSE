import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() previousEnabled: boolean;
  @Input() nextEnabled: boolean;
  @Input() pageNumbers: number[];
  @Output() onPageLoad = new EventEmitter();

  selectedNum: number = 1;

  constructor() { }

  ngOnInit() {
  }

  loadPage(pageNum: number) {
    this.selectedNum = pageNum;
    this.onPageLoad.emit(pageNum);
  }

  loadPreviousPage() {
    this.selectedNum -= 1;
    this.onPageLoad.emit(this.selectedNum);
  }

  loadNextPage() {
    this.selectedNum += 1;
    this.onPageLoad.emit(this.selectedNum);
  }

}
