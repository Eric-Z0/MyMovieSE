import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ HttpClientTestingModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display userLoggedIn div when user not logged in', () => {
    // As ngIf is an Angular directive, debugElement is needed here
    let element = fixture.debugElement;

    const userNotLoggedInDiv = element.query(By.css('#userNotLoggedInDiv'));
    expect(userNotLoggedInDiv).toBeTruthy();

    const userLoggedInDiv = element.query(By.css('#userLoggedInDiv'));
    expect(userLoggedInDiv).toBe(null);
  });

  it('should display userLoggedIn div when user logged in', () => {
    component.userLoggedIn = true;
    fixture.detectChanges();

    let element = fixture.debugElement;

    const userNotLoggedInDiv = element.query(By.css('#userNotLoggedInDiv'));
    expect(userNotLoggedInDiv).toBe(null);

    const userLoggedInDiv = element.query(By.css('#userLoggedInDiv'));
    expect(userLoggedInDiv).toBeTruthy();
  });

  it('should record value user input when search button clicked', () => {
    let element = fixture.debugElement;
    const searchInput = element.query(By.css('#searchInput'));
    searchInput.nativeElement.value = 'Bat Man';

    const searchButton = element.query(By.css('#searchBtn'));
    searchButton.nativeElement.click();
    expect(component.prevSearchVal).toBe(searchInput.nativeElement.value);
  });

  it('should record value user input when key press entered', () => {
    let element = fixture.debugElement;
    const searchInput = element.query(By.css('#searchInput'));
    searchInput.nativeElement.value = 'Frozen';

    searchInput.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' }));
    expect(component.prevSearchVal).toBe(searchInput.nativeElement.value);
  });

});
