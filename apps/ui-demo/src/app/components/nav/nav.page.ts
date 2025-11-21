import { Component } from '@angular/core';
import { NgtNav, NgtNavItem } from '@ng-tailwind/ui-components';

@Component({
  selector: 'section.nav',
  imports: [NgtNav, NgtNavItem],
  templateUrl: './nav.page.html'
})
export class NavPage {}

