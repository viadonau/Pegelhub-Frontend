import { HeaderSettingsComponent } from './settings.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {provideRouter} from "@angular/router";
import {LoginComponent} from "../../login/login.component";

describe('Header Settings Component', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('api_key', 'test');

      // Mount Component after LocalStorage is set
      cy.mount(HeaderSettingsComponent, {
        imports: [BrowserAnimationsModule],
        providers: [provideRouter([
          { path: 'login', component: LoginComponent },
        ])]
      });
    });
  });

  it('should show settings button', () => {
    cy.iconButton('pi-cog').should('be.visible');
  });

  it('should show menu on settings-button click', () => {
    cy.iconButton('pi-cog').click();
    cy.menu('Einstellungen').should('be.visible');
  });

  it('should show option for changing the api-key', () => {
    cy.iconButton('pi-cog').click();
    cy.menuOption('API Key ändern').should('be.visible');
  });

  it('should show option for logging out', () => {
    cy.iconButton('pi-cog').click();
    cy.menuOption('Abmelden').should('be.visible');
  });

  it('should show dialog on api-key option click', () => {
    cy.iconButton('pi-cog').click();
    cy.menuOption('API Key ändern').click();
    cy.dialog('API Key ändern').should('be.visible');
  });

  it('should remove api-key from localstorage on logout-option click', () => {
    cy.iconButton('pi-cog').click();
    cy.menuOption('Abmelden').click();
    cy.window().then((win) => {
      const apiKeyVal = win.localStorage.getItem('api_key');
      expect(apiKeyVal).to.be.null;
    });
  });
});
