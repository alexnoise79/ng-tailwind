import { TestBed } from '@angular/core/testing';
import { AlertPage } from './alert.page';
// Import support file to ensure types are loaded
import '../../../../cypress/support/component';

describe(AlertPage.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(AlertPage, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(AlertPage);
  });

  describe('Alert Variants', () => {
    it('should display all alert variants', () => {
      cy.mount(AlertPage);
      
      // Wait for the page to render and check that all variants are displayed
      // The page should default to showcase tab
      cy.contains('All Variants', { timeout: 10000 }).should('be.visible');
      cy.contains('Success!').should('be.visible');
      cy.contains('Info:').should('be.visible');
      cy.contains('Warning:').should('be.visible');
      cy.contains('Error:').should('be.visible');
      cy.contains('Primary:').should('be.visible');
      cy.contains('Secondary:').should('be.visible');
      cy.contains('Light:').should('be.visible');
      cy.contains('Dark:').should('be.visible');
    });

    it('should have correct role attribute on alerts', () => {
      cy.mount(AlertPage);
      
      // Wait for alerts to render
      cy.contains('All Variants', { timeout: 10000 }).should('be.visible');
      
      // All alerts should have role="alert" - the role is on the div inside ngt-alert
      cy.get('ngt-alert').should('have.length.at.least', 1);
      cy.get('ngt-alert').each(($alert) => {
        cy.wrap($alert).find('div[role="alert"]').should('have.attr', 'role', 'alert');
      });
    });

    it('should have correct aria-live attributes', () => {
      cy.mount(AlertPage);
      
      // Wait for alerts to render
      cy.contains('All Variants', { timeout: 10000 }).should('be.visible');
      
      // Danger and warning should be assertive - the aria-live is on the div inside ngt-alert
      cy.get('ngt-alert').contains('Error:').closest('ngt-alert').find('div[role="alert"]')
        .should('have.attr', 'aria-live', 'assertive');
      cy.get('ngt-alert').contains('Warning:').closest('ngt-alert').find('div[role="alert"]')
        .should('have.attr', 'aria-live', 'assertive');
      
      // Others should be polite
      cy.get('ngt-alert').contains('Info:').closest('ngt-alert').find('div[role="alert"]')
        .should('have.attr', 'aria-live', 'polite');
      cy.get('ngt-alert').contains('Success!').closest('ngt-alert').find('div[role="alert"]')
        .should('have.attr', 'aria-live', 'polite');
    });
  });

  describe('Dismissible Functionality', () => {
    it('should show close button for dismissible alerts', () => {
      cy.mount(AlertPage);
      
      // Wait for page to render
      cy.contains('All Variants', { timeout: 10000 }).should('be.visible');
      
      // Scroll to dismissible section
      cy.contains('Dismissible').scrollIntoView();
      
      // Check that close button exists
      cy.get('ngt-alert').contains('This alert can be dismissed').parent()
        .find('button[aria-label="Close alert"]')
        .should('be.visible');
    });

    it('should not show close button for non-dismissible alerts', () => {
      cy.mount(AlertPage);
      
      // Wait for page to render
      cy.contains('All Variants', { timeout: 10000 }).should('be.visible');
      
      // Check non-dismissible section
      cy.contains('Not Dismissible').scrollIntoView();
      
      cy.get('ngt-alert').contains('This alert cannot be dismissed').parent()
        .find('button[aria-label="Close alert"]')
        .should('not.exist');
    });

    it('should dismiss alert when close button is clicked', () => {
      cy.mount(AlertPage);
      
      // Wait for page to render
      cy.contains('All Variants', { timeout: 10000 }).should('be.visible');
      
      cy.contains('Dismissible').scrollIntoView();
      
      // Find the dismissible alert and click close
      cy.get('ngt-alert').contains('This alert can be dismissed').parent()
        .should('be.visible')
        .find('button[aria-label="Close alert"]')
        .click();
      
      // Wait for animation and verify alert is hidden
      cy.wait(350);
      cy.get('ngt-alert').contains('This alert can be dismissed')
        .should('not.exist');
    });
  });

  describe('Content Projection', () => {
    it('should display alert content correctly', () => {
      cy.mount(AlertPage);
      
      // Wait for page to render
      cy.contains('All Variants', { timeout: 10000 }).should('be.visible');
      
      // Check that content is projected
      cy.get('ngt-alert').first().should('contain.text', 'Success!');
      cy.get('ngt-alert').first().find('strong').should('exist');
    });
  });

  describe('Icon Display', () => {
    it('should display icons for all alerts', () => {
      cy.mount(AlertPage);
      
      // Wait for page to render
      cy.contains('All Variants', { timeout: 10000 }).should('be.visible');
      
      // All alerts should have an icon (SVG)
      cy.get('ngt-alert svg').should('have.length.at.least', 8);
      
      // Icons should have path elements
      cy.get('ngt-alert svg path').should('exist');
    });
  });

  describe('Page Navigation', () => {
    it('should switch between Showcase and API tabs', () => {
      cy.mount(AlertPage);
      
      // Should start on Showcase tab
      cy.contains('All Variants', { timeout: 10000 }).should('be.visible');
      
      // Try to switch to API tab - use a more reliable selector
      cy.contains('API').click({ force: true });
      cy.contains('API Reference', { timeout: 5000 }).should('be.visible');
      cy.contains('Inputs').should('be.visible');
      cy.contains('Outputs').should('be.visible');
      
      // Switch back to Showcase
      cy.contains('Showcase').click({ force: true });
      cy.contains('All Variants', { timeout: 5000 }).should('be.visible');
    });
  });

  describe('Code View Toggle', () => {
    it('should toggle code view for demos', () => {
      cy.mount(AlertPage);
      
      // Wait for page to render
      cy.contains('All Variants', { timeout: 10000 }).should('be.visible');
      
      // Find and click the code toggle button for "All Variants"
      cy.contains('All Variants')
        .parent()
        .find('button[title="Toggle code view"]')
        .click();
      
      // Code should be visible
      cy.contains('ngt-alert variant="success"', { timeout: 5000 }).should('be.visible');
      
      // Toggle back
      cy.contains('All Variants')
        .parent()
        .find('button[title="Toggle code view"]')
        .click();
      
      // Alerts should be visible again
      cy.contains('Success!', { timeout: 5000 }).should('be.visible');
    });
  });
});
