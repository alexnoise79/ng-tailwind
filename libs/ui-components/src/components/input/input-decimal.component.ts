import { Component, forwardRef, input, output, ViewEncapsulation } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputType } from './input-base.component';
import { NgtInputNumberBase } from './input-number-base.component';
import { Size } from '../../models';

@Component({
  selector: 'ngt-input[mode="decimal"]',
  imports: [FormsModule],
  templateUrl: './input-base.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgtInputDecimal),
      multi: true
    }
  ]
})
export class NgtInputDecimal extends NgtInputNumberBase {
  // Core inputs
  readonly type = input<InputType>('number');
  readonly size = input<Size>('md');
  readonly disabled = input<boolean>(false);
  readonly placeholder = input<string>('');
  readonly showClear = input<boolean>(false);
  readonly filter = input<Array<string> | RegExp | null>(null);

  // Decimal-specific inputs
  readonly mode = input<'decimal'>('decimal');

  // Outputs
  readonly valueChange = output<string | number>();
}
