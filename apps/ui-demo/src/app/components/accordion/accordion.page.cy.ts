/// <reference types="cypress" />
import { TestBed } from '@angular/core/testing';
import { AccordionPage } from './accordion.page';

describe(AccordionPage.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(AccordionPage, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(AccordionPage);
  });
});
