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

  protected formatNumberOnBlur() {
    const numValue = this.parseNumber(this._displayValue());
    if (!isNaN(numValue) && numValue !== 0) {
      const formatted = this.formatNumber(numValue);
      this._displayValue.set(formatted);
      // Update the value to match formatted display
      this._value.set(numValue);
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

