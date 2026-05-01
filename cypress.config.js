const { defineConfig } = require('cypress');
require('dotenv').config();

const environments = {
  test: {
    baseUrl: process.env.TEST_BASE_URL,
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD,

  },
  prod: {
    baseUrl: process.env.PROD_BASE_URL,
    email: process.env.PROD_EMAIL,
    password: process.env.PROD_PASSWORD,
  },
};

module.exports = defineConfig({

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    overwrite: true,
    html: true,
    json: true
  },

  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      const envName = config.env.environment || "test";

      const selectedEnv = environments[envName];

      if (!selectedEnv) {
        throw new Error(`Environment "${envName}" not found`);
      }

      config.baseUrl = selectedEnv.baseUrl;
      config.password = selectedEnv.password;
      config.email = selectedEnv.email;

      return config;
    },
  },
});
