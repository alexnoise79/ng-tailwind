import { TestBed } from '@angular/core/testing';
import { ToastPage } from './toast.page';

describe(ToastPage.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(ToastPage, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(ToastPage);
  });
});
