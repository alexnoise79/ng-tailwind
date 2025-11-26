import { Component, forwardRef, computed, HostListener, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgtInputBase, InputType } from './input-base.component';
import { classMerge } from '../../utils';
import { Size } from '../../models';

@Component({
  selector: 'ngt-input[chip]',
  imports: [CommonModule, FormsModule],
  templateUrl: './input-chip.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgtInputChip),
      multi: true
    }
  ]
})
export class NgtInputChip extends NgtInputBase {
  // Core inputs
  readonly type = input<InputType>('text');
  readonly size = input<Size>('md');
  readonly disabled = input<boolean>(false);
  readonly placeholder = input<string>('');
  readonly showClear = input<boolean>(false);
  readonly filter = input<Array<string> | RegExp | null>(null);
  
  // Chip-specific inputs
  readonly chip = input<string | RegExp | null>(null);
  readonly chipFormat = input<string>(',');

  // Outputs
  readonly valueChange = output<string | number>();

  private _chips = signal<Array<string>>([]);
  private _currentChipValue = signal<string>('');

  hasChips = computed(() => this._chips().length > 0);
  chips = computed(() => this._chips());
  currentChipValue = computed(() => this._currentChipValue());

  override get inputClasses() {
    return computed(() => {
    const hasChipMode = this.hasChips() && this.chip() !== null;
    const base = hasChipMode
      ? 'w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
      : 'w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    const sizeClasses = {
      sm: 'px-2.5 py-1.5 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-2.5 text-lg'
    };
      return classMerge(base, sizeClasses[this.size()]);
    });
  }

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    if (this.chip() !== null) {
      this.updateChips();
    }

    // Chip doesn't work with number type
    if (this.type() === 'number') {
      console.warn('Chip input does not work with type="number". Consider using type="text".');
    }
  }

  private updateChips() {
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

    // Get the current input value and existing chips
    const inputValue = this.inputElementRef?.nativeElement?.value || '';
    const existingChips = this._chips();

    // Determine the regex to use for splitting
    let splitRegex: RegExp | string;
    if (typeof chipSeparator === 'string' && chipSeparator.startsWith('/') && chipSeparator.endsWith('/')) {
      try {
        const regexPattern = chipSeparator.slice(1, -1);
        splitRegex = new RegExp(regexPattern);
      } catch {
        splitRegex = chipFormat;
      }
    } else {
      splitRegex = chipFormat;
    }

    const parts = stringValue.split(splitRegex);
    const { chips, currentValue } = this.processChipParts(parts, existingChips, inputValue);

    this._chips.set(chips);
    this._currentChipValue.set(currentValue);
  }

  private processChipParts(parts: Array<string>, existingChips: Array<string>, inputValue: string): { chips: Array<string>; currentValue: string } {
    if (parts.length === 1) {
      // Only one part - check if it's an existing chip
      const trimmedPart = parts[0].trim();
      const isExistingChip = existingChips.some(c => c.trim() === trimmedPart);
      if (isExistingChip && inputValue === '') {
        // It's an existing chip and input is empty - keep it as a chip
        return { chips: [trimmedPart], currentValue: '' };
      } else {
        // It's the current value being edited
        return { chips: [], currentValue: parts[0] };
      }
    } else {
      // Multiple parts - all but last are chips
      return {
        chips: parts.slice(0, -1).filter(c => c.trim() !== ''),
        currentValue: parts[parts.length - 1] || ''
      };
    }
  }

  private buildChipModelValue(chips: Array<string>, currentValue: string): string {
    const chipFormat = this.chipFormat();
    if (chips.length === 0) {
      return currentValue;
    }
    if (!currentValue || currentValue.trim() === '') {
      return chips.join(chipFormat);
    }
    return chips.join(chipFormat) + chipFormat + currentValue;
  }

  protected override handleNormalInput(value: string) {
    // Handle chip mode
    if (this.chip() !== null && this.type() !== 'number') {
      this.handleChipInput(value);
    } else {
      super.handleNormalInput(value);
    }
  }

  private handleChipInput(value: string, target?: HTMLInputElement) {
    const inputTarget = target || this.inputElementRef?.nativeElement;
    
    // Prevent space as first character in chip mode
    if (value.startsWith(' ')) {
      value = value.trimStart();
      if (inputTarget) {
        inputTarget.value = value;
      }
    }

    const chipFormat = this.chipFormat();
    const existingChips = this._chips();

    // Check if the separator was just typed
    if (this.isSeparatorTyped(value)) {
      const valueBeforeSeparator = value.slice(0, -chipFormat.length).trim();
      if (valueBeforeSeparator) {
        this.createChipFromValue(valueBeforeSeparator, existingChips);
        if (inputTarget) {
          inputTarget.value = '';
        }
        return;
      }
    }

    // Update the current chip value
    this._currentChipValue.set(value);
    const fullValue = this.buildChipModelValue(existingChips, value);
    this._displayValue.set(fullValue);
    const modelValue = this.getModelValue(fullValue);

    this._value.set(modelValue);
    this.onChange(modelValue);
    this.valueChange.emit(modelValue);
  }

  private isSeparatorTyped(value: string): boolean {
    const chipSeparator = this.chip();
    const chipFormat = this.chipFormat();

    if (typeof chipSeparator === 'string') {
      if (chipSeparator.startsWith('/') && chipSeparator.endsWith('/')) {
        try {
          const regexPattern = chipSeparator.slice(1, -1);
          const regex = new RegExp(regexPattern);
          return regex.test(value.slice(-1));
        } catch {
          return value.endsWith(chipFormat);
        }
      }
      return value.endsWith(chipFormat);
    } else if (chipSeparator instanceof RegExp) {
      return chipSeparator.test(value.slice(-1));
    }
    return false;
  }

  private createChipFromValue(valueBeforeSeparator: string, existingChips: Array<string>) {
    const newChips = [...existingChips, valueBeforeSeparator];
    const newValue = this.buildChipModelValue(newChips, '');

    this._value.set(newValue);
    this._displayValue.set(newValue);
    this._chips.set(newChips);
    this._currentChipValue.set('');
    this.onChange(newValue);
    this.valueChange.emit(newValue);
  }

  @HostListener('keydown', ['$event'])
  override onKeyDown(event: KeyboardEvent) {
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

  override onBlur() {
    super.onBlur();
    // Submit current chip value on blur if chip mode is enabled
    if (this.chip() !== null && this.type() !== 'number') {
      this.submitChipOnBlur();
    }
  }

  private submitChipOnBlur() {
    const currentValue = this._currentChipValue().trimStart().trim();
    const existingChips = this._chips();

    if (currentValue) {
      // Add current value as a chip (trimmed of leading spaces)
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
      const newValue = this.buildChipModelValue(existingChips, '');
      if (newValue !== String(this._value())) {
        this._value.set(newValue);
        this._displayValue.set(newValue);
        this.onChange(newValue);
        this.valueChange.emit(newValue);
      }
    }
  }

  override onClear(event: Event) {
    super.onClear(event);
    this._chips.set([]);
  }

  removeChip(chip: string, event: Event) {
    event.stopPropagation();
    if (this.isDisabled()) return;

    const chips = this._chips();
    const newChips = chips.filter((c: string) => c !== chip);
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

  override writeValue(value: string | number | null) {
    super.writeValue(value);
    if (this.chip() !== null) {
      this.updateChips();
    }
  }
}

