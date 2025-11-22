import { TestBed } from '@angular/core/testing';
import { TooltipPage } from './tooltip.page';

describe(TooltipPage.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(TooltipPage, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(TooltipPage);
  });
});
