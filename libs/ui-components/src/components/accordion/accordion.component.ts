import { Component, Input, signal } from '@angular/core';
import { AccordionItemComponent } from './accordion-item.component';

@Component({
  selector: 'ui-accordion',
  standalone: true,
  imports: [AccordionItemComponent],
  templateUrl: './accordion.component.html',
  providers: [AccordionComponent]
})
export class AccordionComponent {
  @Input() multiOpen = signal(false);
  private openItems = signal<Set<string>>(new Set());

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
