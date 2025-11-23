import { nxComponentTestingPreset } from '@nx/angular/plugins/component-testing';
import { defineConfig } from 'cypress';
import { fileURLToPath } from 'url';

export default defineConfig({
  component: nxComponentTestingPreset(fileURLToPath(import.meta.url), {
    buildTarget: 'ui-demo:build:development'
  })
});
