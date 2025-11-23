/// <reference types="cypress" />

describe('Table Page E2E', () => {
  beforeEach(() => {
    cy.visit('/table');
  });

  it('should display the table page title and description', () => {
    cy.contains('Table');
    cy.contains('A comprehensive table component with sorting, pagination');
  });

  describe('Basic Table', () => {
    beforeEach(() => {
      cy.contains('Basic Table').scrollIntoView();
      cy.wait(200);
    });

    it('should display the table component', () => {
      cy.contains('Basic Table')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-table').should('be.visible');
        });
    });

    it('should display table headers', () => {
      cy.contains('Basic Table')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-table').within(() => {
            cy.get('thead').should('be.visible');
          });
        });
    });

    it('should display table rows', () => {
      cy.contains('Basic Table')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-table').within(() => {
            cy.get('tbody tr').should('have.length.at.least', 1);
          });
        });
    });

    it('should allow sorting columns', () => {
      cy.contains('Basic Table')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-table').within(() => {
            // Click on a sortable header
            cy.get('th button').first().click();
            cy.wait(300);
          });
        });
    });
  });

  describe('With Gridlines', () => {
    beforeEach(() => {
      cy.contains('With Gridlines').scrollIntoView();
      cy.wait(200);
    });

    it('should display table with gridlines', () => {
      cy.contains('With Gridlines')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-table').should('be.visible');
        });
    });
  });
});

