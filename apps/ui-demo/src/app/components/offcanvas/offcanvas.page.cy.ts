import { TestBed } from '@angular/core/testing';
import { OffcanvasPage } from './offcanvas.page';

describe(OffcanvasPage.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(OffcanvasPage, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(OffcanvasPage);
  });
});
