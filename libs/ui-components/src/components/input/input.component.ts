import { Component, Input, signal, computed, input, output, forwardRef, ViewChild, ElementRef, OnInit, effect } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { classMerge } from '../../utils';
import { Size } from '../../models';

export type InputType = 'text' | 'number' | 'email' | 'tel';
export type NumberMode = 'decimal' | 'currency';

@Component({
  selector: 'ngt-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgtInput),
      multi: true
    }
  ]
})
export class NgtInput implements ControlValueAccessor, OnInit {
  // Inputs
  readonly type = input<InputType>('text');
  readonly size = input<Size>('md');
  readonly disabled = input<boolean>(false);
  readonly placeholder = input<string>('');
  readonly showClear = input<boolean>(false);
  readonly mask = input<string | null>(null);
  readonly chip = input<string | RegExp | null>(null);
  readonly chipFormat = input<string>(',');
  readonly filter = input<string[] | RegExp | null>(null);
  
  // Number-specific inputs
  readonly mode = input<NumberMode | null>(null);
  readonly currency = input<string>('USD');

  @Input() set value(val: string | number | null) {
    if (val !== this._value()) {
      this._value.set(val ?? '');
      this.updateDisplayValue();
    }
  }
  private _value = signal<string | number>('');

  // Outputs
  readonly valueChange = output<string | number>();

  // ViewChild
  @ViewChild('inputElement') inputElementRef!: ElementRef<HTMLInputElement>;

  // Internal state
  private _displayValue = signal<string>('');
  private _isFocused = signal(false);
  private _chips = signal<string[]>([]);
  private _currentChipValue = signal<string>('');

  // ControlValueAccessor callbacks
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onChange = (_value: string | number) => {};
  private onTouched = () => {};

  // Computed values
  displayValue = computed(() => this._displayValue());
  isDisabled = computed(() => this.disabled());
  hasValue = computed(() => {
    const val = this._value();
    return val !== null && val !== undefined && val !== '';
  });
  hasChips = computed(() => this._chips().length > 0);
  chips = computed(() => this._chips());
  currentChipValue = computed(() => this._currentChipValue());
  isNumberType = computed(() => this.type() === 'number');
  isCurrencyMode = computed(() => this.mode() === 'currency');
  isDecimalMode = computed(() => this.mode() === 'decimal');

  inputClasses = computed(() => {
    const hasChipMode = this.hasChips() && this.chip() !== null;
    const base = hasChipMode 
      ? 'w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
      : 'w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    const sizeClasses = {
      sm: 'px-2.5 py-1.5 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-2.5 text-lg'
    };
    // Hide native number input spinners
    const numberInputClasses = this.type() === 'number' ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' : '';
    return classMerge(base, sizeClasses[this.size()], numberInputClasses);
  });


  constructor() {
    // Effect to apply mask
    effect(() => {
      if (this.mask() !== null) {
        this.updateDisplayValue();
      }
    });

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

  ngOnInit(): void {
    this.updateDisplayValue();
    if (this.chip() !== null) {
      this.updateChips();
    }
    
    // Validate currency is required when mode is currency
    if (this.mode() === 'currency') {
      const currencyValue = this.currency();
      if (!currencyValue || currencyValue.trim() === '') {
        throw new Error('Currency is required when mode is "currency". Please provide a currency value.');
      }
    }
  }

  // Value handling
  private updateDisplayValue(): void {
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
      if (mask[i] === '9') {
        // Match digit
        if (/\d/.test(value[valueIndex])) {
          masked += value[valueIndex];
          valueIndex++;
        } else {
          // Skip non-digit characters
          valueIndex++;
          i--; // Stay on current mask position
        }
      } else if (mask[i] === 'a') {
        // Match alpha
        if (/[a-zA-Z]/.test(value[valueIndex])) {
          masked += value[valueIndex];
          valueIndex++;
        } else {
          // Skip non-alpha characters
          valueIndex++;
          i--; // Stay on current mask position
        }
      } else if (mask[i] === '*') {
        // Match any character
        masked += value[valueIndex];
        valueIndex++;
      } else {
        // Literal character - insert it
        masked += mask[i];
        // If the current value character matches the literal, consume it
        if (valueIndex < value.length && value[valueIndex] === mask[i]) {
          valueIndex++;
        }
      }
    }
    
    return masked;
  }

  private updateChips(): void {
    const val = this._value();
    if (!val) {
      this._chips.set([]);
      this._currentChipValue.set('');
      return;
    }

    const stringValue = String(val);
    const chipSeparator = this.chip();
    const chipFormat = this.chipFormat();

    if (chipSeparator === null) {
      this._chips.set([]);
      this._currentChipValue.set(stringValue);
      return;
    }

    let chips: string[] = [];
    let currentValue = '';
    
    // Get the current input value and existing chips
    const inputValue = this.inputElementRef?.nativeElement?.value || '';
    const existingChips = this._chips();
    
    if (typeof chipSeparator === 'string') {
      // Handle regex string like "/\\s+/"
      if (chipSeparator.startsWith('/') && chipSeparator.endsWith('/')) {
        try {
          const regexPattern = chipSeparator.slice(1, -1);
          const regex = new RegExp(regexPattern);
          const parts = stringValue.split(regex);
          chips = parts.slice(0, -1).filter(c => c.trim() !== '');
          currentValue = parts[parts.length - 1] || '';
        } catch {
          // Fallback to string split if regex is invalid
          const parts = stringValue.split(chipFormat);
          if (parts.length === 1) {
            // Only one part - check if it's an existing chip
            const trimmedPart = parts[0].trim();
            const isExistingChip = existingChips.some(c => c.trim() === trimmedPart);
            if (isExistingChip && inputValue === '') {
              // It's an existing chip and input is empty - keep it as a chip
              chips = [trimmedPart];
              currentValue = '';
            } else {
              // It's the current value being edited
              chips = [];
              currentValue = parts[0];
            }
          } else {
            chips = parts.slice(0, -1).filter(c => c.trim() !== '');
            currentValue = parts[parts.length - 1] || '';
          }
        }
      } else {
        const parts = stringValue.split(chipFormat);
        if (parts.length === 1) {
          // Only one part - check if it's an existing chip
          const trimmedPart = parts[0].trim();
          const isExistingChip = existingChips.some(c => c.trim() === trimmedPart);
          if (isExistingChip && inputValue === '') {
            // It's an existing chip and input is empty - keep it as a chip
            chips = [trimmedPart];
            currentValue = '';
          } else {
            // It's the current value being edited
            chips = [];
            currentValue = parts[0];
          }
        } else {
          chips = parts.slice(0, -1).filter(c => c.trim() !== '');
          currentValue = parts[parts.length - 1] || '';
        }
      }
    } else if (chipSeparator instanceof RegExp) {
      const parts = stringValue.split(chipFormat);
      if (parts.length === 1) {
        // Only one part - check if it's an existing chip
        const trimmedPart = parts[0].trim();
        const isExistingChip = existingChips.some(c => c.trim() === trimmedPart);
        if (isExistingChip && inputValue === '') {
          // It's an existing chip and input is empty - keep it as a chip
          chips = [trimmedPart];
          currentValue = '';
        } else {
          // It's the current value being edited
          chips = [];
          currentValue = parts[0];
        }
      } else {
        chips = parts.slice(0, -1).filter(c => c.trim() !== '');
        currentValue = parts[parts.length - 1] || '';
      }
    }

    this._chips.set(chips);
    this._currentChipValue.set(currentValue);
  }

  private getModelValue(displayValue: string): string {
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

  private buildChipModelValue(chips: string[], currentValue: string): string {
    const chipFormat = this.chipFormat();
    if (chips.length === 0) {
      return currentValue;
    }
    if (!currentValue || currentValue.trim() === '') {
      return chips.join(chipFormat);
    }
    return chips.join(chipFormat) + chipFormat + currentValue;
  }

  // Event handlers
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    let value = target.value;

    // Auto-filter tel inputs to only allow numbers and common tel characters
    if (this.type() === 'tel') {
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
      target.value = value;
    }

    // Apply mask if provided (before filter, so mask format is respected)
    if (this.mask() !== null && this.mask() && this.type() !== 'number') {
      // Apply mask to the current value
      const maskedValue = this.applyMask(value, this.mask()!);
      value = maskedValue;
      target.value = value;
    }

    // Apply filter if provided
    if (this.filter() !== null) {
      value = this.applyFilter(value);
      target.value = value;
    }

    // Handle chip mode
    if (this.chip() !== null && this.type() !== 'number') {
      // Prevent space as first character in chip mode
      if (value.startsWith(' ')) {
        value = value.trimStart();
        target.value = value;
      }
      
      const chipSeparator = this.chip();
      const chipFormat = this.chipFormat();
      const existingChips = this._chips();
      
      // Check if the separator was just typed
      let separatorTyped = false;
      if (typeof chipSeparator === 'string') {
        // Check if value ends with the separator
        if (chipSeparator.startsWith('/') && chipSeparator.endsWith('/')) {
          // For regex separators, check if the value matches the pattern at the end
          try {
            const regexPattern = chipSeparator.slice(1, -1);
            const regex = new RegExp(regexPattern);
            separatorTyped = regex.test(value.slice(-1));
          } catch {
            separatorTyped = value.endsWith(chipSeparator);
          }
        } else {
          separatorTyped = value.endsWith(chipFormat);
        }
      } else if (chipSeparator instanceof RegExp) {
        separatorTyped = chipSeparator.test(value.slice(-1));
      }
      
      // If separator was typed, create a chip from the value before it
      if (separatorTyped && value.length > chipFormat.length) {
        const valueBeforeSeparator = value.slice(0, -chipFormat.length).trim();
        if (valueBeforeSeparator) {
          const newChips = [...existingChips, valueBeforeSeparator];
          const newValue = this.buildChipModelValue(newChips, '');
          
          this._value.set(newValue);
          this._displayValue.set(newValue);
          this._chips.set(newChips);
          this._currentChipValue.set('');
          this.onChange(newValue);
          this.valueChange.emit(newValue);
          
          // Clear the input
          target.value = '';
          return;
        }
      }
      
      // Otherwise, just update the current value without creating chips
      // Update the current chip value directly
      this._currentChipValue.set(value);
      
      const fullValue = this.buildChipModelValue(existingChips, value);
      
      // Update display value (for non-chip mode display)
      this._displayValue.set(fullValue);
      
      // Get model value (without mask formatting)
      const modelValue = this.getModelValue(fullValue);
      
      this._value.set(modelValue);
      this.onChange(modelValue);
      this.valueChange.emit(modelValue);
      
      // Don't call updateChips() here - it will be called on blur
    } else {
      // Normal mode (no chips)
      // Update display value
      this._displayValue.set(value);

      // Get model value (without mask formatting)
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
  }

  private applyFilter(value: string): string {
    const filter = this.filter();
    if (filter === null) return value;

    if (Array.isArray(filter)) {
      // Array of allowed characters
      return value.split('').filter(char => filter.includes(char)).join('');
    } else if (filter instanceof RegExp) {
      // Regex filter
      return value.split('').filter(char => filter.test(char)).join('');
    }

    return value;
  }

  private parseNumber(value: string): number {
    if (!value || value.trim() === '') return 0;
    
    // Remove currency symbols and formatting
    const cleaned = value.replace(/[^\d.-]/g, '');
    if (cleaned === '' || cleaned === '-') return 0;
    const parsed = parseFloat(cleaned);
    
    return isNaN(parsed) ? 0 : parsed;
  }

  private formatNumber(value: number): string {
    if (this.mode() === 'currency') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: this.currency()
      }).format(value);
    } else if (this.mode() === 'decimal') {
      return value.toFixed(2);
    }
    return String(value);
  }

  onFocus(): void {
    this._isFocused.set(true);
  }

  onKeyDown(event: KeyboardEvent): void {
    // If input is empty and backspace is pressed, delete the last chip
    if (this.chip() !== null && this.type() !== 'number' && event.key === 'Backspace') {
      const inputValue = this.inputElementRef?.nativeElement?.value || '';
      if (inputValue === '' || inputValue.trim() === '') {
        const chips = this._chips();
        if (chips.length > 0) {
          event.preventDefault();
          const lastChip = chips[chips.length - 1];
          this.removeChip(lastChip, event);
        }
      }
    }
  }

  onBlur(): void {
    this._isFocused.set(false);
    this.onTouched();

    // Submit current chip value on blur if chip mode is enabled
    if (this.chip() !== null && this.type() !== 'number') {
      const currentValue = this._currentChipValue().trimStart().trim();
      if (currentValue) {
        // Add current value as a chip (trimmed of leading spaces)
        const existingChips = this._chips();
        const newChips = [...existingChips, currentValue];
        const newValue = this.buildChipModelValue(newChips, '');
        
        this._value.set(newValue);
        this._displayValue.set(newValue);
        this._chips.set(newChips);
        this._currentChipValue.set('');
        this.onChange(newValue);
        this.valueChange.emit(newValue);
      } else {
        // Even if no current value, update the model to remove any trailing separator
        const existingChips = this._chips();
        const newValue = this.buildChipModelValue(existingChips, '');
        if (newValue !== String(this._value())) {
          this._value.set(newValue);
          this._displayValue.set(newValue);
          this.onChange(newValue);
          this.valueChange.emit(newValue);
        }
      }
    }

    // Format number on blur if in currency or decimal mode
    if (this.type() === 'number' && this.mode() !== null) {
      const numValue = this.parseNumber(this._displayValue());
      if (!isNaN(numValue) && numValue !== 0) {
        const formatted = this.formatNumber(numValue);
        this._displayValue.set(formatted);
        // Update the value to match formatted display
        this._value.set(numValue);
      }
    }
  }

  onClear(event: Event): void {
    event.stopPropagation();
    if (this.isDisabled()) return;

    this._value.set('');
    this._displayValue.set('');
    this._chips.set([]);
    this.onChange('');
    this.valueChange.emit('');
    
    if (this.inputElementRef) {
      this.inputElementRef.nativeElement.focus();
    }
  }


  removeChip(chip: string, event: Event): void {
    event.stopPropagation();
    if (this.isDisabled()) return;

    const chips = this._chips();
    const newChips = chips.filter(c => c !== chip);
    const currentValue = this._currentChipValue();
    const newValue = this.buildChipModelValue(newChips, currentValue);
    
    // Set chips and current value first to prevent effect from overwriting them
    this._chips.set(newChips);
    this._currentChipValue.set(currentValue);
    
    // Then update the value - this will trigger the effect, but chips are already set correctly
    this._value.set(newValue);
    this._displayValue.set(newValue);
    this.onChange(newValue);
    this.valueChange.emit(newValue);
    
    // Ensure input is cleared if there's no current value
    if (!currentValue && this.inputElementRef?.nativeElement) {
      this.inputElementRef.nativeElement.value = '';
    }
  }

  getChipsWidth(): number {
    // Calculate approximate width needed for chips
    // Each chip is roughly 80-120px depending on content, plus gaps
    const chips = this._chips();
    if (chips.length === 0) return 0;
    
    // Base padding + gap between chips + estimated chip width
    const basePadding = 12; // px-3 = 12px
    const gap = 4; // gap-1 = 4px
    const estimatedChipWidth = 80; // Average chip width
    
    return basePadding + (chips.length * (estimatedChipWidth + gap));
  }

  // ControlValueAccessor implementation
  writeValue(value: string | number | null): void {
    this._value.set(value ?? '');
    this.updateDisplayValue();
    if (this.chip() !== null) {
      this.updateChips();
    }
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean): void {
    // Disabled state is handled by the disabled input signal
    void _isDisabled; // Explicitly mark as intentionally unused
  }

}

