import { TestBed } from '@angular/core/testing';
import { ThemeConfiguratorComponent } from './theme-configurator.component';

describe(ThemeConfiguratorComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(ThemeConfiguratorComponent, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(ThemeConfiguratorComponent);
  });
});
