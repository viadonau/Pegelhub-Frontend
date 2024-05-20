import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { TestBed } from '@angular/core/testing';

@Component({
  template: ``
})
class TestComponent {
  // this is needed so the service is bootstrapped (and injectable)
  constructor(private authService: AuthService) {}
}

describe('Auth Service', () => {
  function mockExistingApiKey() {
   return cy.window().then((window) => {
      window.localStorage.setItem('api_key', 'test');
      cy.mount(TestComponent).then(() => {
        const authService = TestBed.inject(AuthService);
        authService.initialize();
      });
    });
  }

  function mockWithoutApiKey() {
    return cy.mount(TestComponent);
  }

  /**
   * Tests based on the api-key existing in the localstorage
   */
  it('should set loggedIn value to true if api-key already exists in localstorage', () => {
    mockExistingApiKey().then(() => {
      const authService = TestBed.inject(AuthService);
      const loggedIn = authService.isUserLoggedIn();

      expect(loggedIn()).to.eq(true);
    });
  });

  it('should set loggedIn value to true if already logged in and page has been reloaded', () => {
    mockExistingApiKey().then(() => {
      const authService = TestBed.inject(AuthService);
      const loggedIn = authService.isUserLoggedIn();

      expect(loggedIn()).to.eq(true);

      mockExistingApiKey().then(() => {
        expect(loggedIn()).to.eq(true);
      });
    })
  });

  /**
   * Tests based on the api-key not existing in the localstorage
   */
  it('should set api-key in localstorage to form value if login was successful', () => {
    mockWithoutApiKey().then(() => {
      const authService = TestBed.inject(AuthService);
      authService.login('test');

      cy.window().then((window) => {
        const apiKey = window.localStorage.getItem('api_key');
        expect(apiKey).to.eq('test');
      });
    });
  });

  it('should set loggedIn value to true if login was successful', () => {
    mockWithoutApiKey().then(() => {
      const authService = TestBed.inject(AuthService);
      authService.login('test');

      const loggedIn = authService.isUserLoggedIn();
      expect(loggedIn()).to.eq(true);
    });
  });
})
