import { Directive, Input, signal, Signal, WritableSignal } from '@angular/core';

@Directive({
  selector: '[ngtAccordion]',
  exportAs: 'NgtAccordion',
  standalone: true,
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
  @Input() set multiOpen(value: boolean | WritableSignal<boolean>) {
    if (typeof value === 'boolean') {
      this._multiOpen.set(value);
    } else {
      this._multiOpen = value;
    }
  }
  private _multiOpen: WritableSignal<boolean> = signal(false);
  private openItems = signal<Set<string>>(new Set());

  get multiOpen(): Signal<boolean> {
    return this._multiOpen;
  }

  isItemOpen(id: string): boolean {
    return this.openItems().has(id);
  }

  toggleItem(id: string): void {
    const current = new Set(this.openItems());
    if (this.multiOpen()) {
      if (current.has(id)) {
        current.delete(id);
      } else {
        current.add(id);
      }
    } else {
      // Single open mode: if clicking the same item, close it; otherwise open the new one
      if (current.has(id)) {
        current.clear();
      } else {
        current.clear();
        current.add(id);
      }
    }
    this.openItems.set(current);
  }
}

