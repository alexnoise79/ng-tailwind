import { Input, signal, computed, ViewChild, ElementRef, OnInit, OnDestroy, effect, HostListener, Directive } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { classMerge } from '../../utils';
import { Size } from '../../models';

export type InputType = 'text' | 'number' | 'email' | 'tel';

// Abstract base class - using empty Directive decorator to satisfy Angular linter
@Directive()
export abstract class NgtInputBase implements ControlValueAccessor, OnInit, OnDestroy {
  // Core inputs - to be defined in subclasses with input() signals
  abstract readonly type: () => InputType;
  abstract readonly size: () => Size;
  abstract readonly disabled: () => boolean;
  abstract readonly placeholder: () => string;
  abstract readonly showClear: () => boolean;
  abstract readonly filter: () => Array<string> | RegExp | null;

  @Input() set value(val: string | number | null) {
    if (val !== this._value()) {
      this._value.set(val ?? '');
      this.updateDisplayValue();
    }
  }
  protected _value = signal<string | number>('');

  // Outputs - to be defined in subclasses with output() signals
  abstract readonly valueChange: { emit: (value: string | number) => void };

  // ViewChild
  @ViewChild('inputElement') inputElementRef!: ElementRef<HTMLInputElement>;

  // Internal state
  protected _displayValue = signal<string>('');

  // ControlValueAccessor callbacks
  protected onChange = (_value: string | number) => {};
  protected onTouched = () => {};

  // Computed values
  displayValue = computed(() => this._displayValue());
  isDisabled = computed(() => this.disabled());
  hasValue = computed(() => {
    const val = this._value();
    return val !== null && val !== undefined && val !== '';
  });

  protected getInputClasses(): string {
    const base = 'w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    const sizeClasses = {
      sm: 'px-2.5 py-1.5 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-2.5 text-lg'
    };
    // Hide native number input spinners
    const numberInputClasses = this.type() === 'number' ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' : '';
    return classMerge(base, sizeClasses[this.size()], numberInputClasses);
  }

  // For subclasses to override
  get inputClasses() {
    return computed(() => this.getInputClasses());
  }

  constructor() {
    // Effect to handle filter changes
    effect(() => {
      if (this.getFilter() !== null) {
        this.updateDisplayValue();
      }
    });
  }

  protected getFilter(): Array<string> | RegExp | null {
    return this.filter();
  }

  ngOnInit() {
    this.updateDisplayValue();
  }

  ngOnDestroy() {
    // Override in subclasses if needed
    void 0; // Prevent empty method warning
  }

  // Value handling
  protected updateDisplayValue() {
    const val = this._value();
    if (val === null || val === undefined) {
      this._displayValue.set('');
      return;
    }

    const stringValue = String(val);
    this._displayValue.set(stringValue);
  }

  protected getModelValue(displayValue: string): string {
    return displayValue;
  }

  // Event handlers
  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    let value = target.value;

    // Auto-filter tel inputs to only allow numbers and common tel characters
    if (this.type() === 'tel') {
      value = this.filterTelInput(value);
      target.value = value;
    }

    // Apply filter if provided
    const filter = this.getFilter();
    if (filter !== null) {
      value = this.applyFilter(value, filter);
      target.value = value;
    }

    this.handleNormalInput(value);
  }

  protected filterTelInput(value: string): string {
    // Remove all invalid characters first
    value = value.replace(/[^\d+\-()\s]/g, '');
    // Remove plus signs that are not at the beginning
    if (value.length > 0 && value[0] === '+') {
      // Keep the first plus, remove all others
      value = '+' + value.slice(1).replace(/\+/g, '');
    } else {
      // Remove all plus signs if there's no plus at the beginning
      value = value.replace(/\+/g, '');
    }
    return value;
  }

  protected applyFilter(value: string, filter: Array<string> | RegExp): string {
    if (!filter) return value;

    if (Array.isArray(filter)) {
      // Array of allowed characters
      return value
        .split('')
        .filter(char => filter.includes(char))
        .join('');
    } else if (filter instanceof RegExp) {
      // Regex filter
      return value
        .split('')
        .filter(char => filter.test(char))
        .join('');
    }

    return value;
  }

  protected handleNormalInput(value: string) {
    // Update display value
    this._displayValue.set(value);
    const modelValue = this.getModelValue(value);

    // For number type, convert to number
    if (this.type() === 'number') {
      const numValue = this.parseNumber(modelValue);
      this._value.set(numValue);
      this.onChange(numValue);
      this.valueChange.emit(numValue);
    } else {
      this._value.set(modelValue);
      this.onChange(modelValue);
      this.valueChange.emit(modelValue);
    }
  }

  protected parseNumber(value: string): number {
    if (!value || value.trim() === '') return 0;

    // Remove currency symbols and formatting
    const cleaned = value.replace(/[^\d.-]/g, '');
    if (cleaned === '' || cleaned === '-') return 0;
    const parsed = parseFloat(cleaned);

    return isNaN(parsed) ? 0 : parsed;
  }

  onFocus() {
    // Override in subclasses if needed
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(_event: KeyboardEvent) {
    // Override in subclasses if needed
  }

  onBlur() {
    this.onTouched();
    // Override in subclasses if needed
  }

  onClear(event: Event) {
    event.stopPropagation();
    if (this.isDisabled()) return;

    this._value.set('');
    this._displayValue.set('');
    this.onChange('');
    this.valueChange.emit('');

    if (this.inputElementRef) {
      this.inputElementRef.nativeElement.focus();
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: string | number | null) {
    this._value.set(value ?? '');
    this.updateDisplayValue();
  }

  registerOnChange(fn: (value: string | number) => void) {
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
