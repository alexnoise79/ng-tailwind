/// <reference types="cypress" />

describe('Offcanvas Page E2E', () => {
  beforeEach(() => {
    cy.visit('/offcanvas');
  });

  it('should display the offcanvas page title and description', () => {
    cy.contains('Offcanvas');
    cy.contains('Offcanvas components that slide in from the edges');
  });

  describe('Positions', () => {
    beforeEach(() => {
      cy.contains('Positions').scrollIntoView();
      cy.wait(200);
    });

    it('should display all position buttons', () => {
      cy.contains('Positions')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Open from Start').should('be.visible');
          cy.contains('Open from End').should('be.visible');
          cy.contains('Open from Top').should('be.visible');
          cy.contains('Open from Bottom').should('be.visible');
        });
    });

    it('should open offcanvas from start', () => {
      cy.contains('Positions')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Open from Start').click();
          cy.wait(500);
          // Offcanvas might be covered by backdrop, check for it with force
          cy.get('[role="dialog"]', { timeout: 5000 }).should('exist');
          cy.contains('Offcanvas from Start').should('exist');
          cy.contains('Content from start position').should('exist');
        });
    });

    it('should open offcanvas from end', () => {
      cy.contains('Positions')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Open from End').click();
          cy.wait(500);
          cy.get('[role="dialog"]', { timeout: 5000 }).should('exist');
          cy.contains('Offcanvas from End').should('exist');
        });
    });

    it('should open offcanvas from top', () => {
      cy.contains('Positions')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Open from Top').click();
          cy.wait(500);
          cy.get('[role="dialog"]', { timeout: 5000 }).should('exist');
          cy.contains('Offcanvas from Top').should('exist');
        });
    });

    it('should open offcanvas from bottom', () => {
      cy.contains('Positions')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Open from Bottom').click();
          cy.wait(500);
          cy.get('[role="dialog"]', { timeout: 5000 }).should('exist');
          cy.contains('Offcanvas from Bottom').should('exist');
        });
    });

    it('should close offcanvas when escape key is pressed', () => {
      cy.contains('Positions')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Open from Start').click();
          cy.wait(500);
          // Press escape key on the document/body - use document directly
          cy.document().then((doc) => {
            cy.wrap(doc.body).type('{esc}', { force: true });
          });
          cy.wait(500);
          cy.get('[role="dialog"]').should('not.exist');
        });
    });
  });

  describe('With Title', () => {
    beforeEach(() => {
      cy.contains('With Title').scrollIntoView();
      cy.wait(200);
    });

    it('should display the open button', () => {
      cy.contains('With Title')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Open with Title').should('be.visible');
        });
    });

    it('should open offcanvas with title when button is clicked', () => {
      cy.contains('With Title')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Open with Title').click();
          cy.wait(300);
          cy.get('[role="dialog"]').should('be.visible');
        });
    });
  });

  describe('Backdrop Options', () => {
    beforeEach(() => {
      cy.contains('Backdrop Options').scrollIntoView();
      cy.wait(200);
    });

    it('should display backdrop option buttons', () => {
      cy.contains('Backdrop Options')
        .parent()
        .parent()
        .within(() => {
          cy.contains('With Backdrop').should('be.visible');
          cy.contains('Without Backdrop').should('be.visible');
        });
    });

    it('should open offcanvas with backdrop', () => {
      cy.contains('Backdrop Options')
        .parent()
        .parent()
        .within(() => {
          cy.contains('With Backdrop').click();
          cy.wait(500);
          cy.get('[role="dialog"]', { timeout: 5000 }).should('exist');
        });
    });
  });
});
