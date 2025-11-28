import { LowerCasePipe, SlicePipe } from '@angular/common';
import { Component, effect, EventEmitter, forwardRef, input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IMobilePrefix, IPrefix } from './mobile-prefix';
import { Params } from '@angular/router';


@Component({
  selector: 'mobile-prefix',
  standalone: true,
  templateUrl: './mobile-prefix.component.html',
  styleUrl: './flags.css',
  host: {
    class: 'block w-full'
  },
  styles: [
    `
      @layer components {
        :host.ng-touched.ng-invalid input,
        :host.ng-touched.ng-invalid select {
          border-color: var(--color-secondary-600);
        }
      }
    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MobilePrefixComponent),
      multi: true
    }
  ],
  imports: [
    LowerCasePipe,
    SlicePipe,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MobilePrefixComponent implements ControlValueAccessor {
  /**
   * responsible for disabling a field
   */
  isDisabled!: boolean;
  /**
   * keeps track of value and user interaction of the control and keep the view synced with the model
   *
   * see {@link IMobilePrefix} for the model information
   */
  model!: IMobilePrefix;
  /**
   * placeholder for the input field that we can set from parent component
   */
  placeholder = input<string>('');
  /**
   * the readonly input option that we can pass from parent component
   */
  readonly = input<boolean>(false);
  /**
   * Additional options for the input fields, passed from the JSON form.
   */
  options = input<Params | undefined>(undefined);
  /**
   * outputs the blur effect flow from the child to the parent
   */
  @Output()
  blurEvent = new EventEmitter<Event>(undefined);
  /**
   * Array of country prefixes
   */
  values = input.required<Array<IPrefix>>();

  /**
   * Calculates the maximum length for the phone number input
   * Longest phone number in the world is 17 digits (including prefix)
   * Max length = 17 - prefix length
   */
  get maxLength(): number {
    if (this.model?.country?.dialCode) {
      const prefixLength = this.model.country.dialCode.length;
      return 17 - prefixLength;
    }
    // Default to 15 if no prefix is selected (assuming 2-digit prefix)
    return 15;
  }

  constructor() {
    // Watch for changes to values input and initialize model if needed
    effect(() => {
      const values = this.values();
      if (values && values.length > 0 && (!this.model || !this.model.country)) {
        this.model = new IMobilePrefix('', values[0]);
      }
    });
  }

  /**
   * emits the blur event to the parent element, and it invokes registerOnTouched method
   * @param event
   */
  onBlurEvent(event: Event) {
    this.onTouched();
    this.blurEvent.emit(event);
  }

  /**
   * on change of prefix or mobile input value, we update the model value, and register those changes
   * @param model
   */
  update(model: IMobilePrefix) {
    this.model = model;
    if (model.phone !== '' && model.country) {
      this.propagateChange(model);
    } else {
      this.propagateChange(null);
    }
  }

  /**
   * function when it has countries values, it will find and update the model values, otherwise it will fetch the prefixes updates the countries, and call method again the recursive way
   * @param model
   */
  writeValue(model: Partial<IMobilePrefix> | string | null) {
    const prefixes = this.values();
    
    // Check if the value is the same as what we already have to prevent infinite loops
    if (model === null || model === '') {
      if (prefixes && prefixes.length > 0) {
        const newModel = new IMobilePrefix('', prefixes[0]);
        // Only update if different
        if (!this.model || this.model.phone !== newModel.phone || this.model.country?.dialCode !== newModel.country?.dialCode) {
          this.model = newModel;
        }
      }
      return;
    }

    if (!prefixes || prefixes.length === 0) {
      return;
    }

    const phoneNumber = typeof model === 'string' ? (model as string) : `+${model.country?.dialCode}${model.phone}`;
    const currentValue = this.model ? `+${this.model.country?.dialCode}${this.model.phone}` : '';

    // Only update if the value is actually different
    if (phoneNumber === currentValue) {
      return;
    }

    // Find matching prefix
    for (let i = 1; i <= 4; i++) {
      const target = prefixes.find(x => x.dialCode === phoneNumber.substring(1, i));
      if (target) {
        const newModel = new IMobilePrefix(phoneNumber.substr(i), target);
        // Only update if different
        if (!this.model || this.model.phone !== newModel.phone || this.model.country?.dialCode !== newModel.country?.dialCode) {
          this.model = newModel;
        }
        break;
      }
    }
  }

  /**
   * Registers a callback function that is called when the control's value changes in the UI
   * @param fn
   */
  registerOnChange(fn: () => void) {
    this.propagateChange = fn;
  }

  /**
   * Registers a callback function that is called by the forms API on initialization to update the form model on blur
   * @param fn
   */
  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  /**
   * function that is called by the forms API when the control status changes to or from 'DISABLED'.
   * @param isDisabled
   */
  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  /**
   * we save the given function of registerOnTouched, so that our class calls it when the control should be considered blurred or "touched".
   * @private
   */
  private onTouched() {}

  /**
   * we save the given function from registerOnChange, so our class calls is at the appropriate time.
   * @param _model
   * @private
   */
  private propagateChange(_model: IMobilePrefix | null) {}
}
