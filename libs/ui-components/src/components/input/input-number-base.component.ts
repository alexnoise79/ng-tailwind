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
      // If input is focused, don't update displayValue at all
      // The handleNormalInput method keeps it in sync, and we don't want writeValue to interfere
      const input = this.inputElementRef?.nativeElement;
      if (input && document.activeElement === input) {
        return;
      }
      
      // When not focused, format the value normally
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
    // Always read from the actual input element to get the most current value
    const currentDisplay = input?.value?.trim() || '';
    
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

  protected override handleNormalInput(value: string) {
    // For number inputs with mode, preserve raw input during typing to allow partial decimals
    if (this.type() === 'number' && this.mode() !== null) {
      const input = this.inputElementRef?.nativeElement;
      if (!input) {
        super.handleNormalInput(value);
        return;
      }
      
      // Always use the actual DOM value to ensure we have the correct value
      const actualValue = input.value;
      
      // CRITICAL: Only update displayValue if it's different to minimize [value] binding resets
      // Use requestAnimationFrame to update after the current input event completes
      // This prevents the binding from interfering with the user's typing
      if (this._displayValue() !== actualValue) {
        requestAnimationFrame(() => {
          const currentInput = this.inputElementRef?.nativeElement;
          if (currentInput && document.activeElement === currentInput && currentInput.value !== this._displayValue()) {
            this._displayValue.set(currentInput.value);
          }
        });
      }
      
      // Update model value
      if (actualValue && actualValue.trim() !== '' && !actualValue.endsWith('.')) {
        const numValue = this.parseNumber(actualValue);
        if (!isNaN(numValue) && numValue !== 0) {
          this._value.set(numValue);
          this.onChange(numValue);
          this.valueChange.emit(numValue);
        } else {
          this._value.set('');
          this.onChange('');
          this.valueChange.emit('');
        }
      } else if (actualValue && actualValue.trim() !== '' && actualValue.endsWith('.')) {
        // For incomplete decimals like "100.", keep the numeric part in model
        const numValue = this.parseNumber(actualValue);
        if (!isNaN(numValue) && numValue !== 0) {
          this._value.set(numValue);
          this.onChange(numValue);
          this.valueChange.emit(numValue);
        }
      } else {
        // Empty input
        this._value.set('');
        this.onChange('');
        this.valueChange.emit('');
      }
    } else {
      // Use base class implementation for other types
      super.handleNormalInput(value);
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
