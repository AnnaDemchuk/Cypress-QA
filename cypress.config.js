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
      config.baseUrl = selectedEnv.baseUrl;
      config.password = selectedEnv.password;
      config.email = selectedEnv.email;

      return config;
    },
  },
});
