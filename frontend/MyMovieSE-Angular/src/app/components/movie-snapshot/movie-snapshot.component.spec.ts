import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSnapshotComponent } from './movie-snapshot.component';

describe('MovieSnapshotComponent', () => {
  let component: MovieSnapshotComponent;
  let fixture: ComponentFixture<MovieSnapshotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieSnapshotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
