import { Component, Input, signal, Signal, WritableSignal, input } from '@angular/core';

@Component({
  selector: 'ngt-collapse',
  templateUrl: './collapse.component.html',
  host: {
    '[attr.aria-expanded]': 'isOpen()',
    '[class.show]': 'isOpen()'
  }
})
export class NgtCollapse {
  @Input() set isOpen(value: boolean | WritableSignal<boolean>) {
    if (typeof value === 'boolean') {
      this._isOpen.set(value);
    } else {
      this._isOpen = value;
    }
  }
  private _isOpen: WritableSignal<boolean> = signal(false);
  
  readonly horizontal = input(false);

  get isOpen(): Signal<boolean> {
    return this._isOpen;
  }
}

