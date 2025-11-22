import { TestBed } from '@angular/core/testing';
import { CollapsePage } from './collapse.page';

describe(CollapsePage.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(CollapsePage, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(CollapsePage);
  });
});
