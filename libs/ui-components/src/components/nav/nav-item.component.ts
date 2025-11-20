import { Component, signal, computed, input, output, effect, AfterContentInit } from '@angular/core';

let navItemIdCounter = 0;

@Component({
  selector: 'ui-nav-item',
  template: '<ng-content />'
})
export class NavItemComponent implements AfterContentInit {
  readonly itemId = input<string | null>(null);
  readonly label = input.required<string>();
  readonly disabled = input<boolean>(false);

  activated = output<void>();

  id: string;
  isActive = signal(false);

  constructor() {
    this.id = `nav-item-${navItemIdCounter++}`;

    // Emit activated event when item becomes active
    effect(() => {
      if (this.isActive()) {
        this.activated.emit();
      }
    });
  }

  ngAfterContentInit(): void {
    const itemIdValue = this.itemId();
    if (itemIdValue) {
      this.id = itemIdValue;
    }
  }

  buttonId = computed(() => `${this.id}-button`);
}

