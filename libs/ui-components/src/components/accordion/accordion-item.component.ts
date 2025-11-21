import { Component, inject, signal, computed, input } from '@angular/core';
import { NgtAccordion } from './accordion.component';

let itemIdCounter = 0;

@Component({
  selector: 'ngt-accordion-item',
  templateUrl: './accordion-item.component.html'
})
export class NgtAccordionItem {
  readonly title = input.required<string>();

  private accordion = inject(NgtAccordion, { optional: true });
  private id = `accordion-item-${itemIdCounter++}`;
  private _isOpen = signal(false);

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
