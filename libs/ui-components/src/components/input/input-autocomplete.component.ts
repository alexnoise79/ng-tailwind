import { Component, Input, forwardRef, OnInit, OnDestroy, computed, signal, ViewChild, ElementRef, ContentChild, TemplateRef, HostListener, inject, input, output } from '@angular/core';
import { NgTemplateOutlet, DOCUMENT } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgtInputBase, InputType } from './input-base.component';
import { OutsideClickDirective } from '../../directives';
import { Size } from '../../models';

export interface AutoCompleteSelectEvent {
  originalEvent: Event;
  value: unknown;
}

@Component({
  selector: 'ngt-input[autocomplete], ngt-input[completeMethod]',
  imports: [FormsModule, NgTemplateOutlet, OutsideClickDirective],
  templateUrl: './input-autocomplete.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgtInputAutocomplete),
      multi: true
    }
  ]
})
export class NgtInputAutocomplete extends NgtInputBase implements OnInit, OnDestroy {
  // Core inputs
  readonly type = input<InputType>('text');
  readonly size = input<Size>('md');
  readonly disabled = input<boolean>(false);
  readonly placeholder = input<string>('');
  readonly showClear = input<boolean>(false);
  readonly filter = input<Array<string> | RegExp | null>(null);

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

  // Outputs
  readonly valueChange = output<string | number>();

  // Content templates
  @ContentChild('item') itemTemplate?: TemplateRef<unknown>;
  @ContentChild('loader') loaderTemplate?: TemplateRef<unknown>;

  @ViewChild('autocompletePanel') autocompletePanelRef?: ElementRef<HTMLElement>;

  // Autocomplete state
  private _suggestions = signal<Array<unknown>>([]);
  private _isLoading = signal<boolean>(false);
  private _showPanel = signal<boolean>(false);
  private _focusedIndex = signal<number>(-1);
  private _query = signal<string>('');
  private _debounceTimer?: ReturnType<typeof setTimeout>;
  private _escapeListener?: (event: KeyboardEvent) => void;
  private _isFocused = signal(false);
  private document = inject(DOCUMENT);

  // Autocomplete computed
  hasAutocomplete = computed(() => this._completeMethod() !== null);
  suggestions = computed(() => this._suggestions());
  isLoading = computed(() => this._isLoading());
  showPanel = computed(() => this._showPanel() && this.hasAutocomplete() && (this.isLoading() || this.suggestions().length > 0));
  focusedIndex = computed(() => this._focusedIndex());

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();

    // Autocomplete doesn't work with number type
    if (this.type() === 'number') {
      console.warn('Autocomplete input does not work with type="number". Consider using type="text".');
    }

    // Setup keyboard listeners for autocomplete
    if (this.hasAutocomplete()) {
      this.setupKeyboardListeners();
    }
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
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

  protected override handleNormalInput(value: string) {
    super.handleNormalInput(value);

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

  override onFocus() {
    super.onFocus();
    this._isFocused.set(true);
    // Show panel if we have suggestions and autocomplete is enabled
    if (this.hasAutocomplete() && this.suggestions().length > 0) {
      this._showPanel.set(true);
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

  override onBlur() {
    super.onBlur();
    this._isFocused.set(false);
    // Hide panel on blur (with slight delay to allow click events)
    setTimeout(() => {
      if (!this._isFocused()) {
        this.hidePanel();
      }
    }, 200);
  }
}
