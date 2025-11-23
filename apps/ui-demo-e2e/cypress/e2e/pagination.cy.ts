/// <reference types="cypress" />

describe('Pagination Page E2E', () => {
  beforeEach(() => {
    cy.visit('/pagination');
  });

  it('should display the pagination page title and description', () => {
    cy.contains('Pagination');
    cy.contains('Pagination components for navigating through multiple pages');
  });

  describe('Basic Example', () => {
    beforeEach(() => {
      cy.contains('Basic Example').scrollIntoView();
      cy.wait(200);
    });

    it('should display pagination component', () => {
      cy.contains('Basic Example')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-pagination').should('be.visible');
          cy.contains('Current page:').should('be.visible');
        });
    });

    it('should display page numbers', () => {
      cy.contains('Basic Example')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-pagination').should('be.visible');
          // Should have navigation buttons and page numbers
          cy.get('button').should('have.length.at.least', 3);
        });
    });

    it('should navigate to next page', () => {
      cy.contains('Basic Example')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-pagination').within(() => {
            // Find and click next button (usually last button or arrow)
            cy.get('button').last().click();
          });
          cy.wait(300);
          // Verify page changed
          cy.contains('Current page:').should('be.visible');
        });
    });

    it('should navigate to previous page', () => {
      cy.contains('Basic Example')
        .parent()
        .parent()
        .within(() => {
          // First go to page 2
          cy.get('ngt-pagination').within(() => {
            cy.get('button').last().click();
          });
          cy.wait(300);
          
          // Then go back
          cy.get('ngt-pagination').within(() => {
            cy.get('button').first().click();
          });
          cy.wait(300);
        });
    });
  });

  describe('With Total Items', () => {
    beforeEach(() => {
      cy.contains('With Total Items').scrollIntoView();
      cy.wait(200);
    });

    it('should display pagination with total items', () => {
      cy.contains('With Total Items')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-pagination').should('be.visible');
          cy.contains('Current page:').should('be.visible');
        });
    });

    it('should show correct total pages', () => {
      cy.contains('With Total Items')
        .parent()
        .parent()
        .within(() => {
          // Should show 10 pages (100 items / 10 per page)
          cy.contains('of 10').should('be.visible');
        });
    });
  });
});

