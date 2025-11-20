import { Component } from '@angular/core';
import { NavComponent, NavItemComponent } from '@ng-tailwind/ui-components';

@Component({
  selector: 'section.nav',
  imports: [NavComponent, NavItemComponent],
  templateUrl: './nav.component.html'
})
export class NavDemoComponent {}

