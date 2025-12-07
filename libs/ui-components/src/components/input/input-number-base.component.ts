import { Directive } from '@angular/core';
import { NgtInputBase } from './input-base.component';

// Abstract base class for number-related inputs (decimal, currency)
@Directive()
export abstract class NgtInputNumberBase extends NgtInputBase {
  // Number mode type
  abstract readonly mode: () => 'decimal' | 'currency' | null;

  protected formatNumber(value: number): string {
    const modeValue = this.mode();
    if (modeValue === 'currency') {
      return this.formatCurrency(value);
    } else if (modeValue === 'decimal') {
      return value.toFixed(2);
    }
    return String(value);
  }

  protected formatCurrency(value: number): string {
    // This will be overridden in currency component
    return String(value);
  }

  override onBlur() {
    super.onBlur();
    // Format number on blur if in number mode
    if (this.type() === 'number' && this.mode() !== null) {
      this.formatNumberOnBlur();
    }
  }

  protected override updateDisplayValue() {
    if (this.type() === 'number' && this.mode() !== null) {
      const val = this._value();
      if (!val || val === 0) {
        this._displayValue.set('');
        return;
      }
      
      const numValue = typeof val === 'number' ? val : this.parseNumber(String(val));
      if (!isNaN(numValue) && numValue !== 0) {
        if (this.mode() === 'currency' || this.mode() === 'decimal') {
          this._displayValue.set(numValue.toFixed(2));
        } else {
          this._displayValue.set(String(numValue));
        }
      } else {
        this._displayValue.set('');
      }
    } else {
      super.updateDisplayValue();
    }
  }

  protected formatNumberOnBlur() {
    const input = this.inputElementRef?.nativeElement;
    const currentDisplay = input?.value?.trim() || this._displayValue().trim();
    
    if (currentDisplay === '' || currentDisplay === '-') {
      this._value.set('');
      this._displayValue.set('');
      this.onChange('');
      this.valueChange.emit('');
      return;
    }
    
    const numValue = this.parseNumber(currentDisplay);
    
    if (!isNaN(numValue) && numValue !== 0) {
      if (this.mode() === 'currency' || this.mode() === 'decimal') {
        this._displayValue.set(numValue.toFixed(2));
      } else {
        this._displayValue.set(String(numValue));
      }
      this._value.set(numValue);
      this.onChange(numValue);
      this.valueChange.emit(numValue);
    } else {
      // For 0, NaN, or invalid values, keep empty
      this._value.set('');
      this._displayValue.set('');
      this.onChange('');
      this.valueChange.emit('');
    }
  }

  override ngOnInit() {
    super.ngOnInit();

    // Ensure type is number for number mode inputs
    if (this.type() !== 'number') {
      console.warn(`${this.constructor.name} requires type="number". Setting type to number.`);
    }
  }
}
