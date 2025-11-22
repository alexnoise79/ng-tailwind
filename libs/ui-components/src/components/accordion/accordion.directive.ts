import { Directive, Input, signal, Signal, WritableSignal, computed, HostBinding } from '@angular/core';

@Directive({
  selector: '[ngtAccordion]',
  exportAs: 'NgtAccordion',
  standalone: true,
  providers: [NgtAccordion]
})
export class NgtAccordion {
  @HostBinding('class.border')
  get border(): boolean {
    return true;
  }

  @HostBinding('class.border-gray-200')
  get borderColor(): boolean {
    return true;
  }

  @HostBinding('class.dark:border-gray-700')
  get darkBorderColor(): boolean {
    return true;
  }

  @HostBinding('class.rounded-lg')
  get rounded(): boolean {
    return true;
  }

  @HostBinding('class.divide-y')
  get divideY(): boolean {
    return true;
  }

  @HostBinding('class.divide-gray-200')
  get divideColor(): boolean {
    return true;
  }

  @HostBinding('class.dark:divide-gray-700')
  get darkDivideColor(): boolean {
    return true;
  }
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

