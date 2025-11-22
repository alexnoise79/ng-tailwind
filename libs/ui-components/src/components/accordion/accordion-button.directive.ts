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
    '[class.hover:bg-gray-50]': '!isDisabled',
    '[class.dark:hover:bg-gray-800]': '!isDisabled',
    '[class.focus:outline-none]': 'true',
    '[class.focus:ring-2]': '!isDisabled',
    '[class.focus:ring-primary-500]': '!isDisabled',
    '[class.focus:ring-inset]': '!isDisabled',
    '[class.transition-colors]': 'true',
    '[class.opacity-50]': 'isDisabled',
    '[class.cursor-not-allowed]': 'isDisabled',
    '[class.cursor-pointer]': '!isDisabled',
    '[id]': 'id',
    '[attr.aria-expanded]': 'ariaExpanded',
    '[attr.aria-controls]': 'ariaControls',
    '[attr.aria-disabled]': 'isDisabled',
    '[attr.disabled]': 'isDisabled || null',
    '[type]': 'type'
  }
})
export class NgtAccordionButton {
  private accordionItem = inject(NgtAccordionItem, { optional: true });

  get isDisabled(): boolean {
    return this.accordionItem?.disabled() || false;
  }

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

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this.isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.accordionItem?.toggle();
  }

  get isOpen(): boolean {
    return this.accordionItem?.isOpen() || false;
  }
}

