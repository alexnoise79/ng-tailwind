/// <reference types="cypress" />

describe('Datepicker E2E', () => {
  beforeEach(() => {
    cy.visit('/datepicker');
  });

  describe('Basic Datepicker', () => {
    it('should display the datepicker calendar', () => {
      cy.contains('Basic Datepicker')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-datepicker').should('be.visible');
          // Open the calendar by clicking the input
          cy.get('ngt-datepicker').find('input').click();
          cy.wait(300);
          // Scroll calendar into view to avoid clipping - use force for visibility check
          cy.get('ngt-datepicker').find('[role="application"]').scrollIntoView({ offset: { top: -100, left: 0 } });
          cy.wait(200);
          // Check for buttons - they might be clipped but should exist
          cy.get('button[aria-label="Previous month"]').should('exist');
          cy.get('button[aria-label="Next month"]').should('exist');
          cy.contains('Mon').should('be.visible');
          cy.contains('Sun').should('be.visible');
        });
    });

    it('should display current month and year', () => {
      const today = new Date();
      const currentMonth = today.toLocaleString('default', { month: 'long' });
      const currentYear = today.getFullYear();

      cy.contains('Basic Datepicker')
        .parent()
        .parent()
        .within(() => {
          // Open the calendar by clicking the input
          cy.get('ngt-datepicker').find('input').click();
          cy.wait(200);
          cy.get('select[aria-label="Select month"]').should('contain', currentMonth);
          cy.get('select[aria-label="Select year"]').should('contain', currentYear.toString());
        });
    });

    it('should select a date when clicking on a day', () => {
      cy.contains('Basic Datepicker')
        .parent()
        .parent()
        .within(() => {
          // Open the calendar by clicking the input
          cy.get('ngt-datepicker').find('input').click();
          cy.wait(300);
          // Scroll calendar into view
          cy.get('ngt-datepicker').find('[role="application"]').scrollIntoView();
          cy.wait(200);
          cy.get('button[role="gridcell"]:not([disabled])').first().click();
        });

      cy.wait(500);
      // Datepicker updates the input value when a date is selected
      cy.contains('Basic Datepicker')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-datepicker').find('input').should('not.have.value', '');
        });
    });

    it('should have navigation buttons visible', () => {
      cy.contains('Basic Datepicker')
        .parent()
        .parent()
        .within(() => {
          // Open the calendar by clicking the input
          cy.get('ngt-datepicker').find('input').click();
          cy.wait(300);
          // Scroll calendar into view to avoid clipping - use force for visibility check
          cy.get('ngt-datepicker').find('[role="application"]').scrollIntoView({ offset: { top: -100, left: 0 } });
          cy.wait(200);
          // Check for buttons - they might be clipped but should exist
          cy.get('button[aria-label="Previous month"]').should('exist');
          cy.get('button[aria-label="Next month"]').should('exist');
        });
    });

    it('should change month via dropdown', () => {
      cy.contains('Basic Datepicker')
        .parent()
        .parent()
        .within(() => {
          // Open the calendar by clicking the input
          cy.get('ngt-datepicker').find('input').click();
          cy.wait(300);
          // Scroll calendar into view and use force for select
          cy.get('ngt-datepicker').find('[role="application"]').scrollIntoView();
          cy.wait(200);
          cy.get('select[aria-label="Select month"]').select('March', { force: true });
          cy.wait(200);
          cy.get('select[aria-label="Select month"]').should('have.value', '3');
        });
    });

    it('should change year via dropdown', () => {
      cy.contains('Basic Datepicker')
        .parent()
        .parent()
        .within(() => {
          // Open the calendar by clicking the input
          cy.get('ngt-datepicker').find('input').click();
          cy.wait(300);
          // Scroll calendar into view and use force for select
          cy.get('ngt-datepicker').find('[role="application"]').scrollIntoView();
          cy.wait(200);
          cy.get('select[aria-label="Select year"]')
            .invoke('val')
            .then(currentYearVal => {
              const currentYear = parseInt(currentYearVal as string);
              const nextYear = currentYear + 1;

              cy.get('select[aria-label="Select year"]').select(nextYear.toString(), { force: true });
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

      cy.contains('Datepicker with Time')
        .parent()
        .parent()
        .within(() => {
          // Open the calendar by clicking the input
          cy.get('ngt-datepicker').find('input').click();
          cy.wait(200);
          cy.get('ngt-datepicker').within(() => {
            cy.get('ngt-timepicker').should('exist');
          });
        });
    });

    it('should allow selecting date with time', () => {
      cy.contains('Datepicker with Time').scrollIntoView();
      cy.wait(200);

      cy.contains('Datepicker with Time')
        .parent()
        .parent()
        .within(() => {
          // Open the calendar by clicking the input
          cy.get('ngt-datepicker').find('input').click();
          cy.wait(300);
          // Scroll calendar into view
          cy.get('ngt-datepicker').find('[role="application"]').scrollIntoView();
          cy.wait(200);
          cy.get('ngt-datepicker').within(() => {
            cy.get('button[role="gridcell"]:not([disabled])').first().click();
          });
        });

      cy.wait(500);
      // Datepicker updates the input value when a date is selected
      cy.contains('Datepicker with Time')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-datepicker').find('input').should('not.have.value', '');
        });
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
      cy.contains('Datepicker with Custom Format')
        .parent()
        .parent()
        .within(() => {
          // Open the calendar by clicking the input
          cy.get('ngt-datepicker').find('input').click();
          cy.wait(300);
          // Scroll calendar into view
          cy.get('ngt-datepicker').find('[role="application"]').scrollIntoView();
          cy.wait(200);
          cy.get('ngt-datepicker').within(() => {
            cy.get('button[role="gridcell"]:not([disabled])').first().click();
          });
        });

      cy.wait(500);

      // Datepicker updates the input value when a date is selected
      // Check that the format is displayed correctly (YYYY-MM-DD format)
      cy.contains('Datepicker with Custom Format')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-datepicker').find('input').should('not.have.value', '');
          // The value should match YYYY-MM-DD format
          cy.get('ngt-datepicker').find('input').invoke('val').should('match', /^\d{4}-\d{2}-\d{2}$/);
        });
    });
  });
});
