import { TestBed } from '@angular/core/testing';
import { NavPage } from './nav.page';

describe(NavPage.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(NavPage, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(NavPage);
  });
});
