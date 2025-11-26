import { Directive, inject, computed } from '@angular/core';
import { NgtAccordionItem } from './accordion-item.directive';

@Directive({
  selector: '[ngtAccordionCollapse]',
  host: {
    '[class.overflow-hidden]': 'true',
    '[class.transition-all]': 'true',
    '[class.duration-300]': 'true',
    '[style.max-height.px]': 'maxHeight()'
  }
})
export class NgtAccordionCollapse {
  private accordionItem = inject(NgtAccordionItem, { optional: true });

  maxHeight = computed(() => {
    return this.accordionItem?.isOpen() ? 1000 : 0;
  });
}
