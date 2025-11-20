import { Component } from '@angular/core';
import { AccordionComponent, AccordionItemComponent } from '@ng-tailwind/ui-components';

@Component({
  selector: 'section.accordion',
  imports: [AccordionComponent, AccordionItemComponent],
  templateUrl: './accordion.component.html'
})
export class AccordionDemoComponent {}

