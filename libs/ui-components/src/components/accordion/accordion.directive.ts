import { Directive, input, signal } from '@angular/core';

@Directive({
  selector: '[ngtAccordion]',
  exportAs: 'NgtAccordion',
  host: {
    '[class.border]': 'true',
    '[class.border-gray-200]': 'true',
    '[class.dark:border-gray-700]': 'true',
    '[class.rounded-lg]': 'true',
    '[class.divide-y]': 'true',
    '[class.divide-gray-200]': 'true',
    '[class.dark:divide-gray-700]': 'true'
  }
})
export class NgtAccordion {
  readonly multiOpen = input<boolean>(false);
  openItems = signal<Set<string>>(new Set());

  toggleItem(id: string): void {
    this.openItems.update(current => {
      const newSet = new Set(current);
      if (this.multiOpen()) {
        // Multiple open mode: toggle the item
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
      } else {
        // Single open mode: clear and add only this item
        newSet.clear();
        if (!current.has(id)) {
          newSet.add(id);
        }
      }
      return newSet;
    });
  }
}
