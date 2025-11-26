import { Component, forwardRef, computed, input, output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgtInputBase } from './input-base.component';
import { Size } from '../../models';
import { InputType } from './input-base.component';

@Component({
  selector: 'ngt-input:not([currency]):not([mode]):not([mask]):not([chip]):not([autocomplete]):not([completeMethod])',
  imports: [FormsModule],
  templateUrl: './input-base.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgtInputBasic),
      multi: true
    }
  ]
})
export class NgtInputBasic extends NgtInputBase {
  // Core inputs
  readonly type = input<InputType>('text');
  readonly size = input<Size>('md');
  readonly disabled = input<boolean>(false);
  readonly placeholder = input<string>('');
  readonly showClear = input<boolean>(false);
  readonly filter = input<Array<string> | RegExp | null>(null);

  // Outputs
  readonly valueChange = output<string | number>();

  override get inputClasses() {
    return computed(() => this.getInputClasses());
  }
}

