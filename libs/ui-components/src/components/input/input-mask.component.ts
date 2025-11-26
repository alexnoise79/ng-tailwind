import { Component, forwardRef, effect, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgtInputBase, InputType } from './input-base.component';
import { Size } from '../../models';

@Component({
  selector: 'ngt-input[mask]',
  imports: [CommonModule, FormsModule],
  templateUrl: './input-base.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgtInputMask),
      multi: true
    }
  ]
})
export class NgtInputMask extends NgtInputBase {
  // Core inputs
  readonly type = input<InputType>('text');
  readonly size = input<Size>('md');
  readonly disabled = input<boolean>(false);
  readonly placeholder = input<string>('');
  readonly showClear = input<boolean>(false);
  readonly filter = input<Array<string> | RegExp | null>(null);
  
  // Mask-specific inputs
  readonly mask = input<string | null>(null);

  // Outputs
  readonly valueChange = output<string | number>();

  constructor() {
    super();
    // Effect to apply mask
    effect(() => {
      if (this.mask() !== null) {
        this.updateDisplayValue();
      }
    });
  }

  override ngOnInit() {
    super.ngOnInit();
    
    // Mask doesn't work with number type
    if (this.type() === 'number' && this.mask() !== null) {
      console.warn('Mask input does not work with type="number". Consider using type="text".');
    }
  }

  protected override updateDisplayValue() {
    const val = this._value();
    if (val === null || val === undefined) {
      this._displayValue.set('');
      return;
    }

    const stringValue = String(val);

    // Apply mask if provided
    if (this.mask() !== null && this.mask()) {
      this._displayValue.set(this.applyMask(stringValue, this.mask()!));
    } else {
      this._displayValue.set(stringValue);
    }
  }

  private applyMask(value: string, mask: string): string {
    // Mask format:
    // - 9 = digit (0-9)
    // - a = alpha (a-z, A-Z)
    // - * = any character
    // - any other character = literal character to insert

    let masked = '';
    let valueIndex = 0;

    for (let i = 0; i < mask.length && valueIndex < value.length; i++) {
      const maskChar = mask[i];

      if (maskChar === '9' || maskChar === 'a' || maskChar === '*') {
        const regex = maskChar === '9' ? /\d/ : maskChar === 'a' ? /[a-zA-Z]/ : /./;
        if (regex.test(value[valueIndex])) {
          masked += value[valueIndex];
          valueIndex++;
        } else {
          // Skip non-matching characters
          valueIndex++;
          i--; // Stay on current mask position
        }
      } else {
        // Literal character - insert it
        masked += maskChar;
        // If the current value character matches the literal, consume it
        if (valueIndex < value.length && value[valueIndex] === maskChar) {
          valueIndex++;
        }
      }
    }

    return masked;
  }

  protected override getModelValue(displayValue: string): string {
    // Remove mask characters for model
    if (this.mask() !== null && this.mask()) {
      const mask = this.mask()!;
      // Extract only the characters that match mask placeholders (9, a, *)
      let modelValue = '';
      let displayIndex = 0;

      for (let i = 0; i < mask.length && displayIndex < displayValue.length; i++) {
        if (mask[i] === '9' || mask[i] === 'a' || mask[i] === '*') {
          // This is a placeholder, include the character in model
          if (displayIndex < displayValue.length) {
            modelValue += displayValue[displayIndex];
            displayIndex++;
          }
        } else {
          // This is a literal character, skip it in model
          if (displayIndex < displayValue.length && displayValue[displayIndex] === mask[i]) {
            displayIndex++;
          }
        }
      }

      return modelValue;
    }
    return displayValue;
  }

  protected override handleNormalInput(value: string) {
    // Apply mask if provided (before filter, so mask format is respected)
    if (this.mask() !== null && this.mask() && this.type() !== 'number') {
      value = this.applyMask(value, this.mask()!);
      if (this.inputElementRef) {
        this.inputElementRef.nativeElement.value = value;
      }
    }

    super.handleNormalInput(value);
  }
}

