import { TestBed } from '@angular/core/testing';
import { PaginationPage } from './pagination.page';

describe(PaginationPage.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(PaginationPage, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(PaginationPage);
  });
});
