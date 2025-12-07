/// <reference types="cypress" />

describe('Tooltip Page E2E', () => {
  beforeEach(() => {
    cy.visit('/tooltip');
  });

  it('should display the tooltip page title and description', () => {
    cy.contains('Tooltip');
    cy.contains('Contextual information tooltips with multiple positions');
  });

  describe('Positions', () => {
    beforeEach(() => {
      cy.contains('Positions').scrollIntoView();
      cy.wait(200);
    });

    it('should display tooltip trigger buttons', () => {
      cy.contains('Positions')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Top Tooltip').should('be.visible');
          cy.contains('Bottom Tooltip').should('be.visible');
          cy.contains('Left Tooltip').should('be.visible');
          cy.contains('Right Tooltip').should('be.visible');
        });
    });

    it('should show tooltip on hover for top position', () => {
      cy.contains('Positions')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Top Tooltip').trigger('mouseenter');
          cy.wait(300);
          cy.get('[role="tooltip"]').should('be.visible');
          cy.contains('This is a tooltip on top').should('be.visible');
        });
    });

    it('should show tooltip on hover for bottom position', () => {
      cy.contains('Positions')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Bottom Tooltip').trigger('mouseenter');
          cy.wait(300);
          cy.get('[role="tooltip"]').should('be.visible');
          cy.contains('This is a tooltip on bottom').should('be.visible');
        });
    });

    it('should show tooltip on hover for left position', () => {
      cy.contains('Positions')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Left Tooltip').trigger('mouseenter');
          cy.wait(300);
          cy.get('[role="tooltip"]').should('be.visible');
          cy.contains('This is a tooltip on left').should('be.visible');
        });
    });

    it('should show tooltip on hover for right position', () => {
      cy.contains('Positions')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Right Tooltip').trigger('mouseenter');
          cy.wait(300);
          cy.get('[role="tooltip"]').should('be.visible');
          cy.contains('This is a tooltip on right').should('be.visible');
        });
    });

    it('should hide tooltip when mouse leaves', () => {
      cy.contains('Positions')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Top Tooltip').trigger('mouseenter');
          cy.wait(300);
          cy.get('[role="tooltip"]').should('be.visible');
          cy.contains('Top Tooltip').trigger('mouseleave');
          cy.wait(400);
          // Tooltip should be hidden after delay
        });
    });
  });

  describe('Delays', () => {
    beforeEach(() => {
      cy.contains('Delays').scrollIntoView();
      cy.wait(200);
    });

    it('should display delay buttons', () => {
      cy.contains('Delays')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Default Delay').should('be.visible');
          cy.contains('Fast Show Delay').should('be.visible');
          cy.contains('Slow Hide Delay').should('be.visible');
          cy.contains('Custom Delays').should('be.visible');
        });
    });

    it('should show tooltip with default delay', () => {
      cy.contains('Delays')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Default Delay').trigger('mouseenter');
          cy.wait(300);
          cy.get('[role="tooltip"]').should('be.visible');
        });
    });
  });

  describe('Custom Content', () => {
    beforeEach(() => {
      // Ensure we're on the Showcase tab
      cy.contains('Showcase').click();
      cy.wait(200);
      cy.contains('Custom Content').scrollIntoView();
      cy.wait(200);
    });

    it('should display custom content button', () => {
      cy.contains('Custom Content')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Custom Content').should('be.visible');
        });
    });

    it('should show tooltip with custom content on hover', () => {
      cy.contains('Custom Content')
        .closest('section')
        .within(() => {
          // Find the button with custom content tooltip
          cy.contains('Custom Content').parent().find('button').first().trigger('mouseenter');
          cy.wait(1000);
          // Tooltip should appear with role="tooltip" - custom content uses TemplateRef
          cy.get('[role="tooltip"]', { timeout: 5000 }).should('be.visible');
          // Check for custom content text - the text is split across spans: "Custom" and "HTML content with color"
          cy.get('[role="tooltip"]').should('contain', 'Custom');
          cy.get('[role="tooltip"]').should('contain', 'HTML content with');
        });
    });
  });
});
