import { TestBed } from '@angular/core/testing';
import { ButtonPage } from './button.page';

describe(ButtonPage.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(ButtonPage, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(ButtonPage);
  });
});
