import { Component, Input, signal, computed } from '@angular/core';

let tabIdCounter = 0;

@Component({
  selector: 'ui-tab',
  templateUrl: './tab.component.html'
})
export class TabComponent {
  @Input() label!: string;

  id = `tab-${tabIdCounter++}`;
  isActive = signal(false);

  buttonId = computed(() => `${this.id}-button`);
  panelId = computed(() => `${this.id}-panel`);
}
