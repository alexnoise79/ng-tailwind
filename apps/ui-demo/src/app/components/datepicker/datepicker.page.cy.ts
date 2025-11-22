import { TestBed } from '@angular/core/testing';
import { DatepickerPage } from './datepicker.page';

describe(DatepickerPage.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(DatepickerPage, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(DatepickerPage);
  });
});
