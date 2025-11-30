/// <reference types="vitest/globals" />
import { NgtMobilePrefix } from './mobile-prefix.component';
import { runInInjectionContext, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IPrefix, IMobilePrefix } from '../../models';

describe('NgtMobilePrefix', () => {
  let component: NgtMobilePrefix;
  let injector: Injector;
  const samplePrefixes: Array<IPrefix> = [
    { id: 1, name: 'United States', dialCode: '1', code: 'US' },
    { id: 2, name: 'United Kingdom', dialCode: '44', code: 'GB' },
    { id: 3, name: 'Canada', dialCode: '1', code: 'CA' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule]
    });
    injector = TestBed.inject(Injector);

    component = runInInjectionContext(injector, () => {
      return new NgtMobilePrefix();
    });

    (component as any).values = signal<Array<IPrefix>>(samplePrefixes);
    (component as any).placeholder = signal('');
    (component as any).readonly = signal(false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should initialize with default values', () => {
      expect((component as any).isDisabled).toBeUndefined();
      expect((component as any).model).toBeUndefined();
    });

    it('should initialize model when values are provided', () => {
      const values = (component as any).values();
      expect(values).toBeDefined();
      expect(values.length).toBeGreaterThan(0);
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      const model = new IMobilePrefix('1234567890', samplePrefixes[0]);
      component.writeValue(model);
      expect((component as any).model).toBeDefined();
      expect((component as any).model.phone).toBe('1234567890');
      expect((component as any).model.country).toBe(samplePrefixes[0]);
    });

    it('should write null value', () => {
      component.writeValue(null);
      expect((component as any).model).toBeDefined();
      expect((component as any).model.phone).toBe('');
    });

    it('should write string value', () => {
      component.writeValue('+11234567890');
      expect((component as any).model).toBeDefined();
    });

    it('should register onChange callback', () => {
      const onChangeFn = vi.fn();
      component.registerOnChange(onChangeFn);

      const model = new IMobilePrefix('1234567890', samplePrefixes[0]);
      (component as any).update(model);

      expect(onChangeFn).toHaveBeenCalled();
    });

    it('should register onTouched callback', () => {
      const onTouchedFn = vi.fn();
      component.registerOnTouched(onTouchedFn);

      const event = new Event('blur');
      component.onBlurEvent(event);

      expect(onTouchedFn).toHaveBeenCalled();
    });

    it('should set disabled state', () => {
      component.setDisabledState(true);
      expect((component as any).isDisabled).toBe(true);

      component.setDisabledState(false);
      expect((component as any).isDisabled).toBe(false);
    });
  });

  describe('Update method', () => {
    it('should update model and propagate change when phone and country are provided', () => {
      const onChangeFn = vi.fn();
      component.registerOnChange(onChangeFn);

      const model = new IMobilePrefix('1234567890', samplePrefixes[0]);
      component.update(model);

      expect((component as any).model).toStrictEqual(model);
      expect(onChangeFn).toHaveBeenCalledWith('+11234567890');
    });

    it('should propagate null when phone is empty', () => {
      const onChangeFn = vi.fn();
      component.registerOnChange(onChangeFn);

      const model = new IMobilePrefix('', samplePrefixes[0]);
      component.update(model);

      expect(onChangeFn).toHaveBeenCalledWith(null);
    });

    it('should propagate null when country is not provided', () => {
      const onChangeFn = vi.fn();
      component.registerOnChange(onChangeFn);

      const model = { phone: '1234567890', country: null } as any;
      component.update(model);

      expect(onChangeFn).toHaveBeenCalledWith(null);
    });
  });

  describe('Input handling', () => {
    it('should handle input event and enforce max length', () => {
      const model = new IMobilePrefix('123456789012345678', samplePrefixes[0]);
      (component as any).model = model;

      const input = document.createElement('input');
      input.value = '12345678901234567890';
      const event = { target: input } as any;

      component.onInput(event);

      // Max length should be 17 - prefix length (1) = 16
      expect(input.value.length).toBeLessThanOrEqual(16);
    });

    it('should handle blur event', () => {
      const onTouchedFn = vi.fn();
      component.registerOnTouched(onTouchedFn);

      const blurSpy = vi.spyOn((component as any).blurEvent, 'emit');
      const event = new Event('blur');

      component.onBlurEvent(event);

      expect(onTouchedFn).toHaveBeenCalled();
      expect(blurSpy).toHaveBeenCalledWith(event);
    });
  });

  describe('WriteValue with different formats', () => {
    it('should handle partial IMobilePrefix', () => {
      const partialModel = { phone: '1234567890', country: samplePrefixes[0] };
      component.writeValue(partialModel);

      expect((component as any).model).toBeDefined();
    });

    it('should handle empty string', () => {
      component.writeValue('');
      expect((component as any).model).toBeDefined();
    });

    it('should find matching prefix from phone number string', () => {
      component.writeValue('+441234567890');
      expect((component as any).model).toBeDefined();
      expect((component as any).model.country?.dialCode).toBe('44');
    });
  });

  describe('Input signals', () => {
    it('should have placeholder input', () => {
      (component as any).placeholder.set('Enter phone number');
      expect((component as any).placeholder()).toBe('Enter phone number');
    });

    it('should have readonly input', () => {
      (component as any).readonly.set(true);
      expect((component as any).readonly()).toBe(true);
    });

    it('should have values input', () => {
      const values = (component as any).values();
      expect(values).toBe(samplePrefixes);
    });
  });
});
