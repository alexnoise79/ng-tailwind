/// <reference types="cypress" />

describe('Datepicker E2E', () => {
  beforeEach(() => {
    cy.visit('/datepicker');
  });

  describe('Basic Datepicker', () => {
    it('should display the datepicker calendar', () => {
      cy.contains('Basic Datepicker').parent().parent().within(() => {
        cy.get('ngt-datepicker').should('be.visible');
        cy.get('button[aria-label="Previous month"]').should('be.visible');
        cy.get('button[aria-label="Next month"]').should('be.visible');
        cy.contains('Mon').should('be.visible');
        cy.contains('Sun').should('be.visible');
      });
    });

    it('should display current month and year', () => {
      const today = new Date();
      const currentMonth = today.toLocaleString('default', { month: 'long' });
      const currentYear = today.getFullYear();
      
      cy.contains('Basic Datepicker').parent().parent().within(() => {
        cy.get('select[aria-label="Select month"]').should('contain', currentMonth);
        cy.get('select[aria-label="Select year"]').should('contain', currentYear.toString());
      });
    });

    it('should select a date when clicking on a day', () => {
      cy.contains('Basic Datepicker').parent().parent().within(() => {
        cy.get('button[role="gridcell"]:not([disabled])').first().click();
      });
      
      cy.wait(200);
      cy.contains('Selected date:').should('be.visible');
    });

    it('should have navigation buttons visible', () => {
      cy.contains('Basic Datepicker').parent().parent().within(() => {
        cy.get('button[aria-label="Previous month"]').should('be.visible');
        cy.get('button[aria-label="Next month"]').should('be.visible');
      });
    });

    it('should change month via dropdown', () => {
      cy.contains('Basic Datepicker').parent().parent().within(() => {
        cy.get('select[aria-label="Select month"]').select('March');
        cy.wait(200);
        cy.get('select[aria-label="Select month"]').should('have.value', '3');
      });
    });

    it('should change year via dropdown', () => {
      cy.contains('Basic Datepicker').parent().parent().within(() => {
        cy.get('select[aria-label="Select year"]').invoke('val').then((currentYearVal) => {
          const currentYear = parseInt(currentYearVal as string);
          const nextYear = currentYear + 1;
          
          cy.get('select[aria-label="Select year"]').select(nextYear.toString());
          cy.wait(200);
          cy.get('select[aria-label="Select year"]').should('have.value', nextYear.toString());
        });
      });
    });
  });

  describe('Datepicker with Time', () => {
    it('should show time picker when showTime is enabled', () => {
      cy.contains('Datepicker with Time').scrollIntoView();
      cy.wait(200);
      
      cy.contains('Datepicker with Time').parent().parent().within(() => {
        cy.get('ngt-datepicker').within(() => {
          cy.get('ngt-timepicker').should('exist');
        });
      });
    });

    it('should allow selecting date with time', () => {
      cy.contains('Datepicker with Time').scrollIntoView();
      cy.wait(200);
      
      cy.contains('Datepicker with Time').parent().parent().within(() => {
        cy.get('ngt-datepicker').within(() => {
          cy.get('button[role="gridcell"]:not([disabled])').first().click();
        });
      });
      
      cy.wait(200);
      cy.contains('Selected date with time:').should('be.visible');
    });
  });

  describe('Datepicker with Custom Format', () => {
    it('should allow changing format and selecting date', () => {
      cy.contains('Datepicker with Custom Format').scrollIntoView();
      cy.wait(200);
      
      // Change format to 'date'
      cy.contains('Format:').parent().find('select').select('Date (YYYY-MM-DD)');
      cy.wait(200);
      
      // Select a date
      cy.contains('Datepicker with Custom Format').parent().parent().within(() => {
        cy.get('ngt-datepicker').within(() => {
          cy.get('button[role="gridcell"]:not([disabled])').first().click();
        });
      });
      
      cy.wait(200);
      
      // Check that the format is displayed correctly (YYYY-MM-DD)
      cy.contains('Selected date (date format):').should('be.visible');
      cy.contains(/Selected date \(date format\): \d{4}-\d{2}-\d{2}/).should('exist');
    });
  });
});
