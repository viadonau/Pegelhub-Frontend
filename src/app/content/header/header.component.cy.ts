import { HeaderComponent } from './header.component';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../service/auth.service';

describe('Header Component', () => {
  function mockLoggedIn() {
    cy.mount(HeaderComponent).then(() => {
      const authService = TestBed.inject(AuthService);
      authService.login('test');
    });
  }

  function mockLoggedOut() {
    cy.mount(HeaderComponent);
  }

  /**
   * Tests based on the user being logged out
   */
  it('should show Pegelhub Logo on the left side if logged out', () => {
    mockLoggedOut();
    cy.image('Pegelhub Logo').should('be.visible');
  });

  it('should not show Settings Button if user is not logged in', () => {
    mockLoggedOut();
    cy.get('.p-menubar-end').children().should('have.length', 0);
  });

  /**
   * Tests based on the user being logged in
   */
  it('should show Pegelhub Logo on the left side if logged in', () => {
    mockLoggedIn();
    cy.image('Pegelhub Logo').should('be.visible');
  });

  it('should show Settings Button on the right side if user is logged in', () => {
    mockLoggedIn();
    cy.get('.p-menubar-end').iconButton('pi-cog').should('be.visible');
  });
})
