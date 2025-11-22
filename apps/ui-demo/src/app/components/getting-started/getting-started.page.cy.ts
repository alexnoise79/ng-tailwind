import { TestBed } from '@angular/core/testing';
import { GettingStartedPage } from './getting-started.page';

describe(GettingStartedPage.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(GettingStartedPage, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(GettingStartedPage);
  });
});
