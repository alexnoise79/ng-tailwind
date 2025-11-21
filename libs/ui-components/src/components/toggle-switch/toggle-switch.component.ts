import { Component, Input, signal, computed, input, forwardRef, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { classMerge } from '../../utils';

@Component({
  selector: 'ngt-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgtToggleSwitch),
      multi: true
    }
  ]
})
export class NgtToggleSwitch implements ControlValueAccessor {
  @Input() set disabled(value: boolean) {
    this._disabled.set(value ?? false);
  }
  private _disabled = signal(false);

  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly label = input<string>();

  @ViewChild('checkbox', { static: true }) checkboxRef!: ElementRef<HTMLInputElement>;

  private _value = signal(false);
  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  isDisabled = computed(() => this._disabled());
  value = computed(() => this._value());

  toggleClasses = computed(() => {
    const baseClasses = 'relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const sizeClasses = {
      sm: 'h-4 w-7',
      md: 'h-5 w-9',
      lg: 'h-6 w-11'
    };
    const stateClasses = this.value() 
      ? 'bg-primary-600' 
      : 'bg-gray-200 dark:bg-gray-700';
    return classMerge(baseClasses, sizeClasses[this.size()], stateClasses);
  });

  thumbClasses = computed(() => {
    const baseClasses = 'inline-block rounded-full bg-white dark:bg-gray-200 shadow transform transition-transform';
    const sizeClasses = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5'
    };
    const translateClasses = this.value()
      ? {
          sm: 'translate-x-3',
          md: 'translate-x-4',
          lg: 'translate-x-5'
        }[this.size()]
      : 'translate-x-0';
    return classMerge(baseClasses, sizeClasses[this.size()], translateClasses);
  });

  labelClasses = computed(() => {
    return classMerge(
      'text-sm font-medium text-gray-700 dark:text-gray-300',
      this.isDisabled() ? 'opacity-50' : ''
    );
  });

  containerClasses = computed(() => {
    return classMerge(
      'inline-flex items-center gap-2',
      this.isDisabled() ? 'cursor-not-allowed' : 'cursor-pointer'
    );
  });

  toggle(event?: Event): void {
    if (this.isDisabled()) {
      return;
    }
    // Prevent label's default behavior of toggling the checkbox
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const newValue = !this._value();
    this._value.set(newValue);
    if (this.checkboxRef?.nativeElement) {
      this.checkboxRef.nativeElement.checked = newValue;
    }
    this.onChange(newValue);
    this.onTouched();
  }

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.checked;
    this._value.set(newValue);
    this.onChange(newValue);
    this.onTouched();
  }

  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this._value.set(value ?? false);
    if (this.checkboxRef?.nativeElement) {
      this.checkboxRef.nativeElement.checked = value ?? false;
    }
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }
}

