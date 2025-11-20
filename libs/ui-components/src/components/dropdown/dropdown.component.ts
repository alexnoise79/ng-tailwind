import {
  Component,
  Input,
  signal,
  computed,
} from '@angular/core';
import { OutsideClickDirective } from '../../directives';

export type DropdownAlign = 'left' | 'right';

@Component({
  selector: 'ui-dropdown',
  standalone: true,
  imports: [OutsideClickDirective],
  template: `
    <div class="relative inline-block">
      <ng-content select="[ui-dropdown-trigger]" />
      @if (isOpen()) {
        <div
          #dropdownContent
          uiOutsideClick
          (uiOutsideClick)="close()"
          class="absolute z-50 mt-1"
          [class.left-0]="alignValue() === 'left'"
          [class.right-0]="alignValue() === 'right'"
        >
          <ng-content select="[ui-dropdown-content]" />
        </div>
      }
    </div>
  `,
})
export class DropdownComponent {
  @Input() set align(value: DropdownAlign) {
    this._align.set(value);
  }
  private _align = signal<DropdownAlign>('left');
  alignValue = computed(() => this._align());
  
  @Input() isOpen = signal(false);

  toggle(): void {
    this.isOpen.update((val) => !val);
  }

  close(): void {
    this.isOpen.set(false);
  }

  open(): void {
    this.isOpen.set(true);
  }
}

