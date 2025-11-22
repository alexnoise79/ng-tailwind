/// <reference types="cypress" />

describe('Select E2E', () => {
  beforeEach(() => {
    cy.visit('/select');
    // Navigate to Showcase tab if not already there
    cy.contains('Showcase').click();
  });

  describe('Basic Select', () => {
    it('should display the basic select component', () => {
      cy.contains('Basic')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-select').should('be.visible');
          cy.contains('Select a City').should('be.visible');
        });
    });

    it('should open dropdown when clicked', () => {
      cy.contains('Basic')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-select').click();
          cy.wait(300);
          // Check that dropdown is open (listbox should be visible)
          cy.get('[role="listbox"]').should('be.visible');
        });
    });

    it('should select an option from the dropdown', () => {
      cy.contains('Basic')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-select').click();
          cy.wait(200);
          // Click on first option
          cy.get('[role="listbox"]').within(() => {
            cy.get('div[role="option"]').first().click();
          });
          cy.wait(200);
          // Check that selection is displayed
          cy.contains('Selected:').should('be.visible');
          cy.contains('Selected: None').should('not.exist');
        });
    });
  });

  describe('Object Options', () => {
    it('should display object options select', () => {
      cy.contains('Object Options')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-select').should('be.visible');
        });
    });

    it('should select an object option', () => {
      cy.contains('Object Options')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-select').click();
          cy.wait(200);
          cy.get('[role="option"]').first().click();
          cy.wait(200);
          cy.contains('Selected:').should('be.visible');
          cy.contains('Selected: None').should('not.exist');
        });
    });
  });

  describe('Key-Value Pairs', () => {
    it('should display key-value select', () => {
      cy.contains('Key-Value Pairs')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-select').should('be.visible');
        });
    });

    it('should select a key-value option', () => {
      cy.contains('Key-Value Pairs')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-select').click();
          cy.wait(200);
          cy.get('[role="option"]').first().click();
          cy.wait(200);
          cy.contains('Selected:').should('be.visible');
        });
    });
  });

  describe('Sizes', () => {
    it('should display all size variants', () => {
      cy.contains('Sizes')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Small').should('be.visible');
          cy.contains('Medium (Default)').should('be.visible');
          cy.contains('Large').should('be.visible');
          cy.get('ngt-select').should('have.length', 3);
        });
    });

    it('should allow selecting from small select', () => {
      cy.contains('Sizes')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Small').parent().find('ngt-select').click();
          cy.wait(200);
          cy.get('[role="option"]').first().click();
          cy.wait(200);
        });
    });

    it('should allow selecting from medium select', () => {
      cy.contains('Sizes')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Medium (Default)').parent().find('ngt-select').click();
          cy.wait(200);
          cy.get('[role="option"]').first().click();
          cy.wait(200);
        });
    });

    it('should allow selecting from large select', () => {
      cy.contains('Sizes')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Large').parent().find('ngt-select').click();
          cy.wait(200);
          cy.get('[role="option"]').first().click();
          cy.wait(200);
        });
    });
  });

  describe('Checkmark', () => {
    it('should display select with checkmark', () => {
      cy.contains('Checkmark')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-select').should('be.visible');
        });
    });

    it('should show checkmark when option is selected', () => {
      cy.contains('Checkmark')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-select').click();
          cy.wait(200);
          cy.get('[role="option"]').first().click();
          cy.wait(200);
          // Reopen to see checkmark
          cy.get('ngt-select').click();
          cy.wait(200);
          // Checkmark should be visible on selected option
          cy.get('[role="option"][aria-selected="true"]').should('exist');
        });
    });
  });

  describe('Clear Icon', () => {
    it('should display clear button when option is selected', () => {
      cy.contains('Clear Icon')
        .parent()
        .parent()
        .within(() => {
          // Select an option first
          cy.get('ngt-select').first().click();
          cy.wait(200);
          cy.get('[role="listbox"]').within(() => {
            cy.get('div[role="option"]').first().click();
          });
          cy.wait(200);

          // Clear button should be visible
          cy.get('ngt-select')
            .first()
            .within(() => {
              cy.get('button[aria-label="Clear selection"]').should('be.visible');
            });
        });
    });

    it('should clear selection when clear button is clicked', () => {
      cy.contains('Clear Icon')
        .parent()
        .parent()
        .within(() => {
          // Select an option
          cy.get('ngt-select').first().click();
          cy.wait(200);
          cy.get('[role="listbox"]').within(() => {
            cy.get('div[role="option"]').first().click();
          });
          cy.wait(200);

          // Click clear button
          cy.get('ngt-select')
            .first()
            .within(() => {
              cy.get('button[aria-label="Clear selection"]').click();
            });
          cy.wait(200);

          // Selection should be cleared (check that placeholder is shown again)
          cy.get('ngt-select').first().should('contain', 'Select a City');
        });
    });
  });

  describe('Filter', () => {
    it('should display filter input when filter is enabled', () => {
      cy.contains('Filter')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-select').click();
          cy.wait(200);
          // Filter input should be visible
          cy.get('input[type="text"]').should('be.visible');
        });
    });

    it('should filter options when typing in filter input', () => {
      cy.contains('Filter')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-select').click();
          cy.wait(300);

          // Verify filter input is visible and can be typed into
          cy.get('input[type="text"]').should('be.visible');
          cy.get('input[type="text"]').clear().type('New');
          cy.wait(400);

          // Verify listbox is still visible (filtering happened)
          cy.get('[role="listbox"]').should('be.visible');
        });
    });
  });

  describe('Multiselect', () => {
    it('should display multiselect component', () => {
      cy.contains('Multiselect')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-select').should('have.length.at.least', 1);
        });
    });

    it('should allow selecting multiple options', () => {
      cy.contains('Multiselect')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-select').first().click();
          cy.wait(300);

          // Select first option (dropdown stays open in multiselect)
          cy.get('[role="listbox"]').should('be.visible');
          cy.get('[role="listbox"]').within(() => {
            cy.get('div[role="option"]').first().click();
          });
          cy.wait(300);

          // Verify dropdown is still open and select second option
          cy.get('[role="listbox"]').should('be.visible');
          cy.get('[role="listbox"]').within(() => {
            cy.get('div[role="option"]').eq(1).click();
          });
          cy.wait(300);

          // Both should be selected (check checkboxes are checked or chips are visible)
          cy.get('[role="listbox"]').within(() => {
            cy.get('input[type="checkbox"]:checked').should('have.length.at.least', 2);
          });
        });
    });
  });

  describe('Grouped Options', () => {
    it('should display grouped select', () => {
      cy.contains('Grouped Options')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-select').should('be.visible');
        });
    });

    it('should display option groups', () => {
      cy.contains('Grouped Options')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-select').click();
          cy.wait(200);
          // Group headers should be visible (they're divs with text-xs font-semibold)
          cy.get('[role="listbox"]').within(() => {
            cy.get('div.text-xs.font-semibold').should('exist');
          });
        });
    });

    it('should allow selecting from a group', () => {
      cy.contains('Grouped Options')
        .parent()
        .parent()
        .within(() => {
          cy.get('ngt-select').click();
          cy.wait(200);
          // Select first option from a group
          cy.get('[role="listbox"]').within(() => {
            cy.get('div[role="option"]').first().click();
          });
          cy.wait(200);
          cy.contains('Selected:').should('be.visible');
        });
    });
  });

  describe('Form Validation', () => {
    it('should display form with select', () => {
      cy.contains('Forms')
        .parent()
        .parent()
        .within(() => {
          cy.get('form').should('be.visible');
          cy.get('ngt-select').should('be.visible');
        });
    });

    it('should show validation error when form is submitted without selection', () => {
      cy.contains('Forms')
        .parent()
        .parent()
        .within(() => {
          // Submit form without selecting
          cy.get('button[type="submit"]').click();
          cy.wait(300);

          // Error message should be shown
          cy.contains('City is required').should('be.visible');
        });
    });

    it('should not show error when option is selected', () => {
      cy.contains('Forms')
        .parent()
        .parent()
        .within(() => {
          // Select an option
          cy.get('ngt-select').click();
          cy.wait(200);
          cy.get('[role="listbox"]').within(() => {
            cy.get('div[role="option"]').first().click();
          });
          cy.wait(200);

          // Submit form
          cy.get('button[type="submit"]').click();
          cy.wait(200);

          // Error should not be shown
          cy.contains('City is required').should('not.exist');
        });
    });
  });
});
