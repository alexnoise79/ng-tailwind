import { TestBed } from '@angular/core/testing';
import { SelectPage } from './select.page';

describe(SelectPage.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(SelectPage, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(SelectPage);
  });
});
