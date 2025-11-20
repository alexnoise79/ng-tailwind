import { Component, Input, signal, computed } from '@angular/core';

let tabIdCounter = 0;

@Component({
  selector: 'ui-tab',
  standalone: true,
  template: `
    <div
      [id]="panelId()"
      [attr.aria-labelledby]="buttonId()"
      [attr.role]="'tabpanel'"
      [attr.hidden]="!isActive() ? true : null"
      class="p-4"
    >
      <ng-content />
    </div>
  `,
})
export class TabComponent {
  @Input() label!: string;

  id = `tab-${tabIdCounter++}`;
  isActive = signal(false);

  buttonId = computed(() => `${this.id}-button`);
  panelId = computed(() => `${this.id}-panel`);
}

