# IMDB-search bar
## Instructions on how to run the tests
This repository contains [Cypress](https://www.cypress.io/) test scripts for the main search bar on the [IMDB](https://www.imdb.com/) homepage.

To run the tests make sure that you have installed [node.js](https://nodejs.org/en/) on your PC. 

You can check by running `node --version` in your terminal.

Create a folder, cd to the directory in your terminal and run the following commands:
```
1. git clone https://github.com/ebk94/imdb-search.git
2. cd imdb-search/
3. npm install
4. npx cypress run -b chrome --spec "cypress/e2e/imdb-search.cy.js"
```
This will run the test in headless mode. 

You can run it in GUI by typing `npm run cy:open` in the terminal and this will open Cypress desktop. After that:

1. Click on **E2E Testing**
2. Start the **E2E Testing** in your desired browser
3. Click on `imdb-search.cy.js` spec file

## Running in [Docker](https://docs.docker.com/desktop/)
In project's directory
1. `docker-compose build`
2. `docker-compose up`
3. After finish `docker-compose down` 