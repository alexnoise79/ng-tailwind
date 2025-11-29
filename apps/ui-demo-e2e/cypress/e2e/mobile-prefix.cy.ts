/// <reference types="cypress" />

describe('Mobile Prefix E2E', () => {
  beforeEach(() => {
    cy.visit('/mobile-prefix');
  });

  describe('Basic Mobile Prefix', () => {
    it('should display the mobile prefix component', () => {
      cy.contains('Basic')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-mobile-prefix').should('be.visible');
          cy.get('select[id="mobile-prefix"]').should('be.visible');
          cy.get('input[id="mobile-phone"]').should('be.visible');
        });
    });

    it('should display country prefix dropdown', () => {
      cy.contains('Basic')
        .parent()
        .parent()
        .within(() => {
          cy.get('select[id="mobile-prefix"]').should('be.visible');
          cy.get('select[id="mobile-prefix"] option').should('have.length.greaterThan', 0);
        });
    });

    it('should allow selecting a country prefix', () => {
      cy.contains('Basic')
        .parent()
        .parent()
        .within(() => {
          cy.get('select[id="mobile-prefix"]').select('United Kingdom (44)');
          cy.wait(200);
          cy.get('select[id="mobile-prefix"]').should('contain', 'United Kingdom');
        });
    });

    it('should allow entering a phone number', () => {
      cy.contains('Basic')
        .parent()
        .parent()
        .within(() => {
          cy.get('input[id="mobile-phone"]').type('1234567890');
          cy.get('input[id="mobile-phone"]').should('have.value', '1234567890');
        });
    });

    it('should display the combined value', () => {
      cy.contains('Basic')
        .parent()
        .parent()
        .within(() => {
          cy.get('select[id="mobile-prefix"]').select('United States (1)');
          cy.get('input[id="mobile-phone"]').type('1234567890');
          cy.wait(200);
          cy.contains('Value: +11234567890').should('be.visible');
        });
    });
  });

  describe('Mobile Prefix with Placeholder', () => {
    it('should display placeholder text', () => {
      cy.contains('Placeholder')
        .parent()
        .parent()
        .within(() => {
          cy.get('input[id="mobile-phone"]').should('have.attr', 'placeholder', 'Enter phone number');
        });
    });
  });

  describe('Disabled Mobile Prefix', () => {
    it('should be disabled', () => {
      cy.contains('Disabled')
        .parent()
        .parent()
        .within(() => {
          cy.get('select[id="mobile-prefix"]').should('be.disabled');
          cy.get('input[id="mobile-phone"]').should('be.disabled');
        });
    });

    it('should not allow interaction when disabled', () => {
      cy.contains('Disabled')
        .parent()
        .parent()
        .within(() => {
          cy.get('input[id="mobile-phone"]').should('be.disabled');
          cy.get('select[id="mobile-prefix"]').should('be.disabled');
        });
    });
  });

  describe('Readonly Mobile Prefix', () => {
    it('should be readonly', () => {
      cy.contains('Readonly')
        .parent()
        .parent()
        .within(() => {
          cy.get('input[id="mobile-phone"]').should('have.attr', 'readonly');
        });
    });

    it('should display initial value', () => {
      cy.contains('Readonly')
        .parent()
        .parent()
        .within(() => {
          cy.get('input[id="mobile-phone"]').should('have.value', '3451234567');
        });
    });
  });

  describe('Mobile Prefix in Form', () => {
    it('should display form with mobile prefix', () => {
      cy.contains('Forms')
        .parent()
        .parent()
        .within(() => {
          cy.get('form').should('be.visible');
          cy.get('ngt-mobile-prefix').should('be.visible');
          cy.get('button[type="submit"]').should('be.visible');
        });
    });

    it('should show validation error when form is submitted without value', () => {
      cy.contains('Forms')
        .parent()
        .parent()
        .within(() => {
          cy.get('button[type="submit"]').click();
          cy.wait(200);
          cy.contains('Phone number is required').should('be.visible');
        });
    });

    it('should not show validation error when value is provided', () => {
      cy.contains('Forms')
        .parent()
        .parent()
        .within(() => {
          cy.get('select[id="mobile-prefix"]').select('United States (1)');
          cy.get('input[id="mobile-phone"]').type('1234567890');
          cy.get('button[type="submit"]').click();
          cy.wait(200);
          cy.contains('Phone number is required').should('not.exist');
        });
    });
  });

  describe('Input validation', () => {
    it('should enforce max length based on prefix', () => {
      cy.contains('Basic')
        .parent()
        .parent()
        .within(() => {
          cy.get('select[id="mobile-prefix"]').select('United States (1)');
          // Max length should be 17 - 1 (prefix length) = 16
          const longNumber = '12345678901234567890';
          cy.get('input[id="mobile-phone"]').type(longNumber);
          cy.get('input[id="mobile-phone"]').invoke('val').should('have.length.at.most', 16);
        });
    });
  });

  describe('Country selection', () => {
    it('should update displayed country code when prefix changes', () => {
      cy.contains('Basic')
        .parent()
        .parent()
        .within(() => {
          cy.get('select[id="mobile-prefix"]').select('United Kingdom (44)');
          cy.wait(200);
          cy.contains('(+44)').should('be.visible');
          
          cy.get('select[id="mobile-prefix"]').select('France (33)');
          cy.wait(200);
          cy.contains('(+33)').should('be.visible');
        });
    });
  });
});

