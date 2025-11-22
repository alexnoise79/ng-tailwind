import { Directive, HostBinding, inject } from '@angular/core';
import { NgtAccordionItem } from './accordion-item.directive';

@Directive({
  selector: '[ngtAccordionCollapse]',
  standalone: true
})
export class NgtAccordionCollapse {
  private accordionItem = inject(NgtAccordionItem, { optional: true });

  @HostBinding('id')
  get id(): string {
    return this.accordionItem?.contentId() || '';
  }

  @HostBinding('attr.aria-labelledby')
  get ariaLabelledBy(): string {
    return this.accordionItem?.buttonId() || '';
  }

  @HostBinding('attr.role')
  get role(): string {
    return 'region';
  }

  @HostBinding('class.max-h-0')
  get isCollapsed(): boolean {
    return !this.accordionItem?.isOpen();
  }

  @HostBinding('class.max-h-[1000px]')
  get isExpanded(): boolean {
    return this.accordionItem?.isOpen() || false;
  }

  @HostBinding('class.overflow-hidden')
  get overflowHidden(): boolean {
    return true;
  }

  @HostBinding('class.transition-all')
  get transitionAll(): boolean {
    return true;
  }

  @HostBinding('class.duration-300')
  get duration300(): boolean {
    return true;
  }
}

