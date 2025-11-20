import type { StorybookConfig } from '@storybook/angular';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../libs/ui-components/src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    // Find the CSS rule and update it to process Tailwind
    const rules = config.module?.rules || [];
    
    // Find existing CSS rule and modify it, or add a new one
    const cssRuleIndex = rules.findIndex(
      (rule: any) => rule.test && rule.test.toString().includes('css')
    );

    const cssRule = {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              config: path.resolve(__dirname, '../postcss.config.js'),
            },
          },
        },
      ],
      include: [
        path.resolve(__dirname, '../apps'),
        path.resolve(__dirname, '../libs'),
      ],
    };

    if (cssRuleIndex >= 0) {
      // Replace existing CSS rule
      rules[cssRuleIndex] = cssRule;
    } else {
      // Add new CSS rule
      rules.push(cssRule);
    }

    return config;
  },
};

export default config;

