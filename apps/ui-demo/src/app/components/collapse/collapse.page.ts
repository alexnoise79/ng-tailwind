import { Component, signal } from '@angular/core';
import { NgtButton, NgtCollapse } from '@ng-tailwind/ui-components';

@Component({
  selector: 'section.collapse-demo',
  imports: [NgtButton, NgtCollapse],
  templateUrl: './collapse.page.html'
})
export class CollapsePage {
  collapseOpen = signal(false);
  horizontalCollapseOpen = signal(false);
}

