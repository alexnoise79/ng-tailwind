import { Component } from '@angular/core';
import { NgtAccordion, NgtAccordionItem } from '@ng-tailwind/ui-components';

@Component({
  selector: 'section.accordion',
  imports: [NgtAccordion, NgtAccordionItem],
  templateUrl: './accordion.component.html'
})
export class AccordionDemoComponent {}

