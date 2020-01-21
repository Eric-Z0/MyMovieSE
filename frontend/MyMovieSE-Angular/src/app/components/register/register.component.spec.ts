import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ FormsModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit form with empty user name', () => {
    let element = fixture.debugElement;

    const userEmailInput = element.query(By.css('input[type=email]'));
    userEmailInput.nativeElement.value = 'Alex@gmail.com';

    const userPasswordInput = element.query(By.css('input[type=password]'));
    userPasswordInput.nativeElement.value = '123456';

    const signupButton = element.query(By.css('#signupBtn'));
    signupButton.nativeElement.click();

    expect(component.isSuccessful).toBeFalsy();
  });

  it('should not submit form with user name too short', () => {
    let element = fixture.debugElement;

    const userNameInput = element.query(By.css('input[type=text]'));
    userNameInput.nativeElement.value = 'A';

    const userEmailInput = element.query(By.css('input[type=email]'));
    userEmailInput.nativeElement.value = 'Alex@gmail.com';

    const userPasswordInput = element.query(By.css('input[type=password]'));
    userPasswordInput.nativeElement.value = '123456';

    const signupButton = element.query(By.css('#signupBtn'));
    signupButton.nativeElement.click();

    expect(component.isSuccessful).toBeFalsy();
  });

  it('should not submit form with user name too long', () => {
    let element = fixture.debugElement;

    const userNameInput = element.query(By.css('input[type=text]'));
    userNameInput.nativeElement.value = 'ABCDEFGHIGKLMNOPQRSTUVWXYZ';

    const userEmailInput = element.query(By.css('input[type=email]'));
    userEmailInput.nativeElement.value = 'Alex@gmail.com';

    const userPasswordInput = element.query(By.css('input[type=password]'));
    userPasswordInput.nativeElement.value = '123456';

    const signupButton = element.query(By.css('#signupBtn'));
    signupButton.nativeElement.click();

    expect(component.isSuccessful).toBeFalsy();
  });

  it('should not submit form with empty email', () => {
    let element = fixture.debugElement;

    const userNameInput = element.query(By.css('input[type=text]'));
    userNameInput.nativeElement.value = 'Alex';

    const userPasswordInput = element.query(By.css('input[type=password]'));
    userPasswordInput.nativeElement.value = '123456';

    const signupButton = element.query(By.css('#signupBtn'));
    signupButton.nativeElement.click();

    expect(component.isSuccessful).toBeFalsy();
  });

  it('should not submit form with invalid email', () => {
    let element = fixture.debugElement;

    const userNameInput = element.query(By.css('input[type=text]'));
    userNameInput.nativeElement.value = 'Alex';

    const userEmailInput = element.query(By.css('input[type=email]'));
    userEmailInput.nativeElement.value = 'ABC';

    const userPasswordInput = element.query(By.css('input[type=password]'));
    userPasswordInput.nativeElement.value = '123456';

    const signupButton = element.query(By.css('#signupBtn'));
    signupButton.nativeElement.click();

    expect(component.isSuccessful).toBeFalsy();
  });

  it('should not submit form with empty password', () => {
    let element = fixture.debugElement;

    const userNameInput = element.query(By.css('input[type=text]'));
    userNameInput.nativeElement.value = 'Alex';
    
    const userEmailInput = element.query(By.css('input[type=email]'));
    userEmailInput.nativeElement.value = 'Alex@gmail.com';

    const signupButton = element.query(By.css('#signupBtn'));
    signupButton.nativeElement.click();

    expect(component.isSuccessful).toBeFalsy();
  });

  it('should not submit form with pwd length less than 6', () => {
    let element = fixture.debugElement;

    const userNameInput = element.query(By.css('input[type=text]'));
    userNameInput.nativeElement.value = 'Alex';

    const userEmailInput = element.query(By.css('input[type=email]'));
    userEmailInput.nativeElement.value = 'Alex@gmail.com';

    const userPasswordInput = element.query(By.css('input[type=password]'));
    userPasswordInput.nativeElement.value = '123';

    const signupButton = element.query(By.css('#signupBtn'));
    signupButton.nativeElement.click();

    expect(component.isSuccessful).toBeFalsy();
  });

});
