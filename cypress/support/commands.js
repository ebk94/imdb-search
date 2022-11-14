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

/*
* Custom command to search by category
* accepts two arguments currentCategory and nextCategory
* In test automation DRY concept is relevant and adviced to use
*/

Cypress.Commands.add('searchBy', (currentCategory, nextCategory) => {
    cy.xpath(`//div[text()="${currentCategory}"]`).click()
    cy.get('[data-menu-id="navbar-search-category-select"]').should('be.visible')
    cy.xpath(`//li/span[text()="${nextCategory}"]`).should('be.visible').click()
})

/*
* Custom search command
* accepts search term and waits for api response and checks the statusCode
* It is a good practice to to use implicit wait as explicit to simulate real world scenarios
*/
Cypress.Commands.add('search', (searchTerm) => {
    cy.intercept('GET', '/find*').as('getResults')
    
    cy.get('#suggestion-search').click() .type(`${searchTerm}{enter}`)
    
    cy.wait('@getResults').its('response.statusCode').should('eq', 200)
})

/*
* Custom command to click links
* which can be reused
*/
Cypress.Commands.add('clickLink', (label) => {
    cy.get('a').contains(label).click()
})