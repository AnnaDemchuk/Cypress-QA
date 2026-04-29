const { defineConfig } = require('cypress');

const environments = {
  test: {
    baseUrl: 'https://qauto2.forstudy.space',
    password: 'Qw123456',
    email: 'Dan123@test.com'
  },
  prod: {
    baseUrl: 'https://qauto.forstudy.space',
    password: 'Qt123456',
    email: 'Lucia_Douglas79@yahoo.com'
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
