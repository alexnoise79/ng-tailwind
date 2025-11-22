import { TestBed } from '@angular/core/testing';
import { DropdownPage } from './dropdown.page';

describe(DropdownPage.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(DropdownPage, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(DropdownPage);
  });
});
