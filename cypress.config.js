const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www.imdb.com/',
    viewportWidth: 1536,
    viewportHeight: 960
  }
})