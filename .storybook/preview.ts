import type { Preview } from '@storybook/angular';
import '../apps/ui-demo/src/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      toc: true
    }
  }
};

export default preview;
