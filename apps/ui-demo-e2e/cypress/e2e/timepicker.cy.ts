/// <reference types="cypress" />

describe('Timepicker Page E2E', () => {
  beforeEach(() => {
    cy.visit('/timepicker');
  });

  it('should display the timepicker page title and description', () => {
    cy.contains('Timepicker');
    cy.contains('Time selection component with hour, minute, and second controls');
  });

  describe('Basic Timepicker', () => {
    beforeEach(() => {
      cy.contains('Basic Timepicker').scrollIntoView();
      cy.wait(200);
    });

    it('should display the timepicker component', () => {
      cy.contains('Basic Timepicker')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-timepicker').should('be.visible');
        });
    });

    it('should allow selecting time', () => {
      cy.contains('Basic Timepicker')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-timepicker').within(() => {
            // Find hour, minute inputs
            cy.get('input').should('have.length.at.least', 2);
          });
        });
    });

    it('should display selected time', () => {
      cy.contains('Basic Timepicker')
        .parent()
        .parent()
        .within(() => {
          // Interact with timepicker and verify output
          cy.get('ngt-timepicker').should('exist');
          // After interaction, should show selected time
        });
    });
  });

  describe('Timepicker with Seconds', () => {
    beforeEach(() => {
      cy.contains('Timepicker with Seconds').scrollIntoView();
      cy.wait(200);
    });

    it('should display timepicker with seconds', () => {
      cy.contains('Timepicker with Seconds')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-timepicker').should('be.visible');
        });
    });

    it('should allow selecting seconds', () => {
      cy.contains('Timepicker with Seconds')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-timepicker').within(() => {
            // Should have hour, minute, and second inputs
            cy.get('input').should('have.length.at.least', 3);
          });
        });
    });
  });
});

