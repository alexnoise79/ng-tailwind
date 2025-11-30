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

          // Click outside - click on the page title or another visible element
          cy.contains('Dropdown').click({ force: true });
          cy.wait(300);
          cy.contains('Option 1').should('not.exist');
        });
    });
  });

  describe('Placement Dropdown', () => {
    beforeEach(() => {
      cy.contains('Placement').scrollIntoView();
      cy.wait(200);
    });

    it('should display the dropdown trigger buttons', () => {
      cy.contains('Placement')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Bottom End').should('be.visible');
        });
    });

    it('should open dropdown when trigger is clicked', () => {
      cy.contains('Placement')
        .parent()
        .parent()
        .within(() => {
          // Test the Bottom End dropdown which is right-aligned
          cy.contains('Bottom End').click();
          cy.wait(300);
          cy.contains('Option 1').should('be.visible');
        });
    });
  });
});
