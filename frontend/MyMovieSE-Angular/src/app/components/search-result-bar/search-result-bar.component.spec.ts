import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultBarComponent } from './search-result-bar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('SearchResultBarComponent', () => {
  let component: SearchResultBarComponent;
  let fixture: ComponentFixture<SearchResultBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultBarComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update value when number of results value changed', () => {
    let element = fixture.debugElement;

    const numOfResultDiv = element.query(By.css('.py-md-3'));
    let numOfResultBefore = numOfResultDiv.nativeElement.innerHTML;
    expect(numOfResultBefore).toBe("  results found ");

    component.numOfResults = 5;
    fixture.detectChanges();
    let numOfResultAfter = numOfResultDiv.nativeElement.innerHTML;
    expect(numOfResultAfter).toBe(" 5 results found ");
  });

});
