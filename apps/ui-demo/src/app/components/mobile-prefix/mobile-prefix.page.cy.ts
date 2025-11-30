import { TestBed } from '@angular/core/testing';
import { MobilePrefixPage } from './mobile-prefix.page';

describe(MobilePrefixPage.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(MobilePrefixPage, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(MobilePrefixPage);
  });
});
