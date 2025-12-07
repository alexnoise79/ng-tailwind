import { Component, Input, signal, computed, input, ViewEncapsulation } from '@angular/core';
import { OutsideClickDirective } from '../../directives';

export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

@Component({
  selector: 'ngt-dropdown',
  imports: [OutsideClickDirective],
  templateUrl: './dropdown.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NgtDropdown {
  @Input() set placement(value: DropdownPlacement) {
    this._placement.set(value);
  }
  private _placement = signal<DropdownPlacement>('bottom-start');
  placementValue = computed(() => this._placement());

  readonly isOpen = input(signal(false));

  toggle() {
    this.isOpen().update(val => !val);
  }

  close() {
    this.isOpen().set(false);
  }

  open() {
    this.isOpen().set(true);
  }
}
