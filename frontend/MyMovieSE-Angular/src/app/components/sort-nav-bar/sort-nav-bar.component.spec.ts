import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortNavBarComponent } from './sort-nav-bar.component';

describe('SortNavBarComponent', () => {
  let component: SortNavBarComponent;
  let fixture: ComponentFixture<SortNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
