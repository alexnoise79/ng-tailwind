import { TestBed } from '@angular/core/testing';
import { TimepickerPage } from './timepicker.page';

describe(TimepickerPage.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(TimepickerPage, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(TimepickerPage);
  });
});
