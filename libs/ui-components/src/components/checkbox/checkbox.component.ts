import { Component, Input, signal, computed, input, forwardRef, ElementRef, ViewChild, ContentChild, TemplateRef, effect, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { classMerge } from '../../utils';
import { Size } from '../../models';

@Component({
  selector: 'ngt-checkbox',
  imports: [NgTemplateOutlet],
  templateUrl: './checkbox.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgtCheckbox),
      multi: true
    }
  ]
})
export class NgtCheckbox implements ControlValueAccessor, AfterViewInit {
  @Input() set disabled(value: boolean) {
    this._disabled.set(value ?? false);
  }
  private _disabled = signal(false);

  readonly size = input<Size>('md');
  readonly label = input<string>();
  readonly labelBefore = input(false);
  readonly trueValue = input<unknown>(true);
  readonly falseValue = input<unknown>(false);
  readonly indeterminate = input(false);

  @ContentChild('trueTemplate') trueTemplate?: TemplateRef<unknown>;
  @ContentChild('falseTemplate') falseTemplate?: TemplateRef<unknown>;

  @ViewChild('checkbox', { static: true }) checkboxRef!: ElementRef<HTMLInputElement>;

  private _value = signal<unknown>(null);

  private onChange = (_value: unknown) => {
    // Default implementation - will be replaced by registerOnChange
  };
  private onTouched = () => {
    // Default implementation - will be replaced by registerOnTouched
  };

  isDisabled = computed(() => this._disabled());
  value = computed(() => this._value());
  isChecked = computed(() => {
    const val = this._value();
    const trueVal = this.trueValue();
    return val === trueVal;
  });
  isIndeterminate = computed(() => this.indeterminate());
  hasTemplates = computed(() => !!(this.trueTemplate || this.falseTemplate));

  checkboxClasses = computed(() => {
    const baseClasses = 'rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors';
    const sizeClasses = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5'
    };
    return classMerge(baseClasses, sizeClasses[this.size()]);
  });

  labelClasses = computed(() => {
    return classMerge('text-sm font-medium text-gray-700 dark:text-gray-300 select-none', this.isDisabled() ? 'opacity-50' : '');
  });

  containerClasses = computed(() => {
    return classMerge('flex items-center gap-2', this.isDisabled() ? 'cursor-not-allowed' : 'cursor-pointer');
  });

  constructor() {
    // Sync indeterminate state when it changes
    effect(() => {
      const indeterminate = this.indeterminate();
      const checked = this.isChecked();
      if (this.checkboxRef?.nativeElement) {
        this.checkboxRef.nativeElement.indeterminate = indeterminate && !checked;
      }
    });
  }

  ngAfterViewInit() {
    // Set initial indeterminate state
    if (this.checkboxRef?.nativeElement) {
      this.checkboxRef.nativeElement.indeterminate = this.indeterminate() && !this.isChecked();
    }
  }

  toggle(event?: Event) {
    if (this.isDisabled()) {
      return;
    }
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const currentValue = this._value();
    const trueVal = this.trueValue();
    const falseVal = this.falseValue();
    const newValue = currentValue === trueVal ? falseVal : trueVal;

    this._value.set(newValue);
    if (this.checkboxRef?.nativeElement) {
      this.checkboxRef.nativeElement.checked = newValue === trueVal;
      this.checkboxRef.nativeElement.indeterminate = false;
    }
    this.onChange(newValue);
    this.onTouched();
  }

  onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const trueVal = this.trueValue();
    const falseVal = this.falseValue();
    const newValue = target.checked ? trueVal : falseVal;

    this._value.set(newValue);
    if (this.checkboxRef?.nativeElement) {
      this.checkboxRef.nativeElement.indeterminate = false;
    }
    this.onChange(newValue);
    this.onTouched();
  }

  // ControlValueAccessor implementation
  writeValue(value: unknown) {
    if (value === null || value === undefined) {
      this._value.set(this.falseValue());
    } else {
      this._value.set(value);
    }

    if (this.checkboxRef?.nativeElement) {
      const trueVal = this.trueValue();
      const isChecked = this._value() === trueVal;
      this.checkboxRef.nativeElement.checked = isChecked;
      this.checkboxRef.nativeElement.indeterminate = this.indeterminate() && !isChecked;
    }
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
}
