/// <reference types="cypress" />

describe('Modal Page E2E', () => {
  beforeEach(() => {
    cy.visit('/modal');
  });

  it('should display the modal page title and description', () => {
    cy.contains('Modal');
    cy.contains('Modal dialogs built with Angular CDK Overlay');
  });

  describe('Basic Modal', () => {
    beforeEach(() => {
      cy.contains('Basic Modal').scrollIntoView();
      cy.wait(200);
    });

    it('should display the open modal button', () => {
      cy.contains('Basic Modal')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Open Modal').should('be.visible');
        });
    });

    it('should open modal when button is clicked', () => {
      cy.contains('Basic Modal')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Open Modal').click();
          cy.wait(300);
          cy.get('[role="dialog"]').should('be.visible');
          cy.contains('Example Modal').should('be.visible');
          cy.contains('This is a modal dialog built with Angular CDK Overlay').should('be.visible');
        });
    });

    it('should close modal when cancel button is clicked', () => {
      cy.contains('Basic Modal')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Open Modal').click();
          cy.wait(300);
          cy.contains('Cancel').click();
          cy.wait(300);
          cy.get('[role="dialog"]').should('not.exist');
        });
    });

    it('should close modal when confirm button is clicked', () => {
      cy.contains('Basic Modal')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Open Modal').click();
          cy.wait(300);
          cy.contains('Confirm').click();
          cy.wait(300);
          cy.get('[role="dialog"]').should('not.exist');
        });
    });

    it('should close modal when escape key is pressed', () => {
      cy.contains('Basic Modal')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Open Modal').click();
          cy.wait(300);
          cy.get('[role="dialog"]').should('be.visible');
          // Press escape key on the document/body - use document directly
          cy.document().then(doc => {
            cy.wrap(doc.body).type('{esc}', { force: true });
          });
          cy.wait(500);
          cy.get('[role="dialog"]').should('not.exist');
        });
    });
  });

  describe('Modal with Footer', () => {
    beforeEach(() => {
      cy.contains('Modal with Footer').scrollIntoView();
      cy.wait(200);
    });

    it('should display the open modal button', () => {
      cy.contains('Modal with Footer')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Open Modal with Footer').should('be.visible');
        });
    });

    it('should open modal with footer when button is clicked', () => {
      cy.contains('Modal with Footer')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Open Modal with Footer').click();
          cy.wait(300);
          cy.get('[role="dialog"]').should('be.visible');
          cy.contains('Modal with Footer').should('be.visible');
          cy.contains('This modal has a dedicated footer section').should('be.visible');
          cy.contains('Cancel').should('be.visible');
          cy.contains('Confirm').should('be.visible');
        });
    });

    it('should close modal when footer cancel button is clicked', () => {
      cy.contains('Modal with Footer')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Open Modal with Footer').click();
          cy.wait(300);
          cy.contains('Cancel').click();
          cy.wait(300);
          cy.get('[role="dialog"]').should('not.exist');
        });
    });
  });
});
