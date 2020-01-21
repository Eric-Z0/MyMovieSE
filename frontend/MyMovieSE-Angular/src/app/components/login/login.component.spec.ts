import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit form with empty user name', () => {
    let element = fixture.debugElement;

    const userPasswordInput = element.query(By.css('input[type=password]'));
    userPasswordInput.nativeElement.value = '123456';

    const loginButton = element.query(By.css('#loginBtn'));
    loginButton.nativeElement.click();

    expect(component.isLoggedIn).toBeFalsy();
    expect(component.isLoginFailed).toBeFalsy();

  });

  it('should not submit form with empty password', () => {
    let element = fixture.debugElement;

    const userNameInput = element.query(By.css('input[type=text]'));
    userNameInput.nativeElement.value = 'Alex';

    const loginButton = element.query(By.css('#loginBtn'));
    loginButton.nativeElement.click();

    expect(component.isLoggedIn).toBeFalsy();
    expect(component.isLoginFailed).toBeFalsy();
  });

  it('should not submit form with pwd length less than 6', () => {
    let element = fixture.debugElement;

    const userNameInput = element.query(By.css('input[type=text]'));
    userNameInput.nativeElement.value = 'Alex';
    const userPasswordInput = element.query(By.css('input[type=password]'));
    userPasswordInput.nativeElement.value = '123';

    const loginButton = element.query(By.css('#loginBtn'));
    loginButton.nativeElement.click();

    expect(component.isLoggedIn).toBeFalsy();
    expect(component.isLoginFailed).toBeFalsy();
  });

});
