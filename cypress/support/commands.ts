/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

declare namespace Cypress {
     interface Chainable {
       button(label: string): Chainable<Element>;
       tooltip(label: string): Chainable<Element>;
       image(label: string): Chainable<Element>;
       iconButton(icon: string): Chainable<Element>;
       menu(label: string): Chainable<Element>;
       menuOption(label: string): Chainable<Element>;
       dialog(header: string): Chainable<Element>;
     }
}

Cypress.Commands.add('button', (label) => {
  cy.get('button').contains(label);
})

Cypress.Commands.add('tooltip', (label) => {
  cy.get('[role="tooltip"]').contains(label);
})

Cypress.Commands.add('image', (label) => {
  cy.get(`img[alt="${label}"]`);
})

Cypress.Commands.add('iconButton', (icon) => {
  cy.get(`p-button[icon="pi ${icon}"]`);
})

Cypress.Commands.add('menu', (label) => {
  cy.get('p-menu').find('li').contains(label);
})

Cypress.Commands.add('menuOption', (label) => {
  cy.get('p-menu').find('li').contains(label);
})

Cypress.Commands.add('dialog', (header) => {
  cy.get(`p-dialog[header="${header}"]`);
})
