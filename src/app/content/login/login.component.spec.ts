import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test onContinue', () => {
    const token = 'asdf';
    component['loginForm'].patchValue(
      {
        apiKey: token
      }
    );

    component.onContinue();

    // @ts-ignore
    expect(component.authService.loggedIn).toBe(true);
    // @ts-ignore
    expect(component.authService.authData.getValue()?.apiKey).toBe(token);
  })
});
