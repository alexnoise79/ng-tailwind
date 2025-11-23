import { Directive, inject, signal, computed, input } from '@angular/core';
import { NgtAccordion } from './accordion.directive';

let itemIdCounter = 0;

@Directive({
  selector: '[ngtAccordionItem]',
  exportAs: 'NgtAccordionItem',
  standalone: true
})
export class NgtAccordionItem {
  readonly disabled = input<boolean>(false);

  private accordion = inject(NgtAccordion, { optional: true });
  private id = `item-${itemIdCounter++}`;
  private _isOpen = signal(false);

  isOpen = computed(() => {
    if (this.accordion) {
      return this.accordion.openItems().has(this.id);
    }
    return this._isOpen();
  });

  toggle(): void {
    if (this.disabled()) {
      return;
    }
    if (this.accordion) {
      this.accordion.toggleItem(this.id);
    } else {
      this._isOpen.update(val => !val);
    }
  }
}
