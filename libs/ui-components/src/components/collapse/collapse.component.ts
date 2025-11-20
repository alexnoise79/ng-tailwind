import { Component, Input, signal, Signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'ui-collapse',
  templateUrl: './collapse.component.html',
  host: {
    '[attr.aria-expanded]': 'isOpen()',
    '[class.show]': 'isOpen()'
  }
})
export class CollapseComponent {
  @Input() set isOpen(value: boolean | WritableSignal<boolean>) {
    if (typeof value === 'boolean') {
      this._isOpen.set(value);
    } else {
      this._isOpen = value;
    }
  }
  private _isOpen: WritableSignal<boolean> = signal(false);
  
  @Input() horizontal = false;

  get isOpen(): Signal<boolean> {
    return this._isOpen;
  }
}

