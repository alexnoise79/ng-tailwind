import { Component, signal, computed, input } from '@angular/core';

let tabIdCounter = 0;

@Component({
  selector: 'ui-tab',
  templateUrl: './tab.component.html'
})
export class TabComponent {
  readonly label = input.required<string>();

  id = `tab-${tabIdCounter++}`;
  isActive = signal(false);

  buttonId = computed(() => `${this.id}-button`);
  panelId = computed(() => `${this.id}-panel`);
}
