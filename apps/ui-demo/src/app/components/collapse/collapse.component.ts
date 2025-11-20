import { Component, signal } from '@angular/core';
import { ButtonComponent, CollapseComponent } from '@ng-tailwind/ui-components';

@Component({
  selector: 'section.collapse',
  imports: [ButtonComponent, CollapseComponent],
  templateUrl: './collapse.component.html'
})
export class CollapseDemoComponent {
  collapseOpen = signal(false);
  horizontalCollapseOpen = signal(false);
}

