import { Directive, inject } from '@angular/core';
import { NgtAccordionItem } from './accordion-item.directive';

@Directive({
  selector: '[ngtAccordionCollapse]',
  standalone: true,
  host: {
    '[id]': 'id',
    '[attr.aria-labelledby]': 'ariaLabelledBy',
    '[attr.role]': 'role',
    '[class.max-h-0]': 'isCollapsed',
    '[class.max-h-[1000px]]': 'isExpanded',
    '[class.overflow-hidden]': 'true',
    '[class.transition-all]': 'true',
    '[class.duration-300]': 'true'
  }
})
export class NgtAccordionCollapse {
  private accordionItem = inject(NgtAccordionItem, { optional: true });

  get id(): string {
    return this.accordionItem?.contentId() || '';
  }

  get ariaLabelledBy(): string {
    return this.accordionItem?.buttonId() || '';
  }

  get role(): string {
    return 'region';
  }

  get isCollapsed(): boolean {
    return !this.accordionItem?.isOpen();
  }

  get isExpanded(): boolean {
    return this.accordionItem?.isOpen() || false;
  }
}

