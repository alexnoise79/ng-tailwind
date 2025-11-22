import { TestBed } from '@angular/core/testing';
import { AlertPage } from './alert.page';

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
});
