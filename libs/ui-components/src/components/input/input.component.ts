import { Component, Input, signal, computed, input, output, forwardRef, ViewChild, ElementRef, OnInit, OnDestroy, effect, ContentChild, TemplateRef, HostListener, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule, NgTemplateOutlet, DOCUMENT } from '@angular/common';
import { classMerge } from '../../utils';
import { Size } from '../../models';
import { OutsideClickDirective } from '../../directives';

export interface AutoCompleteSelectEvent {
  originalEvent: Event;
  value: unknown;
}

export type InputType = 'text' | 'number' | 'email' | 'tel';
export type NumberMode = 'decimal' | 'currency';

@Component({
  selector: 'ngt-input',
  imports: [CommonModule, FormsModule, NgTemplateOutlet, OutsideClickDirective],
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgtInput),
      multi: true
    }
  ]
})
export class NgtInput implements ControlValueAccessor, OnInit, OnDestroy {
  // Inputs
  readonly type = input<InputType>('text');
  readonly size = input<Size>('md');
  readonly disabled = input<boolean>(false);
  readonly placeholder = input<string>('');
  readonly showClear = input<boolean>(false);
  readonly mask = input<string | null>(null);
  readonly chip = input<string | RegExp | null>(null);
  readonly chipFormat = input<string>(',');
  readonly filter = input<Array<string> | RegExp | null>(null);

  // Number-specific inputs
  readonly mode = input<NumberMode | null>(null);
  readonly currency = input<string>('USD');

  // Autocomplete inputs
  @Input() set completeMethod(value: ((query: string) => Promise<Array<unknown>> | Array<unknown>) | null | undefined) {
    this._completeMethod.set(value || null);
  }
  private _completeMethod = signal<((query: string) => Promise<Array<unknown>> | Array<unknown>) | null>(null);
  readonly minQueryLength = input<number>(1);
  readonly delay = input<number>(300);
  readonly scrollHeight = input<string>('200px');
  @Input() set optionLabel(value: string | ((item: unknown) => string) | null | undefined) {
    this._optionLabel.set(value || null);
  }
  private _optionLabel = signal<string | ((item: unknown) => string) | null>(null);
  @Input() set optionValue(value: string | ((item: unknown) => string) | null | undefined) {
    this._optionValue.set(value || null);
  }
  private _optionValue = signal<string | ((item: unknown) => string) | null>(null);
  readonly itemSelect = output<AutoCompleteSelectEvent>();

  // Content templates
  @ContentChild('item') itemTemplate?: TemplateRef<unknown>;
  @ContentChild('loader') loaderTemplate?: TemplateRef<unknown>;

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
  @ViewChild('autocompletePanel') autocompletePanelRef?: ElementRef<HTMLElement>;

  // Internal state
  private _displayValue = signal<string>('');
  private _isFocused = signal(false);
  private _chips = signal<Array<string>>([]);
  private _currentChipValue = signal<string>('');

  // Autocomplete state
  private _suggestions = signal<Array<unknown>>([]);
  private _isLoading = signal<boolean>(false);
  private _showPanel = signal<boolean>(false);
  private _focusedIndex = signal<number>(-1);
  private _query = signal<string>('');
  private _debounceTimer?: ReturnType<typeof setTimeout>;
  private _escapeListener?: (event: KeyboardEvent) => void;

  // ControlValueAccessor callbacks
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onChange = (_value: string | number) => {};
  private onTouched = () => {};
  private document = inject(DOCUMENT);

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

  // Autocomplete computed
  hasAutocomplete = computed(() => this._completeMethod() !== null);
  suggestions = computed(() => this._suggestions());
  isLoading = computed(() => this._isLoading());
  showPanel = computed(() => this._showPanel() && this.hasAutocomplete() && (this.isLoading() || this.suggestions().length > 0));
  focusedIndex = computed(() => this._focusedIndex());

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

  ngOnInit() {
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

    // Setup keyboard listeners for autocomplete
    if (this.hasAutocomplete()) {
      this.setupKeyboardListeners();
    }
  }

  ngOnDestroy() {
    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
    }
    if (this._escapeListener) {
      this.document.removeEventListener('keydown', this._escapeListener);
    }
  }

  private setupKeyboardListeners() {
    this._escapeListener = (event: KeyboardEvent) => {
      if (this.showPanel() && event.key === 'Escape') {
        this.hidePanel();
      }
    };
    this.document.addEventListener('keydown', this._escapeListener);
  }

  // Value handling
  private updateDisplayValue() {
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

  // Event handlers
  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    let value = target.value;

    // Process input value through filters
    value = this.processInputValue(value, target);

    // Handle chip mode or normal mode
    if (this.chip() !== null && this.type() !== 'number') {
      this.handleChipInput(value, target);
    } else {
      this.handleNormalInput(value);
    }
  }

  private processInputValue(value: string, target: HTMLInputElement): string {
    // Auto-filter tel inputs to only allow numbers and common tel characters
    if (this.type() === 'tel') {
      value = this.filterTelInput(value);
      target.value = value;
    }

    // Apply mask if provided (before filter, so mask format is respected)
    if (this.mask() !== null && this.mask() && this.type() !== 'number') {
      value = this.applyMask(value, this.mask()!);
      target.value = value;
    }

    // Apply filter if provided
    if (this.filter() !== null) {
      value = this.applyFilter(value);
      target.value = value;
    }

    return value;
  }

  private filterTelInput(value: string): string {
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

  private handleChipInput(value: string, target: HTMLInputElement) {
    // Prevent space as first character in chip mode
    if (value.startsWith(' ')) {
      value = value.trimStart();
      target.value = value;
    }

    const chipFormat = this.chipFormat();
    const existingChips = this._chips();

    // Check if the separator was just typed
    if (this.isSeparatorTyped(value)) {
      const valueBeforeSeparator = value.slice(0, -chipFormat.length).trim();
      if (valueBeforeSeparator) {
        this.createChipFromValue(valueBeforeSeparator, existingChips);
        target.value = '';
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

  private handleNormalInput(value: string) {
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

    // Handle autocomplete
    if (this.hasAutocomplete() && this.type() !== 'number') {
      this.handleAutocomplete(value);
    }
  }

  private handleAutocomplete(query: string) {
    // Clear previous timer
    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
    }

    this._query.set(query);

    // Check min query length
    if (query.length < this.minQueryLength()) {
      this._suggestions.set([]);
      this._showPanel.set(false);
      return;
    }

    // Debounce the search
    this._debounceTimer = setTimeout(() => {
      this.searchSuggestions(query);
    }, this.delay());
  }

  private async searchSuggestions(query: string): Promise<void> {
    const completeMethod = this._completeMethod();
    if (!completeMethod) return;

    this._isLoading.set(true);
    this._showPanel.set(true);
    this._focusedIndex.set(-1);

    try {
      const results = await completeMethod(query);
      this._suggestions.set(Array.isArray(results) ? results : []);
    } catch (error) {
      console.error('Error in autocomplete search:', error);
      this._suggestions.set([]);
    } finally {
      this._isLoading.set(false);
    }
  }

  getOptionLabel(item: unknown): string {
    return this.extractOptionProperty(item, this._optionLabel(), String(item));
  }

  private getOptionValue(item: unknown): unknown {
    return this.extractOptionProperty(item, this._optionValue(), item);
  }

  private extractOptionProperty<T>(item: unknown, property: string | ((item: unknown) => T) | null, defaultValue: T): T {
    if (!property) {
      return defaultValue;
    }
    if (typeof property === 'function') {
      return property(item);
    }
    if (typeof item === 'object' && item !== null) {
      return ((item as Record<string, unknown>)[property] ?? defaultValue) as T;
    }
    return defaultValue;
  }

  selectSuggestion(item: unknown, event: Event) {
    const value = this.getOptionValue(item);
    const label = this.getOptionLabel(item);

    // Update input value
    this._displayValue.set(label);
    this._value.set(typeof value === 'string' || typeof value === 'number' ? value : label);
    this.onChange(this._value());
    this.valueChange.emit(this._value());

    // Emit itemSelect event
    this.itemSelect.emit({
      originalEvent: event,
      value: value
    });

    // Hide panel
    this.hidePanel();

    // Focus input
    if (this.inputElementRef) {
      this.inputElementRef.nativeElement.focus();
    }
  }

  hidePanel() {
    this._showPanel.set(false);
    this._focusedIndex.set(-1);
  }

  onOutsideClick() {
    if (this.showPanel()) {
      this.hidePanel();
    }
  }

  @HostListener('keydown', ['$event'])
  onAutocompleteKeyDown(event: KeyboardEvent) {
    if (!this.hasAutocomplete() || !this.showPanel()) {
      return;
    }

    const suggestions = this.suggestions();
    if (suggestions.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this._focusedIndex.set(this._focusedIndex() < suggestions.length - 1 ? this._focusedIndex() + 1 : 0);
        this.scrollToFocused();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this._focusedIndex.set(this._focusedIndex() > 0 ? this._focusedIndex() - 1 : suggestions.length - 1);
        this.scrollToFocused();
        break;
      case 'Enter':
        event.preventDefault();
        const focused = this._focusedIndex();
        if (focused >= 0 && focused < suggestions.length) {
          this.selectSuggestion(suggestions[focused], event);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.hidePanel();
        break;
    }
  }

  setFocusedIndex(index: number) {
    this._focusedIndex.set(index);
  }

  private scrollToFocused() {
    setTimeout(() => {
      if (this.autocompletePanelRef && this._focusedIndex() >= 0) {
        const panel = this.autocompletePanelRef.nativeElement;
        const focusedElement = panel.querySelector(`[data-suggestion-index="${this._focusedIndex()}"]`) as HTMLElement;
        if (focusedElement) {
          focusedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
    }, 0);
  }

  private applyFilter(value: string): string {
    const filter = this.filter();
    if (filter === null) return value;

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

  onFocus() {
    this._isFocused.set(true);
    // Show panel if we have suggestions and autocomplete is enabled
    if (this.hasAutocomplete() && this.suggestions().length > 0) {
      this._showPanel.set(true);
    }
  }

  onKeyDown(event: KeyboardEvent) {
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

  onBlur() {
    this._isFocused.set(false);
    this.onTouched();
    // Hide panel on blur (with slight delay to allow click events)
    setTimeout(() => {
      if (!this._isFocused()) {
        this.hidePanel();
      }
    }, 200);

    // Submit current chip value on blur if chip mode is enabled
    if (this.chip() !== null && this.type() !== 'number') {
      this.submitChipOnBlur();
    }

    // Format number on blur if in currency or decimal mode
    if (this.type() === 'number' && this.mode() !== null) {
      this.formatNumberOnBlur();
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

  private formatNumberOnBlur() {
    const numValue = this.parseNumber(this._displayValue());
    if (!isNaN(numValue) && numValue !== 0) {
      const formatted = this.formatNumber(numValue);
      this._displayValue.set(formatted);
      // Update the value to match formatted display
      this._value.set(numValue);
    }
  }

  onClear(event: Event) {
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

  removeChip(chip: string, event: Event) {
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

  // ControlValueAccessor implementation
  writeValue(value: string | number | null) {
    this._value.set(value ?? '');
    this.updateDisplayValue();
    if (this.chip() !== null) {
      this.updateChips();
    }
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
