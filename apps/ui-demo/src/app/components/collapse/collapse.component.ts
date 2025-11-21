import { Component, signal } from '@angular/core';
import { NgtButton, NgtCollapse } from '@ng-tailwind/ui-components';

@Component({
  selector: 'section.collapse',
  imports: [NgtButton, NgtCollapse],
  templateUrl: './collapse.component.html'
})
export class CollapseDemoComponent {
  collapseOpen = signal(false);
  horizontalCollapseOpen = signal(false);
}

