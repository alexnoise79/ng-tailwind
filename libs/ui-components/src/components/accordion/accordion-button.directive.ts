import { Directive, HostListener, inject, computed } from '@angular/core';
import { NgtAccordionItem } from './accordion-item.directive';

@Directive({
  selector: '[ngtAccordionButton]',
  host: {
    '[class.w-full]': 'true',
    '[class.flex]': 'true',
    '[class.items-center]': 'true',
    '[class.justify-between]': 'true',
    '[class.p-4]': 'true',
    '[class.text-left]': 'true',
    '[class.hover:bg-gray-50]': '!isDisabled()',
    '[class.dark:hover:bg-gray-800]': '!isDisabled()',
    '[class.focus:outline-none]': 'true',
    '[class.focus:ring-2]': '!isDisabled()',
    '[class.focus:ring-primary-500]': '!isDisabled()',
    '[class.focus:ring-inset]': '!isDisabled()',
    '[class.transition-colors]': 'true',
    '[class.opacity-50]': 'isDisabled()',
    '[class.cursor-not-allowed]': 'isDisabled()',
    '[class.cursor-pointer]': '!isDisabled()',
    '[attr.aria-expanded]': 'isOpen()',
    '[attr.aria-disabled]': 'isDisabled()',
    '[attr.disabled]': 'isDisabled() || null',
    '[type]': '"button"'
  }
})
export class NgtAccordionButton {
  private accordionItem = inject(NgtAccordionItem, { optional: true });

  isDisabled = computed(() => this.accordionItem?.disabled() || false);
  isOpen = computed(() => this.accordionItem?.isOpen() || false);

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (this.isDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.accordionItem?.toggle();
  }
}
