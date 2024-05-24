import { HeaderSettingsComponent } from './settings.component';

describe('Header Settings Component', () => {
  beforeEach(() => {
    cy.mount(HeaderSettingsComponent);
  });

  it('should show settings button', () => {
    cy.iconButton('pi-cog').should('be.visible');
  });

  it('should show menu on settings-button click', () => {
    cy.iconButton('pi-cog').click();
    cy.get('p-menu').should('be.visible');
  });

  it('should ', () => {

  });

  it('should ', () => {

  });

  it('should ', () => {

  });
});
