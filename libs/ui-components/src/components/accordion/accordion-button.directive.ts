import { Directive, HostListener, inject } from '@angular/core';
import { NgtAccordionItem } from './accordion-item.directive';

@Directive({
  selector: '[ngtAccordionButton]',
  standalone: true,
  host: {
    '[class.w-full]': 'true',
    '[class.flex]': 'true',
    '[class.items-center]': 'true',
    '[class.justify-between]': 'true',
    '[class.p-4]': 'true',
    '[class.text-left]': 'true',
    '[class.hover:bg-gray-50]': 'true',
    '[class.dark:hover:bg-gray-800]': 'true',
    '[class.focus:outline-none]': 'true',
    '[class.focus:ring-2]': 'true',
    '[class.focus:ring-primary-500]': 'true',
    '[class.focus:ring-inset]': 'true',
    '[class.transition-colors]': 'true',
    '[id]': 'id',
    '[attr.aria-expanded]': 'ariaExpanded',
    '[attr.aria-controls]': 'ariaControls',
    '[type]': 'type'
  }
})
export class NgtAccordionButton {
  private accordionItem = inject(NgtAccordionItem, { optional: true });

  get id(): string {
    return this.accordionItem?.buttonId() || '';
  }

  get ariaExpanded(): boolean {
    return this.accordionItem?.isOpen() || false;
  }

  get ariaControls(): string {
    return this.accordionItem?.contentId() || '';
  }

  get type(): string {
    return 'button';
  }

  @HostListener('click')
  onClick(): void {
    this.accordionItem?.toggle();
  }

  get isOpen(): boolean {
    return this.accordionItem?.isOpen() || false;
  }
}

