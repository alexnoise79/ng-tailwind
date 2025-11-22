/// <reference types="cypress" />

describe('Accordion Page E2E', () => {
  beforeEach(() => {
    cy.visit('/accordion');
  });

  it('should display the accordion page title', () => {
    cy.contains('Accordion');
    cy.contains('Collapsible content sections with smooth animations');
  });
});

