describe('Search bar test', () => {
  it('should visit baseUrl', () => {
    cy.intercept('GET', '/registration/is-user-recognized').as('getUserRecognition')
    cy.visit('/')
    cy.url().should('eq', 'https://www.imdb.com/')
    cy.wait('@getUserRecognition').its('response.statusCode').should('eq', 200)
  })



  it('should not crash and return 404', () => {
    cy.get('#suggestion-search').click()
    .type('{enter}')

    cy.get('.article')
      .should('be.visible')
      .and('contain.text', 'Search IMDb by typing a word or phrase in the search box at the top of this page.')
    
    cy.get('#suggestion-search').click()
    .type('% {enter}')
    
    cy.get('.findHeader').should('contain.text', 'No results found for')
  })
})