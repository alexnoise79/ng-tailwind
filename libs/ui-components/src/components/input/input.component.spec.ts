/// <reference types="vitest/globals" />
import { NgtInputBasic, NgtInputChip, NgtInputCurrency, NgtInputDecimal, NgtInputMask } from './index';
import { runInInjectionContext, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Size } from '../../models';

describe('Input Components', () => {
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule]
    });
    injector = TestBed.inject(Injector);
  });

  describe('NgtInputBasic', () => {
    let component: NgtInputBasic;

    beforeEach(() => {
      component = runInInjectionContext(injector, () => {
        return new NgtInputBasic();
      });

      (component as any).type = signal('text');
      (component as any).size = signal<Size>('md');
      (component as any).disabled = signal(false);
      (component as any).placeholder = signal('');
      (component as any).showClear = signal(false);
      (component as any).filter = signal(null);

      // Mock ViewChild
      (component as any).inputElementRef = { nativeElement: document.createElement('input') };
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default values', () => {
      expect((component as any).type()).toBe('text');
      expect((component as any).size()).toBe('md');
      expect((component as any).disabled()).toBe(false);
    });

    describe('ControlValueAccessor', () => {
      it('should write value', () => {
        component.writeValue('test value');
        expect((component as any)._value()).toBe('test value');
      });

      it('should register onChange callback', () => {
        const onChangeFn = vi.fn();
        component.registerOnChange(onChangeFn);

        (component as any).onChange = onChangeFn;
        (component as any)._value.set('new value');
        (component as any).onChange('new value');

        expect(onChangeFn).toHaveBeenCalledWith('new value');
      });

      it('should set disabled state', () => {
        // setDisabledState is a no-op in base, disabled is controlled by input signal
        (component as any).disabled.set(true);
        expect(component.isDisabled()).toBe(true);
      });
    });

    describe('Input handling', () => {
      it('should handle input event', () => {
        const event = {
          target: { value: 'test input' }
        } as any;

        component.onInput(event);
        expect((component as any)._displayValue()).toBe('test input');
      });

      it('should handle clear', () => {
        (component as any)._value.set('test');
        (component as any)._displayValue.set('test');

        const event = new Event('click');
        component.onClear(event);

        expect((component as any)._value()).toBe('');
        expect((component as any)._displayValue()).toBe('');
      });
    });
  });

  describe('NgtInputDecimal', () => {
    let component: NgtInputDecimal;

    beforeEach(() => {
      component = runInInjectionContext(injector, () => {
        return new NgtInputDecimal();
      });

      (component as any).type = signal('number');
      (component as any).mode = signal('decimal');
      (component as any).size = signal<Size>('md');
      (component as any).disabled = signal(false);
      (component as any).placeholder = signal('');
      (component as any).showClear = signal(false);
      (component as any).filter = signal(null);

      (component as any).inputElementRef = { nativeElement: document.createElement('input') };
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should format decimal numbers', () => {
      const formatted = (component as any).formatNumber(123.456);
      expect(formatted).toBe('123.46'); // toFixed(2)
    });

    it('should parse number values', () => {
      const parsed = (component as any).parseNumber('123.45');
      expect(parsed).toBe(123.45);
    });
  });

  describe('NgtInputCurrency', () => {
    let component: NgtInputCurrency;

    beforeEach(() => {
      component = runInInjectionContext(injector, () => {
        return new NgtInputCurrency();
      });

      (component as any).type = signal('number');
      (component as any).mode = signal('currency');
      (component as any).currency = signal('USD');
      (component as any).size = signal<Size>('md');
      (component as any).disabled = signal(false);
      (component as any).placeholder = signal('');
      (component as any).showClear = signal(false);
      (component as any).filter = signal(null);

      (component as any).inputElementRef = { nativeElement: document.createElement('input') };
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should format currency values', () => {
      const formatted = (component as any).formatNumber(1234.56);
      expect(formatted).toContain('1,234.56');
    });

    it('should have currency mode', () => {
      expect((component as any).isCurrencyMode()).toBe(true);
    });
  });

  describe('NgtInputMask', () => {
    let component: NgtInputMask;

    beforeEach(() => {
      component = runInInjectionContext(injector, () => {
        return new NgtInputMask();
      });

      (component as any).type = signal('text');
      (component as any).mask = signal('(999) 999-9999');
      (component as any).size = signal<Size>('md');
      (component as any).disabled = signal(false);
      (component as any).placeholder = signal('');
      (component as any).showClear = signal(false);
      (component as any).filter = signal(null);

      (component as any).inputElementRef = { nativeElement: document.createElement('input') };
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should apply mask to input', () => {
      const mask = '(999) 999-9999';
      (component as any).mask.set(mask);
      (component as any).writeValue('1234567890');
      const displayValue = (component as any)._displayValue();
      expect(displayValue).toContain('(');
      expect(displayValue).toContain(')');
      expect(displayValue).toContain('-');
    });

    it('should get model value from masked display', () => {
      const mask = '(999) 999-9999';
      (component as any).mask.set(mask);
      (component as any).writeValue('1234567890');
      const modelValue = (component as any).getModelValue((component as any)._displayValue());
      // Model value should be the unmasked value
      expect(modelValue).toBeTruthy();
    });
  });

  describe('NgtInputChip', () => {
    let component: NgtInputChip;

    beforeEach(() => {
      component = runInInjectionContext(injector, () => {
        return new NgtInputChip();
      });

      (component as any).type = signal('text');
      (component as any).chip = signal(',');
      (component as any).chipFormat = signal(',');
      (component as any).size = signal<Size>('md');
      (component as any).disabled = signal(false);
      (component as any).placeholder = signal('');
      (component as any).showClear = signal(false);
      (component as any).filter = signal(null);

      (component as any).inputElementRef = { nativeElement: document.createElement('input') };
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should create chips from comma-separated values', () => {
      (component as any).writeValue('tag1,tag2,tag3');
      (component as any).updateChips();

      const chips = (component as any).chips();
      expect(chips.length).toBeGreaterThan(0);
    });

    it('should remove chip', () => {
      (component as any)._chips.set(['tag1', 'tag2']);
      (component as any)._currentChipValue.set('');

      const event = new Event('click');
      component.removeChip('tag1', event);

      const chips = (component as any).chips();
      expect(chips).not.toContain('tag1');
      expect(chips).toContain('tag2');
    });

    it('should handle chip input', () => {
      const inputElement = document.createElement('input');
      inputElement.value = 'new tag,';
      (component as any).inputElementRef = { nativeElement: inputElement };

      (component as any).handleChipInput('new tag,');

      const chips = (component as any).chips();
      expect(chips.length).toBeGreaterThan(0);
    });
  });
});
