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
        .parent()
        .parent()
        .within(() => {
          cy.contains('Success Toast').click();
          cy.wait(500);
          // Toast should appear (usually in a container or overlay)
          cy.get('[role="alert"], [role="status"]').should('be.visible');
        });
    });

    it('should show info toast when clicked', () => {
      cy.contains('Basic Usage')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Info Toast').click();
          cy.wait(500);
          cy.get('[role="alert"], [role="status"]').should('be.visible');
        });
    });

    it('should show warning toast when clicked', () => {
      cy.contains('Basic Usage')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Warning Toast').click();
          cy.wait(500);
          cy.get('[role="alert"], [role="status"]').should('be.visible');
        });
    });

    it('should show danger toast when clicked', () => {
      cy.contains('Basic Usage')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Danger Toast').click();
          cy.wait(500);
          cy.get('[role="alert"], [role="status"]').should('be.visible');
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
        .parent()
        .parent()
        .within(() => {
          cy.contains('Show Toast with Summary').click();
          cy.wait(500);
          cy.get('[role="alert"], [role="status"]').should('be.visible');
        });
    });
  });
});

