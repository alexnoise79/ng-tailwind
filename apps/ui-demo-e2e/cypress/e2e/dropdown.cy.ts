/// <reference types="cypress" />

describe('Dropdown Page E2E', () => {
  beforeEach(() => {
    cy.visit('/dropdown');
  });

  it('should display the dropdown page title and description', () => {
    cy.contains('Dropdown');
    cy.contains('Dropdown menus with flexible positioning and content');
  });

  describe('Basic Dropdown', () => {
    beforeEach(() => {
      cy.contains('Basic Dropdown').scrollIntoView();
      cy.wait(200);
    });

    it('should display the dropdown trigger button', () => {
      cy.contains('Basic Dropdown')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Open Dropdown').should('be.visible');
        });
    });

    it('should open dropdown when trigger is clicked', () => {
      cy.contains('Basic Dropdown')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Open Dropdown').click();
          cy.wait(300);
          cy.contains('Option 1').should('be.visible');
          cy.contains('Option 2').should('be.visible');
          cy.contains('Option 3').should('be.visible');
        });
    });

    it('should close dropdown when clicking outside', () => {
      cy.contains('Basic Dropdown')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Open Dropdown').click();
          cy.wait(300);
          cy.contains('Option 1').should('be.visible');

          // Click outside
          cy.get('body').click(0, 0);
          cy.wait(300);
          cy.contains('Option 1').should('not.be.visible');
        });
    });
  });

  describe('Right Aligned Dropdown', () => {
    beforeEach(() => {
      cy.contains('Right Aligned').scrollIntoView();
      cy.wait(200);
    });

    it('should display the dropdown trigger button', () => {
      cy.contains('Right Aligned')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Right Aligned Dropdown').should('be.visible');
        });
    });

    it('should open dropdown when trigger is clicked', () => {
      cy.contains('Right Aligned')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Right Aligned Dropdown').click();
          cy.wait(300);
          cy.contains('Option 1').should('be.visible');
        });
    });
  });
});
