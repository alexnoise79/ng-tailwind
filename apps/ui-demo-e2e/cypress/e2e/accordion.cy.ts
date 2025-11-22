/// <reference types="cypress" />

describe('Accordion Page E2E', () => {
  beforeEach(() => {
    cy.visit('/accordion');
  });

  it('should display the accordion page title and description', () => {
    cy.contains('Accordion');
    cy.contains('Collapsible content sections with smooth animations');
  });

  describe('Tab Navigation', () => {
    it('should display Showcase and API tabs', () => {
      cy.contains('Showcase').should('be.visible');
      cy.contains('API').should('be.visible');
    });

    it('should switch to API tab when clicked', () => {
      cy.contains('API').click();
      cy.contains('API Reference').should('be.visible');
      cy.contains('NgtAccordion - Inputs').should('be.visible');
    });

    it('should switch back to Showcase tab when clicked', () => {
      cy.contains('API').click();
      cy.contains('Showcase').click();
      cy.contains('Single Open (Default)').should('be.visible');
    });
  });

  describe('Single Open (Default) Accordion', () => {
    beforeEach(() => {
      cy.contains('Single Open (Default)').scrollIntoView();
      cy.wait(200);
    });

    it('should display all three accordion items', () => {
      cy.contains('Single Open (Default)')
        .parent()
        .parent()
        .within(() => {
          cy.contains('First Item').should('be.visible');
          cy.contains('Second Item').should('be.visible');
          cy.contains('Third Item').should('be.visible');
        });
    });

    it('should expand first item when clicked', () => {
      cy.contains('Single Open (Default)')
        .parent()
        .parent()
        .within(() => {
          cy.contains('First Item').click();
          cy.wait(200);
          cy.contains('This is the content of the first accordion item.').should('be.visible');
        });
    });

    it('should close first item when clicking it again', () => {
      cy.contains('Single Open (Default)')
        .parent()
        .parent()
        .within(() => {
          cy.contains('First Item').click();
          cy.wait(200);
          cy.contains('First Item').click();
          cy.wait(200);
          cy.contains('This is the content of the first accordion item.').should('not.be.visible');
        });
    });

    it('should close first item when opening second item (single open mode)', () => {
      cy.contains('Single Open (Default)')
        .parent()
        .parent()
        .within(() => {
          // Open first item
          cy.contains('First Item').click();
          cy.wait(200);
          cy.contains('This is the content of the first accordion item.').should('be.visible');
          
          // Open second item - first should close
          cy.contains('Second Item').click();
          cy.wait(200);
          cy.contains('This is the content of the first accordion item.').should('not.be.visible');
          cy.contains('This is the content of the second accordion item.').should('be.visible');
        });
    });

    it('should only have one item open at a time', () => {
      cy.contains('Single Open (Default)')
        .parent()
        .parent()
        .within(() => {
          // Open first item
          cy.contains('First Item').click();
          cy.wait(200);
          
          // Open third item
          cy.contains('Third Item').click();
          cy.wait(200);
          
          // Only third item should be visible
          cy.contains('This is the content of the first accordion item.').should('not.be.visible');
          cy.contains('This is the content of the third accordion item.').should('be.visible');
        });
    });
  });

  describe('Multiple Open Accordion', () => {
    beforeEach(() => {
      cy.contains('Multiple Open').scrollIntoView();
      cy.wait(200);
    });

    it('should display all three accordion items', () => {
      cy.contains('Multiple Open')
        .parent()
        .parent()
        .within(() => {
          cy.contains('First Item').should('be.visible');
          cy.contains('Second Item').should('be.visible');
          cy.contains('Third Item').should('be.visible');
        });
    });

    it('should allow multiple items to be open simultaneously', () => {
      cy.contains('Multiple Open')
        .parent()
        .parent()
        .within(() => {
          // Open first item
          cy.contains('First Item').click();
          cy.wait(200);
          cy.contains('This is the content of the first accordion item.').should('be.visible');
          
          // Open second item - first should remain open
          cy.contains('Second Item').click();
          cy.wait(200);
          cy.contains('This is the content of the first accordion item.').should('be.visible');
          cy.contains('This is the content of the second accordion item.').should('be.visible');
          
          // Open third item - first and second should remain open
          cy.contains('Third Item').click();
          cy.wait(200);
          cy.contains('This is the content of the first accordion item.').should('be.visible');
          cy.contains('This is the content of the second accordion item.').should('be.visible');
          cy.contains('This is the content of the third accordion item.').should('be.visible');
        });
    });

    it('should allow closing items independently', () => {
      cy.contains('Multiple Open')
        .parent()
        .parent()
        .within(() => {
          // Open all items
          cy.contains('First Item').click();
          cy.wait(200);
          cy.contains('Second Item').click();
          cy.wait(200);
          cy.contains('Third Item').click();
          cy.wait(200);
          
          // Close second item - first and third should remain open
          cy.contains('Second Item').click();
          cy.wait(200);
          cy.contains('This is the content of the first accordion item.').should('be.visible');
          cy.contains('This is the content of the second accordion item.').should('not.be.visible');
          cy.contains('This is the content of the third accordion item.').should('be.visible');
        });
    });
  });

  describe('Disabled State Accordion', () => {
    beforeEach(() => {
      cy.contains('Disabled State').scrollIntoView();
      cy.wait(200);
    });

    it('should display disabled and enabled items', () => {
      cy.contains('Disabled State')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Disabled Item').should('be.visible');
          cy.contains('Enabled Item').should('be.visible');
        });
    });

    it('should not allow disabled item to be opened', () => {
      cy.contains('Disabled State')
        .parent()
        .parent()
        .within(() => {
          // Verify disabled item content is not visible initially
          cy.contains('This accordion item is disabled and cannot be toggled.').should('not.be.visible');
          
          // Find the button containing "Disabled Item" and verify it's disabled
          cy.contains('Disabled Item')
            .closest('button')
            .should('be.disabled')
            .should('have.attr', 'aria-disabled', 'true');
          
          // Content should remain not visible (disabled items cannot be toggled)
          cy.contains('This accordion item is disabled and cannot be toggled.').should('not.be.visible');
        });
    });

    it('should allow enabled item to be opened', () => {
      cy.contains('Disabled State')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Enabled Item').click();
          cy.wait(200);
          cy.contains('This accordion item is enabled and can be toggled.').should('be.visible');
        });
    });

    it('should allow enabled item to be closed', () => {
      cy.contains('Disabled State')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Enabled Item').click();
          cy.wait(200);
          cy.contains('Enabled Item').click();
          cy.wait(200);
          cy.contains('This accordion item is enabled and can be toggled.').should('not.be.visible');
        });
    });
  });

});
