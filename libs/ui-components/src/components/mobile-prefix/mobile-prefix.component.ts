import { LowerCasePipe, SlicePipe } from '@angular/common';
import { Component, effect, EventEmitter, forwardRef, input, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IMobilePrefix, IPrefix } from '../../models';
import { Params } from '@angular/router';

@Component({
  selector: 'ngt-mobile-prefix',
  standalone: true,
  templateUrl: './mobile-prefix.component.html',
  styleUrl: './flags.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'block w-full'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgtMobilePrefix),
      multi: true
    }
  ],
  imports: [LowerCasePipe, SlicePipe, ReactiveFormsModule, FormsModule]
})
export class NgtMobilePrefix implements ControlValueAccessor {
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
   * When true, the component returns an IMobilePrefix object instead of a string.
   * When false (default), the component returns a string in the format +{dialCode}{phone}.
   * Note: writeValue accepts both string and object formats regardless of this setting.
   */
  returnAsObject = input<boolean>(false);
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
   * Handles input event to enforce maxLength on number input
   * Longest phone number in the world is 17 digits (including prefix)
   * Max length = 17 - prefix length
   * @param event
   */
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Calculate max length: 17 digits total minus prefix length
    let maxLen = 15; // Default if no prefix is selected (assuming 2-digit prefix)
    if (this.model?.country?.dialCode) {
      const prefixLength = this.model.country.dialCode.length;
      maxLen = 17 - prefixLength;
    }

    if (value.length > maxLen) {
      input.value = value.slice(0, maxLen);
      // Update model with truncated value (ensure it's stored as string)
      if (this.model) {
        this.model.phone = input.value;
        this.update({ phone: input.value, country: this.model.country });
      }
    }
  }

  /**
   * on change of prefix or mobile input value, we update the model value, and register those changes
   * @param model
   */
  update(model: IMobilePrefix) {
    // Convert phone to string and trim (handles both string and number types from number input)
    const phoneStr = model.phone != null ? String(model.phone) : '';
    const phoneValue = phoneStr.trim();

    // Update model with string phone value
    this.model = new IMobilePrefix(phoneValue, model.country);

    // Return null if phone is empty, null, undefined, or only whitespace (for validation purposes)
    if (phoneValue === '' || !model.country) {
      this.propagateChange(null);
      return;
    }

    // Phone has a value, return the appropriate format
    if (this.returnAsObject()) {
      // Return object with trimmed phone value
      this.propagateChange(this.model);
    } else {
      // Return string (default behavior)
      const stringValue = `+${model.country.dialCode}${phoneValue}`;
      this.propagateChange(stringValue);
    }
  }

  /**
   * Accepts both string format (+{dialCode}{phone}) and IMobilePrefix object (or partial object).
   * When receiving an object, it can be a full IMobilePrefix or a partial object with phone and/or country.
   * @param model - Can be a string, IMobilePrefix object, partial object, or null
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

    // Handle string input
    if (typeof model === 'string') {
      const phoneNumber = model;
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
      return;
    }

    // Handle object input (full or partial IMobilePrefix)
    const objectModel = model as Partial<IMobilePrefix>;

    // If we have both phone and country, use them directly
    if (objectModel.phone !== undefined && objectModel.country) {
      const newModel = new IMobilePrefix(objectModel.phone, objectModel.country);
      // Only update if different
      if (!this.model || this.model.phone !== newModel.phone || this.model.country?.dialCode !== newModel.country?.dialCode) {
        this.model = newModel;
      }
      return;
    }

    // If we only have phone, use current country or default to first prefix
    if (objectModel.phone !== undefined && !objectModel.country) {
      const country = this.model?.country || prefixes[0];
      const newModel = new IMobilePrefix(objectModel.phone, country);
      // Only update if different
      if (!this.model || this.model.phone !== newModel.phone || this.model.country?.dialCode !== newModel.country?.dialCode) {
        this.model = newModel;
      }
      return;
    }

    // If we only have country, update country but keep existing phone
    if (objectModel.country && !objectModel.phone) {
      const phone = this.model?.phone || '';
      const newModel = new IMobilePrefix(phone, objectModel.country);
      // Only update if different
      if (!this.model || this.model.country?.dialCode !== newModel.country?.dialCode) {
        this.model = newModel;
      }
      return;
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
   * @param _value - Can be IMobilePrefix object, string, or null depending on returnAsString setting
   * @private
   */
  private propagateChange(_value: IMobilePrefix | string | null) {}
}
