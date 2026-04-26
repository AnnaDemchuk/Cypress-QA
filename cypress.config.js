const { defineConfig } = require('cypress');

const environments = {
  test: {
    baseUrl: 'https://www.qauto2.forstudy.space'
   /*
    auth: {
      username: 'guest',
      password: 'welcome2qauto'
    }
      */
  },
  prod: {
    baseUrl: 'https://qauto.forstudy.space'
   /*
    auth: {
      username: 'guest',
      password: 'welcome2qauto'
    }
      */
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

     // config.env.auth = selectedEnv.auth;
      config.baseUrl = selectedEnv.baseUrl;

      return config;
    },
  },
});
