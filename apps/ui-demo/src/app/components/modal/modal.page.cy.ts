import { TestBed } from '@angular/core/testing';
import { ModalPage } from './modal.page';

describe(ModalPage.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(ModalPage, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(ModalPage);
  });
});
