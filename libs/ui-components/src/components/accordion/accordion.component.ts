import { Component, Input, signal, Signal, WritableSignal } from '@angular/core';
import { AccordionItemComponent } from './accordion-item.component';

@Component({
  selector: 'ui-accordion',
  standalone: true,
  imports: [AccordionItemComponent],
  templateUrl: './accordion.component.html',
  providers: [AccordionComponent]
})
export class AccordionComponent {
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
