import { Directive } from '@angular/core';

@Directive({
  selector: '[ngtAccordionBody]',
  host: {
    '[class.p-4]': 'true',
    '[class.text-gray-600]': 'true',
    '[class.dark:text-gray-300]': 'true'
  }
})
export class NgtAccordionBody {}
