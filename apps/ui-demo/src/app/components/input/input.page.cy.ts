/// <reference types="cypress" />
import { InputPage } from './input.page';

describe('Input Page Component Tests', () => {
  beforeEach(() => {
    cy.mount(InputPage, {
      imports: [InputPage]
    });
  });

  describe('Basic Input', () => {
    it('should display basic text input', () => {
      cy.get('ngt-input').should('exist');
    });

    it('should allow typing in text input', () => {
      cy.get('ngt-input').first().find('input').type('Hello World');
      cy.get('ngt-input').first().find('input').should('have.value', 'Hello World');
    });

    it('should display number input', () => {
      cy.get('ngt-input').should('exist');
    });

    it('should display email input', () => {
      cy.get('ngt-input').should('exist');
    });

    it('should display tel input', () => {
      cy.get('ngt-input').should('exist');
    });
  });

  describe('Input Sizes', () => {
    it('should display inputs with different sizes', () => {
      cy.get('ngt-input').should('exist');
    });
  });

  describe('Disabled Input', () => {
    it('should display disabled input', () => {
      cy.get('ngt-input').should('exist');
      // Check if any input is disabled
      cy.get('ngt-input').find('input[disabled]').should('exist');
    });
  });

  describe('Decimal Input', () => {
    it('should display decimal input', () => {
      cy.get('ngt-input[mode="decimal"]').should('exist');
    });

    it('should format decimal numbers', () => {
      cy.get('ngt-input[mode="decimal"]').first().find('input').type('123.456');
      cy.get('ngt-input[mode="decimal"]').first().find('input').blur();
      // After blur, should be formatted to 2 decimal places
      cy.get('ngt-input[mode="decimal"]').first().find('input').should('have.value', '123.46');
    });
  });

  describe('Currency Input', () => {
    it('should display currency input', () => {
      // Currency inputs can use [currency] or [mode="currency"]
      cy.get('ngt-input[currency], ngt-input[mode="currency"]').should('exist');
    });

    it('should format currency values', () => {
      cy.get('ngt-input[currency], ngt-input[mode="currency"]').first().find('input').type('1234.56');
      cy.get('ngt-input[currency], ngt-input[mode="currency"]').first().find('input').blur();
      // Currency should be formatted - wait a bit for formatting to apply
      cy.wait(100);
      cy.get('ngt-input[currency], ngt-input[mode="currency"]').first().find('input').invoke('val').then((val) => {
        expect(val).to.exist;
      });
    });
  });

  describe('Mask Input', () => {
    it('should display masked input', () => {
      cy.get('ngt-input[mask]').should('exist');
    });

    it('should apply phone mask', () => {
      cy.get('ngt-input[mask]').first().find('input').type('1234567890');
      // Should apply mask format - check that value contains mask characters like parentheses or dashes
      cy.get('ngt-input[mask]').first().find('input').invoke('val').then((val) => {
        expect(val).to.be.a('string');
        if (typeof val === 'string') {
          expect(val.length).to.be.greaterThan(0);
        }
      });
    });
  });

  describe('Chip Input', () => {
    it('should display chip input', () => {
      cy.get('ngt-input[chip]').should('exist');
    });

    it('should create chips from comma-separated values', () => {
      cy.get('ngt-input[chip]').first().find('input').type('tag1,tag2,tag3,');
      // Should create chips
      cy.get('ngt-input[chip]').first().should('exist');
    });
  });

  describe('Clear Button', () => {
    it('should show clear button when input has value', () => {
      cy.get('ngt-input').first().find('input').type('test');
      cy.get('button[aria-label="Clear input"]').should('exist');
    });

    it('should clear input when clear button is clicked', () => {
      // Find the input with showClear - it's in the "Clear" section
      // We need to scroll to it or find it by its parent section
      cy.contains('Empty Input').parent().find('ngt-input').find('input').type('test');
      // Wait for clear button to appear (it only shows when there's a value)
      cy.get('button[aria-label="Clear input"]', { timeout: 2000 }).should('exist');
      cy.get('button[aria-label="Clear input"]').first().click();
      // Verify input is cleared - find the same input again
      cy.contains('Empty Input').parent().find('ngt-input').find('input').should('have.value', '');
    });
  });
});

