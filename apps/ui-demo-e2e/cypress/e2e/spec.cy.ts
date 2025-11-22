/// <reference types="cypress" />

describe('ui-demo e2e', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the app title', () => {
    cy.contains('ng-tailwind UI');
  });

  it('should have navigation elements', () => {
    // Verify the app has loaded with navigation
    cy.get('aside').should('exist');
  });
});

