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

## Answers to questions
1. **What did you choose to test, and why?**
   - Decided to test general functionality of the search bar by checking for empty entry and zero-width space. As complex test cases can not be tested further if basic check emty resturns <font color="red">404 or internal error</font>
2. **How are your files structured, and why?**
     - Haven't changed files structure. However, included /downloads, /screenshots, /videos and /node_modules in `.gitignore` file as these folders are auto-generated.
3. **How else might you have done things? How might you expand on these tests in future?**
     - Тo fully check the advanced search functionality [list of naughty strings](https://github.com/minimaxir/big-list-of-naughty-strings) could be utilised to create complex test cases in future. In addition, boundary testing can also be useful for advanced searching. Usually, advanced searching features are prone to vulnerabilities and injections because of many inputs. Therefore, these type of test are crucial in testing.
     - In addition, I would inlude Allure to visualize the results and use the generated reports in meetings to analyse.
     - Cucumber can also be used to write behavior-driven development tests so anybody could understand what features are being tested. BDD tests can even be shown to potential customers/users to emphasize importance of quality in a particular project.
4. **How did you overcome any technical challenges you encountered?**
     - I did not have any technical issues as I'm comfortable with Cypress and have a solid working experience. Yet, I did have one particular problem when I was junior QA. If your internet connection is slow and using old PC Cypress might take some time to verify when its first launch. After doing litle bit of research on the Internet solved the problem by encreasing the time `VERIFY_TEST_RUNNER_TIMEOUT_MS` in `node_modules\cypress\lib\tasks\verify.js`. However, one has to be carefull when modifying the framework`s code :) 