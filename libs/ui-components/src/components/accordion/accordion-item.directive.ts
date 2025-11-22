import { Directive, inject, signal, computed, input, Optional, HostBinding } from '@angular/core';
import { NgtAccordion } from './accordion.directive';

let itemIdCounter = 0;

@Directive({
  selector: '[ngtAccordionItem]',
  exportAs: 'NgtAccordionItem',
  standalone: true,
  host: {
    '[class.accordion-item]': 'true'
  }
})
export class NgtAccordionItem {
  readonly itemId = input<string>();
  readonly collapsed = input<boolean>(true);

  private accordion = inject(NgtAccordion, { optional: true });
  private id = `accordion-item-${itemIdCounter++}`;
  private _isOpen = signal(!this.collapsed());

  buttonId = computed(() => `${this.id}-button`);
  contentId = computed(() => `${this.id}-content`);

  isOpen = computed(() => {
    if (this.accordion) {
      return this.accordion.isItemOpen(this.id);
    }
    return this._isOpen();
  });

  toggle(): void {
    if (this.accordion) {
      this.accordion.toggleItem(this.id);
    } else {
      this._isOpen.update(val => !val);
    }
  }
}

