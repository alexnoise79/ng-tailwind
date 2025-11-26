import { Component, Input, signal, computed, input, output, forwardRef, TemplateRef, ViewChild, ElementRef, OnInit, OnDestroy, HostListener, ContentChild, effect, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { NgTemplateOutlet, DOCUMENT } from '@angular/common';
import { OutsideClickDirective } from '../../directives';
import { classMerge } from '../../utils';
import { Size, SelectOption, SelectGroup } from '../../models';

@Component({
  selector: 'ngt-select',
  imports: [NgTemplateOutlet, FormsModule, OutsideClickDirective],
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgtSelect),
      multi: true
    }
  ]
})
export class NgtSelect implements ControlValueAccessor, OnInit, OnDestroy {
  // Inputs
  @Input() set options(value: Array<Record<string, unknown>> | Array<unknown> | null | undefined) {
    if (value) {
      this._options.set(value);
      this.processOptions();
    }
  }
  private _options = signal<Array<Record<string, unknown>> | Array<unknown>>([]);

  @Input() set optionLabel(value: string | null | undefined) {
    this._optionLabel.set(value || 'label');
  }
  private _optionLabel = signal<string>('label');

  @Input() set optionValue(value: string | null | undefined) {
    this._optionValue.set(value || 'value');
  }
  private _optionValue = signal<string>('value');

  @Input() set optionDisabled(value: string | null | undefined) {
    this._optionDisabled.set(value || 'disabled');
  }
  private _optionDisabled = signal<string>('disabled');

  @Input() set optionGroup(value: string | null | undefined) {
    this._optionGroup.set(value || 'group');
  }
  private _optionGroup = signal<string>('group');

  @Input() set disabled(value: boolean) {
    this._disabled.set(value ?? false);
  }
  private _disabled = signal(false);

  @Input() set placeholder(value: string | null | undefined) {
    this._placeholder.set(value || '');
  }
  private _placeholder = signal<string>('');

  @Input() set filterBy(value: string | null | undefined) {
    this._filterBy.set(value || '');
  }
  private _filterBy = signal<string>('');

  readonly size = input<Size>('md');
  readonly checkmark = input(false);
  readonly showClear = input(false);
  readonly multiselect = input(false);
  readonly group = input(false);
  readonly filter = input(false);
  readonly fluid = input(false);
  readonly invalid = input(false);
  readonly editable = input(false);

  // Content templates
  @ContentChild('item') itemTemplate?: TemplateRef<unknown>;
  @ContentChild('selectedItem') selectedItemTemplate?: TemplateRef<unknown>;
  @ContentChild('group') groupTemplate?: TemplateRef<unknown>;
  @ContentChild('header') headerTemplate?: TemplateRef<unknown>;
  @ContentChild('footer') footerTemplate?: TemplateRef<unknown>;
  @ContentChild('emptyMessage') emptyMessageTemplate?: TemplateRef<unknown>;
  @ContentChild('dropdownicon') dropdownIconTemplate?: TemplateRef<unknown>;

  // ViewChild
  @ViewChild('trigger') triggerRef!: ElementRef<HTMLElement>;
  @ViewChild('input') inputRef?: ElementRef<HTMLInputElement>;
  @ViewChild('filterInput') filterInputRef?: ElementRef<HTMLInputElement>;
  @ViewChild('panel') panelRef?: ElementRef<HTMLElement>;

  // Outputs
  readonly selectionChange = output<unknown>();
  readonly filterChange = output<string>();

  // Internal state - used in computed properties
  private _value = signal<unknown>(null);
  private _isOpen = signal(false);
  private _filterText = signal<string>('');
  private _focusedIndex = signal<number>(-1);
  private _filteredOptions = signal<Array<SelectOption>>([]);
  private _groupedOptions = signal<Array<SelectGroup>>([]);
  private _processedOptions = signal<Array<SelectOption>>([]);
  private _isOpening = false;

  // ControlValueAccessor callbacks
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onChange = (_value: unknown) => {};
  private onTouched = () => {};

  // Keyboard event listeners
  private escapeListener?: (event: KeyboardEvent) => void;
  private document = inject(DOCUMENT);

  // Computed values
  isOpen = computed(() => this._isOpen());
  filterText = computed(() => this._filterText());
  value = computed(() => this._value());
  isDisabled = computed(() => this._disabled());
  focusedIndex = computed(() => this._focusedIndex());
  placeholderValue = computed(() => this._placeholder());

  processedOptions = computed(() => this._processedOptions());
  filteredOptions = computed(() => {
    if (!this.filter() || !this.filterText()) {
      return this.processedOptions();
    }
    return this._filteredOptions();
  });

  groupedOptions = computed(() => {
    if (!this.group()) {
      return [];
    }

    const groups = this._groupedOptions();

    // If filtering is enabled, filter the grouped options
    if (this.filter() && this.filterText()) {
      const filtered = groups
        .map(group => ({
          ...group,
          items: group.items.filter(item => {
            const filteredOpts = this._filteredOptions();
            return filteredOpts.some(opt => this.compareValues(this.getOptionValue(opt), this.getOptionValue(item)));
          })
        }))
        .filter(group => group.items.length > 0);

      return filtered;
    }

    return groups;
  });

  isMulti = computed(() => this.multiselect());
  hasValue = computed(() => {
    const val = this.value();
    if (this.isMulti()) {
      return Array.isArray(val) && val.length > 0;
    }
    return val !== null && val !== undefined;
  });

  selectedOptions = computed(() => {
    const val = this.value();
    if (!val) return [];

    if (this.isMulti()) {
      if (!Array.isArray(val)) return [];
      return this.processedOptions().filter(opt => val.includes(this.getOptionValue(opt)));
    }

    const option = this.processedOptions().find(opt => this.getOptionValue(opt) === val);
    return option ? [option] : [];
  });

  displayText = computed(() => {
    const selected = this.selectedOptions();
    if (selected.length === 0) return '';
    if (this.isMulti()) {
      return selected.map(opt => this.getOptionLabel(opt)).join(', ');
    }
    return this.getOptionLabel(selected[0]);
  });

  inputClasses = computed(() => {
    const base = 'w-full border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    const sizeClasses = {
      sm: 'px-2.5 py-1.5 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-2.5 text-lg'
    };
    const invalidClasses = this.invalid() ? 'border-red-500 dark:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600';
    return classMerge(base, sizeClasses[this.size()], invalidClasses, this.fluid() ? 'w-full' : '');
  });

  panelClasses = computed(() => {
    const base = 'absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto';
    return classMerge(base);
  });

  constructor() {
    // Effect to update filtered options when filter text changes
    effect(() => {
      if (this.filter() && this.filterText()) {
        this.updateFilteredOptions();
      }
    });
  }

  ngOnInit() {
    this.processOptions();
    this.setupKeyboardListeners();
  }

  ngOnDestroy() {
    this.cleanupKeyboardListeners();
  }

  private setupKeyboardListeners() {
    this.escapeListener = (event: KeyboardEvent) => {
      if (this.isOpen() && event.key === 'Escape') {
        this.close();
      }
    };
    this.document.addEventListener('keydown', this.escapeListener);
  }

  private cleanupKeyboardListeners() {
    if (this.escapeListener) {
      this.document.removeEventListener('keydown', this.escapeListener);
    }
  }

  private processOptions() {
    const options = this._options();
    const processed: Array<SelectOption> = [];

    for (const option of options) {
      if (this.isPrimitive(option)) {
        processed.push({
          label: String(option),
          value: option
        });
      } else if (this.isKeyValue(option)) {
        // Handle key-value pairs
        const opt = option as Record<string, unknown>;
        const keys = Object.keys(opt);
        if (keys.length > 0) {
          const firstKey = keys[0];
          processed.push({
            label: String(opt[firstKey] ?? ''),
            value: firstKey
          });
        }
      } else {
        // Handle object with optionLabel/optionValue
        const opt = option as Record<string, unknown>;
        const label = this.getOptionLabel(opt);
        const value = this.getOptionValue(opt);
        const disabled = this.getOptionDisabled(opt);
        const group = this.getOptionGroup(opt);

        processed.push({
          ...opt,
          label,
          value,
          disabled,
          group
        } as SelectOption);
      }
    }

    this._processedOptions.set(processed);
    this.processGroupedOptions();

    if (this.filter() && this.filterText()) {
      this.updateFilteredOptions();
    }
  }

  private processGroupedOptions() {
    if (!this.group()) {
      return;
    }

    const processed = this.processedOptions();
    const groups = new Map<string, Array<SelectOption>>();

    for (const option of processed) {
      const groupKey = this.getOptionGroup(option) || '';
      if (!groups.has(groupKey)) {
        groups.set(groupKey, []);
      }
      const groupItems = groups.get(groupKey);
      if (groupItems) {
        groupItems.push(option);
      }
    }

    const grouped: Array<SelectGroup> = [];
    for (const [key, items] of groups.entries()) {
      grouped.push({
        label: key,
        value: key,
        items
      });
    }

    this._groupedOptions.set(grouped);
  }

  private updateFilteredOptions() {
    const text = this.filterText().toLowerCase();
    const filterBy = this._filterBy() || this.getOptionLabelKey();
    const processed = this.processedOptions();

    const filtered = processed.filter(opt => {
      const filterByValue = this._filterBy();
      if (filterByValue) {
        const fieldValue = this.getNestedProperty(opt, filterBy);
        return String(fieldValue ?? '')
          .toLowerCase()
          .includes(text);
      }
      return this.getOptionLabel(opt).toLowerCase().includes(text);
    });

    this._filteredOptions.set(filtered);
  }

  private getNestedProperty(obj: SelectOption, path: string): unknown {
    return path.split('.').reduce<unknown>((current, prop) => {
      if (current && typeof current === 'object') {
        return (current as Record<string, unknown>)[prop];
      }
      return undefined;
    }, obj);
  }

  private isPrimitive(value: unknown): boolean {
    return value === null || (typeof value !== 'object' && typeof value !== 'function');
  }

  private isKeyValue(value: unknown): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value) && Object.keys(value).length === 1;
  }

  // Helper methods to access option label/value/disabled/group
  private getOptionLabelKey(): string {
    return this._optionLabel();
  }

  private getOptionValueKey(): string {
    return this._optionValue();
  }

  private getOptionDisabledKey(): string {
    return this._optionDisabled();
  }

  private getOptionGroupKey(): string {
    return this._optionGroup();
  }

  getOptionLabel(option: SelectOption | Record<string, unknown> | string | number): string {
    if (typeof option === 'string' || typeof option === 'number') {
      return String(option);
    }
    if (!option || typeof option !== 'object') {
      return String(option);
    }
    const labelKey = this.getOptionLabelKey();
    const opt = option as Record<string, unknown>;
    return String(opt[labelKey] ?? opt.label ?? option);
  }

  getOptionValue(option: SelectOption | Record<string, unknown> | string | number): unknown {
    if (typeof option === 'string' || typeof option === 'number') {
      return option;
    }
    if (!option || typeof option !== 'object') {
      return option;
    }
    const valueKey = this.getOptionValueKey();
    const opt = option as Record<string, unknown>;
    return opt[valueKey] ?? opt.value ?? option;
  }

  getOptionDisabled(option: SelectOption | Record<string, unknown> | string | number): boolean {
    if (typeof option === 'string' || typeof option === 'number') {
      return false;
    }
    if (!option || typeof option !== 'object') {
      return false;
    }
    const disabledKey = this.getOptionDisabledKey();
    const opt = option as Record<string, unknown>;
    return Boolean(opt[disabledKey] ?? opt.disabled ?? false);
  }

  getOptionGroup(option: SelectOption | Record<string, unknown> | string | number): string | undefined {
    if (typeof option === 'string' || typeof option === 'number') {
      return undefined;
    }
    if (!option || typeof option !== 'object') {
      return undefined;
    }
    const groupKey = this.getOptionGroupKey();
    const opt = option as Record<string, unknown>;
    return opt[groupKey] ? String(opt[groupKey]) : opt.group ? String(opt.group) : undefined;
  }

  toggle() {
    if (this.isDisabled()) return;
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (this.isDisabled()) return;
    this._isOpening = true;
    this._isOpen.set(true);
    this._focusedIndex.set(-1);

    // Focus filter input if filtering is enabled
    setTimeout(() => {
      this._isOpening = false;
      if (this.filter() && this.filterInputRef) {
        this.filterInputRef.nativeElement.focus();
      }
    }, 0);
  }

  close() {
    this._isOpen.set(false);
    this._focusedIndex.set(-1);
    if (this.filter()) {
      this._filterText.set('');
    }
    this.onTouched();
  }

  selectOption(option: SelectOption) {
    if (this.getOptionDisabled(option)) return;

    const value = this.getOptionValue(option);

    if (this.isMulti()) {
      const currentValue = this.value() || [];
      const newValue = Array.isArray(currentValue) ? [...currentValue] : [];
      const index = newValue.findIndex(v => this.compareValues(v, value));

      if (index > -1) {
        newValue.splice(index, 1);
      } else {
        newValue.push(value);
      }

      this._value.set(newValue);
      this.onChange(newValue);
      this.selectionChange.emit(newValue);
    } else {
      this._value.set(value);
      this.onChange(value);
      this.selectionChange.emit(value);
      this.close();
    }
  }

  removeChip(value: unknown, event: Event) {
    event.stopPropagation();
    if (!this.isMulti()) return;

    const currentValue = this.value() || [];
    if (!Array.isArray(currentValue)) return;

    const newValue = currentValue.filter(v => !this.compareValues(v, value));
    this._value.set(newValue);
    this.onChange(newValue);
    this.selectionChange.emit(newValue);
  }

  clear(event: Event) {
    event.stopPropagation();
    if (this.isDisabled()) return;

    if (this.isMulti()) {
      this._value.set([]);
      this.onChange([]);
      this.selectionChange.emit([]);
    } else {
      this._value.set(null);
      this.onChange(null);
      this.selectionChange.emit(null);
    }
  }

  isSelected(option: SelectOption): boolean {
    const value = this.getOptionValue(option);
    const currentValue = this.value();

    if (this.isMulti()) {
      if (!Array.isArray(currentValue)) return false;
      return currentValue.some(v => this.compareValues(v, value));
    }

    return this.compareValues(currentValue, value);
  }

  private compareValues(a: unknown, b: unknown): boolean {
    // Use strict equality for primitive values
    if (a === b) return true;
    // Handle null/undefined
    if (a == null || b == null) return a === b;
    // For objects, do deep comparison (simple version)
    if (typeof a === 'object' && typeof b === 'object') {
      try {
        return JSON.stringify(a) === JSON.stringify(b);
      } catch {
        return false;
      }
    }
    return false;
  }

  onFilterChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this._filterText.set(target.value);
    this.filterChange.emit(target.value);

    if (this.filter()) {
      this.updateFilteredOptions();
    }
  }

  // Keyboard navigation
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.isOpen()) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        this.open();
        return;
      }
      return;
    }

    const options = this.group() ? this.getFlatOptions() : this.filteredOptions();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusNext(options);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPrevious(options);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        const focused = this.focusedIndex();
        if (focused >= 0 && focused < options.length) {
          this.selectOption(options[focused]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
    }
  }

  private focusNext(options: Array<SelectOption>) {
    let index = this.focusedIndex();
    index = index < options.length - 1 ? index + 1 : 0;

    // Skip disabled options
    while (index < options.length && this.getOptionDisabled(options[index])) {
      index++;
    }

    if (index >= options.length) {
      index = 0;
      while (index < options.length && this.getOptionDisabled(options[index])) {
        index++;
      }
    }

    this._focusedIndex.set(index >= options.length ? -1 : index);
    this.scrollToFocused();
  }

  private focusPrevious(options: Array<SelectOption>) {
    let index = this.focusedIndex();
    index = index > 0 ? index - 1 : options.length - 1;

    // Skip disabled options
    while (index >= 0 && this.getOptionDisabled(options[index])) {
      index--;
    }

    if (index < 0) {
      index = options.length - 1;
      while (index >= 0 && this.getOptionDisabled(options[index])) {
        index--;
      }
    }

    this._focusedIndex.set(index < 0 ? -1 : index);
    this.scrollToFocused();
  }

  private scrollToFocused() {
    setTimeout(() => {
      if (this.panelRef && this.focusedIndex() >= 0) {
        const panel = this.panelRef.nativeElement;
        const focusedElement = panel.querySelector(`[data-option-index="${this.focusedIndex()}"]`) as HTMLElement;
        if (focusedElement) {
          focusedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
    }, 0);
  }

  // ControlValueAccessor implementation
  writeValue(value: unknown) {
    this._value.set(value ?? (this.isMulti() ? [] : null));
  }

  registerOnChange(fn: (value: unknown) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this._disabled.set(isDisabled);
  }

  // Handle outside click
  onOutsideClick() {
    // Don't close if we're in the process of opening
    if (this._isOpening) {
      return;
    }
    if (this.isOpen()) {
      this.close();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getOptionClasses(_option?: SelectOption): string {
    const base = 'flex items-center px-3 py-2 text-sm hover:bg-gray-100 hover:text-primary-900 transition-colors';
    const sizeClasses = {
      sm: 'py-1.5 text-xs',
      md: 'py-2 text-sm',
      lg: 'py-2.5 text-base'
    };
    return classMerge(base, sizeClasses[this.size()]);
  }

  getFlatOptions(): Array<SelectOption> {
    if (this.group()) {
      const groups = this.groupedOptions();
      const flat: Array<SelectOption> = [];
      for (const group of groups) {
        flat.push(...group.items);
      }
      return flat;
    }
    return this.filteredOptions();
  }
}
