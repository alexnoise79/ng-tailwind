import { Component, Input, signal, computed, input } from '@angular/core';
import { OutsideClickDirective } from '../../directives';

export type DropdownAlign = 'left' | 'right';

@Component({
  selector: 'ui-dropdown',
  imports: [OutsideClickDirective],
  templateUrl: './dropdown.component.html'
})
export class DropdownComponent {
  @Input() set align(value: DropdownAlign) {
    this._align.set(value);
  }
  private _align = signal<DropdownAlign>('left');
  alignValue = computed(() => this._align());

  readonly isOpen = input(signal(false));

  toggle(): void {
    this.isOpen().update(val => !val);
  }

  close(): void {
    this.isOpen().set(false);
  }

  open(): void {
    this.isOpen().set(true);
  }
}
