/// <reference types="cypress" />

describe('Toggle Switch Page E2E', () => {
  beforeEach(() => {
    cy.visit('/toggle-switch');
  });

  it('should display the toggle switch page title and description', () => {
    cy.contains('Toggle Switch');
    cy.contains('A toggle switch component that supports ngModel');
  });

  describe('Basic Usage', () => {
    beforeEach(() => {
      cy.contains('Basic Usage').scrollIntoView();
      cy.wait(200);
    });

    it('should display toggle switches', () => {
      cy.contains('Basic Usage')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-toggle-switch').should('have.length.at.least', 1);
        });
    });

    it('should toggle switch when clicked', () => {
      cy.contains('Basic Usage')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-toggle-switch')
            .first()
            .within(() => {
              cy.get('input[type="checkbox"]').should('exist');
              // Click the toggle switch element (span with role="switch") instead of the checkbox
              cy.get('span[role="switch"]').click();
              cy.wait(200);
              cy.get('input[type="checkbox"]').should('be.checked');
            });
        });
    });

    it('should display toggle switch with label', () => {
      cy.contains('Basic Usage')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Enable notifications').should('be.visible');
        });
    });
  });

  describe('Sizes', () => {
    beforeEach(() => {
      cy.contains('Sizes').scrollIntoView();
      cy.wait(200);
    });

    it('should display all size variants', () => {
      cy.contains('Sizes')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Small toggle').should('be.visible');
          cy.contains('Medium toggle').should('be.visible');
          cy.contains('Large toggle').should('be.visible');
          cy.get('ngt-toggle-switch').should('have.length', 3);
        });
    });

    it('should allow toggling small switch', () => {
      cy.contains('Sizes')
        .parent()
        .parent()
        .within(() => {
          // Click the toggle switch element instead of the checkbox
          cy.contains('Small toggle').parent().find('span[role="switch"]').click();
          cy.wait(200);
          cy.contains('Small toggle').parent().find('input[type="checkbox"]').should('be.checked');
        });
    });
  });

  describe('With ngModel', () => {
    beforeEach(() => {
      cy.contains('With ngModel').scrollIntoView();
      cy.wait(200);
    });

    it('should display toggle switch with model binding', () => {
      cy.contains('With ngModel')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Basic toggle').should('be.visible');
          cy.contains('Current value:').should('be.visible');
        });
    });

    it('should update value when toggled', () => {
      cy.contains('With ngModel')
        .parent()
        .parent()
        .within(() => {
          // Click the toggle switch element instead of the checkbox
          cy.contains('Basic toggle').parent().find('span[role="switch"]').click();
          cy.wait(300);
          cy.contains('Current value: true').should('be.visible');
        });
    });
  });
});
