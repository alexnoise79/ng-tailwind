/// <reference types="cypress" />

describe('Toast Page E2E', () => {
  beforeEach(() => {
    cy.visit('/toast');
  });

  it('should display the toast page title and description', () => {
    cy.contains('Toast');
    cy.contains('A toast component for displaying non-blocking notifications');
  });

  describe('Basic Usage', () => {
    beforeEach(() => {
      cy.contains('Basic Usage').scrollIntoView();
      cy.wait(200);
    });

    it('should display toast trigger buttons', () => {
      cy.contains('Basic Usage')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Success Toast').should('be.visible');
          cy.contains('Info Toast').should('be.visible');
          cy.contains('Warning Toast').should('be.visible');
          cy.contains('Danger Toast').should('be.visible');
        });
    });

    it('should show success toast when clicked', () => {
      cy.contains('Basic Usage')
        .closest('section')
        .within(() => {
          cy.contains('Success Toast').click();
          // Toast should appear immediately - check for toast element in the toast container
          cy.get('ngt-toast-container', { timeout: 3000 }).within(() => {
            cy.get('[role="alert"], [role="status"]', { timeout: 2000 }).should('exist');
          });
        });
    });

    it('should show info toast when clicked', () => {
      cy.contains('Basic Usage')
        .closest('section')
        .within(() => {
          cy.contains('Info Toast').click();
          cy.get('ngt-toast-container', { timeout: 3000 }).within(() => {
            cy.get('[role="alert"], [role="status"]', { timeout: 2000 }).should('exist');
          });
        });
    });

    it('should show warning toast when clicked', () => {
      cy.contains('Basic Usage')
        .closest('section')
        .within(() => {
          cy.contains('Warning Toast').click();
          cy.get('ngt-toast-container', { timeout: 3000 }).within(() => {
            cy.get('[role="alert"], [role="status"]', { timeout: 2000 }).should('exist');
          });
        });
    });

    it('should show danger toast when clicked', () => {
      cy.contains('Basic Usage')
        .closest('section')
        .within(() => {
          cy.contains('Danger Toast').click();
          cy.get('ngt-toast-container', { timeout: 3000 }).within(() => {
            cy.get('[role="alert"], [role="status"]', { timeout: 2000 }).should('exist');
          });
        });
    });
  });

  describe('With Summary and Detail', () => {
    beforeEach(() => {
      cy.contains('With Summary and Detail').scrollIntoView();
      cy.wait(200);
    });

    it('should display the toast button', () => {
      cy.contains('With Summary and Detail')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Show Toast with Summary').should('be.visible');
        });
    });

    it('should show toast with summary and detail', () => {
      cy.contains('With Summary and Detail')
        .closest('section')
        .within(() => {
          cy.contains('Show Toast with Summary').click();
          cy.get('ngt-toast-container', { timeout: 3000 }).within(() => {
            cy.get('[role="alert"], [role="status"]', { timeout: 2000 }).should('exist');
          });
        });
    });
  });
});
