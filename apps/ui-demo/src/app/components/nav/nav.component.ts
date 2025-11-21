import { Component } from '@angular/core';
import { NgtNav, NgtNavItem } from '@ng-tailwind/ui-components';

@Component({
  selector: 'section.nav',
  imports: [NgtNav, NgtNavItem],
  templateUrl: './nav.component.html'
})
export class NavDemoComponent {}

