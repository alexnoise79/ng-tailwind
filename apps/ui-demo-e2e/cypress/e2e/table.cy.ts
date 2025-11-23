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
      cy.contains('Basic Table').closest('section').within(() => {
        cy.get('ngt-table, table').should('exist');
      });
    });

    it('should display table headers', () => {
      cy.contains('Basic Table').closest('section').within(() => {
        cy.get('table thead').should('be.visible');
      });
    });

    it('should display table rows', () => {
      cy.contains('Basic Table').closest('section').within(() => {
        cy.get('table tbody tr').should('have.length.at.least', 1);
      });
    });

    it('should allow sorting columns', () => {
      cy.contains('Basic Table').closest('section').within(() => {
        // Click on a sortable header (the th element itself is clickable, not a button)
        cy.get('table thead th[data-sortable="true"]').first().click();
        cy.wait(300);
      });
    });
  });

  describe('With Gridlines', () => {
    beforeEach(() => {
      cy.contains('With Gridlines').scrollIntoView();
      cy.wait(200);
    });

    it('should display table with gridlines', () => {
      cy.contains('With Gridlines').closest('section').within(() => {
        cy.get('ngt-table, table').should('exist');
      });
    });
  });

  describe('Striped Rows', () => {
    beforeEach(() => {
      cy.contains('Striped Rows').scrollIntoView();
      cy.wait(200);
    });

    it('should display table with striped rows', () => {
      cy.contains('Striped Rows').closest('section').within(() => {
        cy.get('ngt-table, table').should('exist');
      });
    });

    it('should have striped row styling applied', () => {
      cy.contains('Striped Rows').closest('section').within(() => {
        cy.get('table tbody tr').should('have.length.at.least', 2);
        
        // Get background colors of first (odd) and second (even) rows
        cy.get('table tbody tr').eq(0).then(($oddRow) => {
          const oddBgColor = window.getComputedStyle($oddRow[0]).backgroundColor;
          
          cy.get('table tbody tr').eq(1).then(($evenRow) => {
            const evenBgColor = window.getComputedStyle($evenRow[0]).backgroundColor;
            
            // Even and odd rows should have different background colors
            expect(oddBgColor).to.not.equal(evenBgColor);
          });
        });
      });
    });

    it('should display table headers in striped rows table', () => {
      cy.contains('Striped Rows').closest('section').within(() => {
        cy.get('table thead').should('be.visible');
        cy.get('table thead tr').should('exist');
      });
    });

    it('should display table rows with alternating colors', () => {
      cy.contains('Striped Rows').closest('section').within(() => {
        // Verify we have multiple rows
        cy.get('table tbody tr').should('have.length.at.least', 2);
        
        // Verify even rows (2nd row, index 1) have different background than odd rows
        cy.get('table tbody tr').eq(0).invoke('css', 'backgroundColor').as('oddRowColor');
        cy.get('table tbody tr').eq(1).invoke('css', 'backgroundColor').then((evenRowColor) => {
          cy.get('@oddRowColor').then((oddRowColor) => {
            expect(evenRowColor).to.not.equal(oddRowColor);
          });
        });
      });
    });
  });

  describe('Striped Columns', () => {
    beforeEach(() => {
      cy.contains('Striped Columns').scrollIntoView();
      cy.wait(200);
    });

    it('should display table with striped columns', () => {
      cy.contains('Striped Columns').closest('section').within(() => {
        cy.get('ngt-table, table').should('exist');
      });
    });

    it('should have striped column styling applied', () => {
      cy.contains('Striped Columns').closest('section').within(() => {
        cy.get('table tbody tr').should('have.length.at.least', 1);
        // Check that even columns (2nd, 4th, etc.) have different background colors
        cy.get('table tbody tr').first().within(() => {
          cy.get('td').should('have.length.at.least', 2);
          
          // Get background colors of first (odd) and second (even) columns
          cy.get('td').eq(0).invoke('css', 'backgroundColor').as('oddColColor');
          cy.get('td').eq(1).invoke('css', 'backgroundColor').then((evenColColor) => {
            cy.get('@oddColColor').then((oddColColor) => {
              // Even and odd columns should have different background colors
              expect(evenColColor).to.not.equal(oddColColor);
            });
          });
        });
      });
    });

    it('should display table headers in striped columns table', () => {
      cy.contains('Striped Columns').closest('section').within(() => {
        cy.get('table thead').should('be.visible');
        cy.get('table thead tr').should('exist');
      });
    });

    it('should display multiple columns with alternating colors', () => {
      cy.contains('Striped Columns').closest('section').within(() => {
        // Verify we have multiple columns (check header cells)
        cy.get('table thead tr th').should('have.length.at.least', 2);
        // Verify we have cells in rows with striped styling
        cy.get('table tbody tr').first().within(() => {
          cy.get('td').should('have.length.at.least', 2);
          
          // Verify even columns (2nd column, index 1) have different background than odd columns
          cy.get('td').eq(0).invoke('css', 'backgroundColor').as('firstColColor');
          cy.get('td').eq(1).invoke('css', 'backgroundColor').then((secondColColor) => {
            cy.get('@firstColColor').then((firstColColor) => {
              // Even and odd columns should have different background colors
              expect(secondColColor).to.not.equal(firstColColor);
            });
          });
        });
      });
    });
  });
});

