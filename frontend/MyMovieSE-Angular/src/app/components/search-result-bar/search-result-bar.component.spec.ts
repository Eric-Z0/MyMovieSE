import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultBarComponent } from './search-result-bar.component';

describe('SearchResultBarComponent', () => {
  let component: SearchResultBarComponent;
  let fixture: ComponentFixture<SearchResultBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultBarComponent ]
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
});
