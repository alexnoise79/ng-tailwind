import { TestBed } from '@angular/core/testing';
import { TablePage } from './table.page';

describe(TablePage.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(TablePage, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(TablePage);
  });
});
