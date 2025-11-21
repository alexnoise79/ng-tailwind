import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import angularPlugin from '@angular-eslint/eslint-plugin';
import angularTemplatePlugin from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';

export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/.nx/**', '**/*.stories.ts', '**/*.spec.ts', '**/jest.config.ts']
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      '@angular-eslint': angularPlugin
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        project: ['tsconfig.base.json', 'apps/*/tsconfig.*.json', 'libs/*/tsconfig.*.json'],
        tsconfigRootDir: import.meta.dirname || process.cwd()
      }
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...angularPlugin.configs.recommended.rules
    }
  },
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin
    },
    languageOptions: {
      parser: angularTemplateParser
    },
    rules: {
      ...angularTemplatePlugin.configs.recommended.rules,
      '@angular-eslint/template/attributes-order': [
        'error',
        {
          alphabetical: false,
          order: ['STRUCTURAL_DIRECTIVE', 'TEMPLATE_REFERENCE', 'TWO_WAY_BINDING', 'INPUT_BINDING', 'OUTPUT_BINDING', 'ATTRIBUTE_BINDING']
        }
      ]
    }
  }
];
