import { LoginComponent } from "./login.component";

describe('Login Component', () => {
  beforeEach(() => {
    cy.mount(LoginComponent);
  })

  it('should show an asterisk inside the api-key input field', () => {
    cy.get('#required-icon').should('be.visible');
  });

  it('should show an appropriate help-text if no api-key has been entered', () => {
    cy.get('#api-key-help').should('contain.text', 'Die Eingabe eines gültigen API Keys ist notwendig');
  });

  it('should show an appropriate help-text if the api-key input does not conform to the Base64 pattern', () => {
    cy.get('input').should('have.attr', 'placeholder', 'API Key').type('a');
    cy.get('#api-key-help').should('contain.text', 'Der eingegebene API Key entspricht nicht dem Base64-Format');
  });

  it('should not show an appropriate help-text if the api-key conforms to the Base64 format', () => {
    cy.get('input').should('have.attr', 'placeholder', 'API Key').type('asdf');
    cy.get('#api-key-help').should('not.be.visible');
  });

  it('should disable next-button if no api-key has been entered', () => {
    cy.button('Weiter').should('be.disabled');
  });

  it('should disable next-button if the api-key input does not conform to the Base64 format', () => {
    cy.get('input').should('have.attr', 'placeholder', 'API Key').type('a');
    cy.button('Weiter').should('be.disabled');
  });

  it('should show a tooltip while hovering over the next-button if no api-key has been entered', () => {
    cy.button('Weiter').trigger('mouseenter', {force: true});
    cy.tooltip('Die Eingabe eines gültigen API Keys ist notwendig').should('be.visible');
  });

  it('should show a tooltip while hovering over the next-button if the api-key does not conform to the Base64 pattern', () => {
    cy.get('input').should('have.attr', 'placeholder', 'API Key').type('a');
    cy.button('Weiter').trigger('mouseenter', {force: true});
    cy.tooltip('Der eingegebene API Key entspricht nicht dem Base64-Format').should('be.visible');
  });
})
