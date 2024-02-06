import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    username: 'username',
    password: 'password',
  },

  e2e: {
    baseUrl: 'http://localhost:4200',
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      // implement node event listeners here

      return config;
    },
  },
});
