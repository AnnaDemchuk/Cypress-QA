// ***********************************************
// This example commands.js shows you how to
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

import ModalLogin from "../pages/Gauto/modalLogin";


//sausedemo.com login command
Cypress.Commands.add('loginSauseDemo', (username, password) => {

  cy.get('#user-name').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
});

//qauto login command
Cypress.Commands.add('loginGauto', (email, password) => {
  const modalLogin = new ModalLogin();
  modalLogin.sendLoginForm(email, password);
  cy.url().should('include', 'https://qauto.forstudy.space/panel/garage');

});

// Command to fill registration form in Gauto
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // turn off original log
    options.log = false
    // create our own log with masked message
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    })
  }

  return originalFn(element, text, options)
})
