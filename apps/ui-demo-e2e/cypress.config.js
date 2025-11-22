import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset.js';
import { defineConfig } from 'cypress';
import { fileURLToPath } from 'url';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(fileURLToPath(import.meta.url)),
    baseUrl: 'http://localhost:4201',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});

