// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // These settings apply everywhere unless overridden
  defaultCommandTimeout: 5000,

  viewportWidth: 1000,
  viewportHeight: 600,

  // Command timeout overridden for E2E tests
  e2e: {
    defaultCommandTimeout: 10000,
    supportFile: false,
    baseUrl: 'http://localhost:3000',
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
