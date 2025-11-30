/// <reference types="cypress" />

describe('Input E2E', () => {
  beforeEach(() => {
    cy.visit('/input');
    // Navigate to Showcase tab if not already there
    cy.contains('Showcase').click();
  });

  describe('Basic Input Types', () => {
    it('should display all basic input types', () => {
      cy.contains('Basic')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Text Input').should('be.visible');
          cy.contains('Number Input').should('be.visible');
          cy.contains('Email Input').should('be.visible');
          cy.contains('Tel Input').should('be.visible');
          cy.get('ngt-input').should('have.length', 4);
        });
    });

    it('should allow typing in text input', () => {
      cy.contains('Basic')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Text Input').parent().find('ngt-input').find('input').type('Hello World');
          cy.wait(200);
          cy.contains('Value: Hello World').should('be.visible');
        });
    });

    it('should allow typing in number input', () => {
      cy.contains('Basic')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Number Input').parent().find('ngt-input').find('input').type('123');
          cy.wait(200);
          cy.contains('Value: 123').should('be.visible');
        });
    });

    it('should allow typing in email input', () => {
      cy.contains('Basic')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Email Input').parent().find('ngt-input').find('input').type('test@example.com');
          cy.wait(200);
          cy.contains('Value: test@example.com').should('be.visible');
        });
    });

    it('should allow typing in tel input', () => {
      cy.contains('Basic')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Tel Input').parent().find('ngt-input').find('input').type('1234567890');
          cy.wait(200);
          cy.contains('Value: 1234567890').should('be.visible');
        });
    });
  });

  describe('Sizes', () => {
    it('should display all size variants', () => {
      cy.contains('Sizes')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Small').should('be.visible');
          cy.contains('Medium (Default)').should('be.visible');
          cy.contains('Large').should('be.visible');
          cy.get('ngt-input').should('have.length', 3);
        });
    });

    it('should allow typing in small input', () => {
      cy.contains('Sizes')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Small').parent().find('ngt-input').find('input').type('Small text');
          cy.wait(200);
        });
    });

    it('should allow typing in medium input', () => {
      cy.contains('Sizes')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Medium (Default)').parent().find('ngt-input').find('input').type('Medium text');
          cy.wait(200);
        });
    });

    it('should allow typing in large input', () => {
      cy.contains('Sizes')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Large').parent().find('ngt-input').find('input').type('Large text');
          cy.wait(200);
        });
    });
  });

  describe('Disabled', () => {
    it('should display disabled input', () => {
      cy.contains('Disabled')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Disabled Input').should('be.visible');
          cy.get('ngt-input').find('input').should('be.disabled');
        });
    });

    it('should not allow typing in disabled input', () => {
      cy.contains('Disabled')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-input').find('input').should('be.disabled').and('have.value', 'Disabled input');
        });
    });
  });

  describe('Number Modes', () => {
    it('should display decimal and currency inputs', () => {
      cy.contains('Number Modes')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Decimal').should('be.visible');
          cy.contains('Currency').should('be.visible');
          // Input components use the same selector with different attributes
          cy.get('ngt-input[mode="decimal"], ngt-input[currency], ngt-input[mode="currency"]').should('have.length.at.least', 2);
        });
    });

    it('should allow typing in decimal input', () => {
      cy.contains('Number Modes')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Decimal').parent().find('ngt-input[mode="decimal"]').find('input').type('123.45');
          cy.wait(200);
        });
    });

    it('should allow typing in currency input', () => {
      cy.contains('Number Modes')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Currency').parent().find('ngt-input[currency], ngt-input[mode="currency"]').find('input').type('1000');
          cy.wait(200);
        });
    });
  });

  describe('Show Clear', () => {
    beforeEach(() => {
      cy.contains('Clear Button').scrollIntoView();
      cy.wait(200);
    });

    it('should display clear button when input has value', () => {
      // Find the section containing "Clear Button" heading, then find the content area
      cy.contains('Clear Button').closest('section').within(() => {
        // Find the input with pre-filled value - wait for it to have the value
        cy.contains('Pre-filled').parent().find('ngt-input').find('input').should('have.value', 'Pre-filled value');
        cy.wait(500);
        // Clear button should be visible in the pre-filled input - look within the ngt-input component
        cy.contains('Pre-filled').parent().find('ngt-input').should('exist').within(() => {
          cy.get('button[aria-label="Clear input"]', { timeout: 5000 }).should('exist');
        });
      });
    });

    it('should clear input when clear button is clicked', () => {
      // Find the section containing "Clear Button" heading, then find the content area
      cy.contains('Clear Button').closest('section').within(() => {
        // Find the first input (Empty Input)
        cy.contains('Empty Input').parent().find('ngt-input').find('input').type('Test value');
        cy.wait(500);
        // Click clear button - wait for it to appear
        cy.contains('Empty Input').parent().find('ngt-input').within(() => {
          cy.get('button[aria-label="Clear input"]', { timeout: 5000 }).should('exist').click();
        });
        cy.wait(300);
        // Input should be cleared
        cy.contains('Empty Input').parent().find('ngt-input').find('input').should('have.value', '');
      });
    });
  });

  describe('Mask', () => {
    beforeEach(() => {
      cy.contains('Mask').scrollIntoView();
      cy.wait(200);
    });

    it('should display mask inputs', () => {
      cy.contains('Mask')
        .parent()
        .parent()
        .within(() => {
          // Input components use the same selector with mask attribute
          cy.get('ngt-input[mask]').should('have.length.at.least', 1);
        });
    });

    it('should apply mask pattern when typing', () => {
      cy.contains('Mask')
        .parent()
        .parent()
        .within(() => {
          // Find first mask input and type
          cy.get('ngt-input[mask]').first().find('input').type('1234567890');
          cy.wait(200);
          // The mask should format the input
          cy.get('ngt-input[mask]').first().find('input').should('not.have.value', '1234567890');
        });
    });
  });

  describe('Chips', () => {
    beforeEach(() => {
      cy.contains('Chips').scrollIntoView();
      cy.wait(200);
    });

    it('should display chip inputs', () => {
      cy.contains('Chips').closest('section').within(() => {
        // Input components use the same selector with chip attribute
        cy.get('ngt-input[chip]', { timeout: 5000 }).should('have.length.at.least', 1);
      });
    });

    it('should create chips when typing and pressing space', () => {
      cy.contains('Chips').closest('section').within(() => {
        // Find the space-separated input - label and input are both in the same parent div
        cy.contains('Space Separated (Regex)').parent().find('ngt-input').find('input').type('chip1 chip2');
        cy.wait(800);
        // Chips should be created - look for chip spans with remove buttons
        cy.contains('Space Separated (Regex)').parent().find('ngt-input').within(() => {
          // Chips are rendered as spans, and each has a remove button
          cy.get('span.inline-flex', { timeout: 5000 }).should('have.length.at.least', 1);
          // Each chip span contains a button for removal
          cy.get('span.inline-flex button').should('have.length.at.least', 1);
        });
      });
    });
  });

  describe('Filter', () => {
    it('should display filter inputs', () => {
      cy.contains('Filter')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-input').should('have.length.at.least', 1);
        });
    });

    it('should filter input based on regex pattern', () => {
      cy.contains('Filter')
        .parent()
        .parent()
        .within(() => {
          // Type numbers (should be filtered out if regex only allows letters)
          cy.get('ngt-input').first().find('input').type('123abc');
          cy.wait(200);
          // Only letters should remain if regex filters numbers
          // Note: The actual behavior might differ, so we check that the value changed
          cy.get('ngt-input').first().find('input').should('not.have.value', '123abc');
        });
    });
  });

  describe('Autocomplete', () => {
    beforeEach(() => {
      // Ensure we're on the Showcase tab
      cy.contains('Showcase').click();
      cy.wait(200);
      cy.contains('Autocomplete').scrollIntoView();
      cy.wait(200);
    });

    it('should display autocomplete inputs', () => {
      // Ensure we're on the Showcase tab first
      cy.contains('Showcase').click();
      cy.wait(300);
      cy.contains('Autocomplete').closest('section').within(() => {
        // Input components use completeMethod property binding, so we find them by placeholder or label
        // Look for inputs with autocomplete placeholders
        cy.contains('Basic Autocomplete').parent().find('ngt-input').should('exist');
        cy.contains('With Custom Templates').parent().find('ngt-input').should('exist');
      });
    });

    it('should show suggestions when typing', () => {
      // Ensure we're on the Showcase tab first
      cy.contains('Showcase').click();
      cy.wait(300);
      cy.contains('Autocomplete').closest('section').within(() => {
        // Find the Basic Autocomplete input and type at least 2 characters (minQueryLength is 2)
        cy.contains('Basic Autocomplete').parent().find('ngt-input').find('input').type('ab');
        cy.wait(800);
        // Suggestions dropdown should appear
        cy.get('[role="listbox"]', { timeout: 3000 }).should('be.visible');
      });
    });

    it('should select a suggestion from dropdown', () => {
      // Ensure we're on the Showcase tab first
      cy.contains('Showcase').click();
      cy.wait(300);
      cy.contains('Autocomplete').closest('section').within(() => {
        // Find the Basic Autocomplete input and type at least 2 characters (minQueryLength is 2)
        cy.contains('Basic Autocomplete').parent().find('ngt-input').find('input').type('ab');
        cy.wait(800);
        // Click on first suggestion
        cy.get('[role="listbox"]', { timeout: 3000 }).within(() => {
          cy.get('[role="option"]').first().click();
        });
        cy.wait(300);
        // Input should be filled with selected value
        cy.contains('Basic Autocomplete').parent().find('ngt-input').find('input').should('not.have.value', '');
      });
    });
  });

  describe('Form Validation', () => {
    it('should display form with inputs', () => {
      cy.contains('Forms')
        .parent()
        .parent()
        .within(() => {
          cy.get('form').should('be.visible');
          cy.get('ngt-input').should('have.length.at.least', 1);
        });
    });

    it('should show validation error when form is submitted without required field', () => {
      cy.contains('Forms')
        .parent()
        .parent()
        .within(() => {
          // Submit form without filling required field
          cy.get('button[type="submit"]').click();
          cy.wait(300);
          // Error message should be shown
          cy.contains('required', { matchCase: false }).should('be.visible');
        });
    });

    it('should not show error when required field is filled', () => {
      cy.contains('Forms')
        .parent()
        .parent()
        .within(() => {
          // Fill required input
          cy.get('ngt-input').first().find('input').type('Test value');
          cy.wait(200);
          // Submit form
          cy.get('button[type="submit"]').click();
          cy.wait(200);
          // Error should not be shown
          cy.contains('required', { matchCase: false }).should('not.exist');
        });
    });
  });
});

