import { TestBed } from '@angular/core/testing';
import { ToggleSwitchPage } from './toggle-switch.page';

describe(ToggleSwitchPage.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(ToggleSwitchPage, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(ToggleSwitchPage);
  });
});
