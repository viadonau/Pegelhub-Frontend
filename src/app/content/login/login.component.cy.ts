import { LoginComponent } from "./login.component";

describe('Login Component', () => {
  beforeEach(() => {
    cy.mount(LoginComponent);
  })

  it('should disable next button if no api-key has been entered', () => {
    cy.button('Weiter').should('be.disabled');
  })

  it('should perform redirect to overview page after next button has been clicked and api-key is valid', () => {
    cy.get('input').should('have.attr', 'placeholder', 'API Key').type('asdf');
    cy.button('Weiter').click();
    // TODO: check for redirect
  })

  it.only('should show an asterisk inside the api-key input field', () => {
    cy.get('#required-icon').should('be.visible');
  })

  it('should show an appropriate help text if the api-key input does not correspond to the Base64 pattern', () => {
    // TODO
  })

  it('should show an appropriate help text if the api-key input is empty', () => {
    // TODO
  })

})
