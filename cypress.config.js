const { defineConfig } = require('cypress');

const environments = {
  test: {
    baseUrl: 'https://qauto2.forstudy.space',
    user: require('./cypress.env.test.json').user
  },
  prod: {
    baseUrl: 'https://qauto.forstudy.space',
    user: require('./cypress.env.prod.json').user
  },
};

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      const envName = config.env.environment || "test";

      const selectedEnv = environments[envName];

      if (!selectedEnv) {
        throw new Error(`Environment "${envName}" not found`);
      }

      // baseUrl per environment
      //config.baseUrl = selectedEnv.baseUrl;
            config.baseUrl = environments[envName].baseUrl;
      // user credentials per environment
      config.env.user = environments[envName].user;


      return config;
    },
  },
});
