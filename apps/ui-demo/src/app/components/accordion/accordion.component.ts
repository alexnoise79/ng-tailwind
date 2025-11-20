import { Component } from '@angular/core';
import { AccordionComponent, AccordionItemComponent } from '@ng-tailwind/ui-components';

@Component({
  selector: 'app-accordion',
  imports: [AccordionComponent, AccordionItemComponent],
  templateUrl: './accordion.component.html'
})
export class AccordionDemoComponent {}

