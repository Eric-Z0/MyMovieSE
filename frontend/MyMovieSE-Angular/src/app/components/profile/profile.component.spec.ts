import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { By } from '@angular/platform-browser';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user info when user logged in', () => {
    let element = fixture.debugElement;

    component.currentUser = {
      "username": "test-user",
      "accessToken": "test-token",
      "email": "test-email",
      "roles": "test-roles"
    };

    fixture.detectChanges();

    const userProfileHeader = element.query(By.css(".mb-md-4"));
    expect(userProfileHeader).toBeTruthy();

    const logInFirstHeader = element.query(By.css(".mb-md-5"));
    expect(logInFirstHeader).toBeFalsy();
  });

  it('should display login first info when user not logged in', () => {
    let element = fixture.debugElement;
    
    const userProfileHeader = element.query(By.css(".mb-md-4"));
    expect(userProfileHeader).toBeFalsy();

    const logInFirstHeader = element.query(By.css(".mb-md-5"));
    expect(logInFirstHeader).toBeTruthy();
  });

});
