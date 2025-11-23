/// <reference types="cypress" />

describe('Collapse Page E2E', () => {
  beforeEach(() => {
    cy.visit('/collapse');
  });

  it('should display the collapse page title and description', () => {
    cy.contains('Collapse');
    cy.contains('Collapsible content with smooth animations');
  });

  describe('Vertical Collapse', () => {
    beforeEach(() => {
      cy.contains('Vertical Collapse').scrollIntoView();
      cy.wait(200);
    });

    it('should display the toggle button', () => {
      cy.contains('Vertical Collapse')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Show Content').should('be.visible');
        });
    });

    it('should expand content when Show button is clicked', () => {
      cy.contains('Vertical Collapse')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Show Content').click();
          cy.wait(300);
          cy.contains('This is collapsible content with smooth animations').should('be.visible');
          cy.contains('The content smoothly expands and collapses vertically').should('be.visible');
        });
    });

    it('should collapse content when Hide button is clicked', () => {
      cy.contains('Vertical Collapse')
        .parent()
        .parent()
        .within(() => {
          // Expand first
          cy.contains('Show Content').click();
          cy.wait(300);
          cy.contains('This is collapsible content with smooth animations').should('be.visible');
          
          // Then collapse
          cy.contains('Hide Content').click();
          cy.wait(300);
          cy.contains('This is collapsible content with smooth animations').should('not.be.visible');
        });
    });
  });

  describe('Horizontal Collapse', () => {
    beforeEach(() => {
      cy.contains('Horizontal Collapse').scrollIntoView();
      cy.wait(200);
    });

    it('should display the toggle button', () => {
      cy.contains('Horizontal Collapse')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Show Horizontal').should('be.visible');
        });
    });

    it('should expand content when Show button is clicked', () => {
      cy.contains('Horizontal Collapse')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Show Horizontal').click();
          cy.wait(300);
          cy.contains('Horizontal collapse content').should('be.visible');
        });
    });

    it('should collapse content when Hide button is clicked', () => {
      cy.contains('Horizontal Collapse')
        .parent()
        .parent()
        .within(() => {
          // Expand first
          cy.contains('Show Horizontal').click();
          cy.wait(300);
          cy.contains('Horizontal collapse content').should('be.visible');
          
          // Then collapse
          cy.contains('Hide Horizontal').click();
          cy.wait(300);
          cy.contains('Horizontal collapse content').should('not.be.visible');
        });
    });
  });
});

