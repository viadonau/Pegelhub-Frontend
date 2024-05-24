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

  function checkApiKeyLocalStorageValue(value: string | null) {
    cy.window().then((win) => {
      const apiKeyVal = win.localStorage.getItem('api_key');
      expect(apiKeyVal).to.be.equal(value);
    });
  }

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

  it('should replace api-key value with new form value in localstorage', () => {
    cy.iconButton('pi-cog').click();
    cy.menuOption('API Key ändern').click();
    cy.dialog('API Key ändern').input('api-key').type('newvalue');
    cy.button('Speichern').click();
    checkApiKeyLocalStorageValue('newvalue');
  });

  it('should show toast after successful change of api-key', () => {
    cy.iconButton('pi-cog').click();
    cy.menuOption('API Key ändern').click();
    cy.dialog('API Key ändern').input('api-key').type('newvalue');
    cy.button('Speichern').click();
    cy.toast('Erfolg').should('be.visible');
  });

  it('should remove api-key from localstorage on logout-option click', () => {
    cy.iconButton('pi-cog').click();
    cy.menuOption('Abmelden').click();
    checkApiKeyLocalStorageValue(null);
  });
});
