import { Component, Input, signal, computed, input, output, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { classMerge } from '../../utils';
import { Size } from '../../models';

export type PasswordStrength = 0 | 1 | 2 | 3 | 4 | 5;

@Component({
  selector: 'ngt-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './password.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgtPassword),
      multi: true
    }
  ]
})
export class NgtPassword implements ControlValueAccessor {
  // Inputs
  readonly size = input<Size>('md');
  readonly disabled = input<boolean>(false);
  readonly placeholder = input<string>('');
  readonly showStrength = input<boolean>(false);

  @Input() set value(val: string | null) {
    if (val !== this._value()) {
      this._value.set(val ?? '');
      this.updateStrength();
    }
  }
  private _value = signal<string>('');

  // Outputs
  readonly valueChange = output<string>();

  // ViewChild
  @ViewChild('inputElement') inputElementRef!: ElementRef<HTMLInputElement>;

  // Internal state
  private _showPassword = signal(false);
  private _strength = signal<PasswordStrength>(0);

  // ControlValueAccessor callbacks
  private onChange = (_value: string) => {};
  private onTouched = () => {};

  // Computed values
  isDisabled = computed(() => this.disabled());
  showPassword = computed(() => this._showPassword());
  strength = computed(() => this._strength());
  passwordValue = computed(() => this._value());
  strengthLevel = computed(() => {
    const s = this._strength();
    if (s === 0) return 'Very Weak';
    if (s === 1) return 'Weak';
    if (s === 2) return 'Fair';
    if (s === 3) return 'Good';
    if (s === 4) return 'Strong';
    return 'Very Strong';
  });

  inputClasses = computed(() => {
    const base = 'w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    const sizeClasses = {
      sm: 'px-2.5 py-1.5 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-2.5 text-lg'
    };
    return classMerge(base, sizeClasses[this.size()]);
  });

  inputGroupClasses = computed(() => {
    const base = 'relative flex rounded-md shadow-sm';
    return classMerge(base);
  });

  toggleButtonClasses = computed(() => {
    const base = 'inline-flex items-center px-3 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:z-10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    };
    return classMerge(base, sizeClasses[this.size()]);
  });

  strengthBarClasses = computed(() => {
    const strength = this._strength();
    const base = 'h-1 rounded transition-all';
    const colors = {
      0: 'bg-gray-200 dark:bg-gray-700',
      1: 'bg-red-500',
      2: 'bg-orange-500',
      3: 'bg-yellow-500',
      4: 'bg-blue-500',
      5: 'bg-green-500'
    };
    return classMerge(base, colors[strength as keyof typeof colors] || colors[0]);
  });

  strengthTextClasses = computed(() => {
    const strength = this._strength();
    const base = 'text-xs font-medium mt-1';
    const colors = {
      0: 'text-gray-500 dark:text-gray-400',
      1: 'text-red-600 dark:text-red-400',
      2: 'text-orange-600 dark:text-orange-400',
      3: 'text-yellow-600 dark:text-yellow-400',
      4: 'text-blue-600 dark:text-blue-400',
      5: 'text-green-600 dark:text-green-400'
    };
    return classMerge(base, colors[strength as keyof typeof colors] || colors[0]);
  });

  private updateStrength() {
    if (!this.showStrength()) {
      this._strength.set(0);
      return;
    }

    const password = this._value();
    if (!password) {
      this._strength.set(0);
      return;
    }

    let score = 0;

    // Length checks
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // Character variety checks
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    // Cap at 5
    this._strength.set(Math.min(score, 5) as PasswordStrength);
  }

  togglePasswordVisibility() {
    if (this.isDisabled()) return;
    this._showPassword.update(val => !val);
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this._value.set(value);
    this.updateStrength();
    this.onChange(value);
    this.valueChange.emit(value);
  }

  onBlur() {
    this.onTouched();
  }

  // ControlValueAccessor implementation
  writeValue(value: string | null) {
    this._value.set(value ?? '');
    this.updateStrength();
  }

  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean) {
    // Disabled state is handled by the disabled input signal
    void _isDisabled; // Explicitly mark as intentionally unused
  }
}
