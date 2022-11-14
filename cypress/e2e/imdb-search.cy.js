describe('Search functionality test', () => {
  it('Should visit baseUrl', () => {
    cy.intercept('GET', '/registration/is-user-recognized').as('getUserRecognition')
    cy.visit('/')
    cy.url().should('eq', 'https://www.imdb.com/')
    cy.wait('@getUserRecognition').its('response.statusCode').should('eq', 200)
  })

  it('Should not crash, return 404 or internal error', () => {
    // Empty entry
    cy.get('#suggestion-search').click()
    .type('{enter}')

    cy.contains('Search IMDb')
      .should('be.visible')
    
    // Crucial to test for zero-width space 
    cy.intercept('GET', '/find*').as('getResults')
    cy.get('#suggestion-search').click()
    .type('​{enter}')
    cy.wait('@getResults').its('response.statusCode').should('eq', 200)
  })

  it('Checks autocomplition and selects value from autocomplition', () => {
    cy.searchBy('All', 'Titles')
    cy.get('#suggestion-search')
      .type('Office', { delay: 800})
      .type('{backspace}{backspace}', { delay: 100 })
      .then(() => {
        cy.contains('The Office').should('be.visible')
      })
    cy.get('#suggestion-search').clear().type('Off{backspace}', { delay: 1000})
    cy.contains('Game of Thrones').click()
    cy.get('[data-testid="hero-title-block__title"]').should('be.visible')
  })

  it('Should search by Category', () => {
    // Explanation of Custom commands can be found in cypress\support\commands.js
    cy.searchBy('All', 'Titles')
    cy.search('Bullet Train')

    cy.searchBy('Titles', 'TV Episodes')
    cy.search('The big bang Theory')

    cy.searchBy('TV Episodes', 'Celebs')
    cy.search('Scarlet')

    cy.searchBy('Celebs', 'Companies')
    cy.search('20th Century')

    cy.searchBy('Companies', 'Keywords')
    cy.search('Action')
  })

  it('Advanced Search should be available', () => {
    // Cypress xpath devDependency to help locate web-elements easily 
    cy.xpath(`//div[text()="Keywords"]`).click()
    // Checks Advanced Search page is loaded successfully
    cy.intercept('GET', '/search').as('getSearchPage')
    cy.contains('Advanced Search').click()
    cy.wait('@getSearchPage').its('response.statusCode').should('eq', 200)
    // Checks whether it is in the rigth url address
    cy.url().should('contain', '/search')
    // To replace explicit wait good practice to check visibility of elements instead      
    cy.get('#header > h1').should('be.visible')
    cy.get('#header > h3').should('be.visible')
    cy.get('.imdb-search-gateway__options').should('be.visible')

    /* Advanced Search by title intercepts the
    * /search/title/ request and checks visibility of main div
    * if it fails user further can not interact and do advanced search
    */ 
    cy.intercept('GET', '/search/title/').as('getTitleSearch')
    // Custom clickLink command
    cy.clickLink('Advanced Title Search')
    cy.url().should('contain', '/search/title/')
    cy.wait('@getTitleSearch').its('response.statusCode').should('eq', 200)
    cy.get('#main').should('be.visible')
   
    /* Returns to the 4 Ways to Search, 
    * often return back function does not work properly in web-apps.
    * For instance, user should be able to return back to previous page without any error
    * and clicking only once rather than clicking 2-3 times
    */
    cy.go('back')
    cy.get('.imdb-search-gateway__options').should('be.visible')
    
    /* Advanced Name Search intercepts the
    * /search/name/ request and checks visibility of main div
    * if it fails user further can not interact and do advanced search
    */ 
    cy.intercept('GET', '/search/name/').as('getNameSearch')
    cy.clickLink('Advanced Name Search')
    cy.url().should('contain', '/search/name/')
    cy.wait('@getNameSearch').its('response.statusCode').should('eq', 200)
    cy.get('#main').should('be.visible')

    cy.go('back')
    cy.get('.imdb-search-gateway__options').should('be.visible')

    /* Advanced Search Collaborations intercepts the
    * /search/common/request and checks visibility of main div
    * if it fails user further can not interact and do advanced search
    */ 
    cy.intercept('GET', '/search/common/').as('getCollabSearch')
    cy.clickLink('Search Collaborations')
    cy.url().should('contain', '/search/common/')
    cy.wait('@getCollabSearch').its('response.statusCode').should('eq', 200)
    cy.get('#main').should('be.visible')

    cy.go('back')
    cy.get('.imdb-search-gateway__options').should('be.visible')
  })
})