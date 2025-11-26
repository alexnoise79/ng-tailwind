import { Component, forwardRef, effect, OnInit, computed, input, output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputType } from './input-base.component';
import { NgtInputNumberBase } from './input-number-base.component';
import { classMerge } from '../../utils';
import { Size } from '../../models';

@Component({
  selector: 'ngt-input[currency], ngt-input[mode="currency"]',
  imports: [FormsModule],
  templateUrl: './input-currency.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgtInputCurrency),
      multi: true
    }
  ]
})
export class NgtInputCurrency extends NgtInputNumberBase implements OnInit {
  // Core inputs
  readonly type = input<InputType>('number');
  readonly size = input<Size>('md');
  readonly disabled = input<boolean>(false);
  readonly placeholder = input<string>('');
  readonly showClear = input<boolean>(false);
  readonly filter = input<Array<string> | RegExp | null>(null);
  
  // Currency-specific inputs
  readonly currency = input<string>('USD');
  readonly mode = input<'currency'>('currency');

  // Outputs
  readonly valueChange = output<string | number>();

  isCurrencyMode = computed(() => this.mode() === 'currency');

  override get inputClasses() {
    return computed(() => {
    const base = 'w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    const sizeClasses = {
      sm: 'px-2.5 py-1.5 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-2.5 text-lg'
    };
    const numberInputClasses = '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none';
      return classMerge(base, sizeClasses[this.size()], numberInputClasses, 'rounded-r-none border-r-0 focus:ring-0 focus:border-transparent');
    });
  }

  constructor() {
    super();
    // Effect to validate currency is required when mode is currency
    effect(() => {
      if (this.mode() === 'currency') {
        const currencyValue = this.currency();
        if (!currencyValue || currencyValue.trim() === '') {
          console.warn('Currency is required when mode is "currency". Defaulting to "USD".');
        }
      }
    });
  }

  override ngOnInit() {
    super.ngOnInit();
    
    // Validate currency is required when mode is currency
    if (this.mode() === 'currency') {
      const currencyValue = this.currency();
      if (!currencyValue || currencyValue.trim() === '') {
        throw new Error('Currency is required when mode is "currency". Please provide a currency value.');
      }
    }
  }

  protected override formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.currency()
    }).format(value);
  }

  protected override handleNormalInput(value: string) {
    // Update display value
    this._displayValue.set(value);
    const modelValue = this.getModelValue(value);

    // For number type, convert to number
    const numValue = this.parseNumber(modelValue);
    this._value.set(numValue);
    this.onChange(numValue);
    this.valueChange.emit(numValue);
  }
}

