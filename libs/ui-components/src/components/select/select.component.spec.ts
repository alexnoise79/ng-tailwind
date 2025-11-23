/// <reference types="vitest/globals" />
import { NgtSelect } from './select.component';
import { runInInjectionContext, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Size } from '../../models';

describe('NgtSelect', () => {
  let component: NgtSelect;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    injector = TestBed.inject(Injector);

    component = runInInjectionContext(injector, () => {
      return new NgtSelect();
    });

    (component as any).size = signal<Size>('md');
    (component as any).checkmark = signal(false);
    (component as any).showClear = signal(false);
    (component as any).multiselect = signal(false);
    (component as any).group = signal(false);
    (component as any).filter = signal(false);
    (component as any).fluid = signal(false);
    (component as any).invalid = signal(false);
    (component as any).editable = signal(false);

    // Mock ViewChild refs
    (component as any).triggerRef = { nativeElement: {} };
    (component as any).inputRef = { nativeElement: {} };
    (component as any).filterInputRef = { nativeElement: {} };
    (component as any).panelRef = { nativeElement: {} };
  });

  afterEach(() => {
    if (component) {
      component.ngOnDestroy();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Options processing', () => {
    it('should process primitive options', () => {
      component.options = ['Option 1', 'Option 2', 'Option 3'];
      component.ngOnInit();

      const processed = component.processedOptions();
      expect(processed.length).toBe(3);
      if (processed.length > 0) {
        expect(processed[0].label).toBe('Option 1');
      }
    });

    it('should process object options', () => {
      component.options = [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' }
      ];
      component.ngOnInit();

      const processed = component.processedOptions();
      expect(processed.length).toBe(2);
    });
  });

  describe('Toggle', () => {
    it('should toggle open state', () => {
      expect(component.isOpen()).toBe(false);

      component.toggle();
      expect(component.isOpen()).toBe(true);

      component.toggle();
      expect(component.isOpen()).toBe(false);
    });

    it('should not toggle when disabled', () => {
      (component as any).disabled = signal(true);
      component.toggle();
      expect(component.isOpen()).toBe(false);
    });
  });

  describe('Select option', () => {
    it('should select option in single select mode', () => {
      component.options = [{ label: 'Option 1', value: 'opt1' }];
      component.ngOnInit();

      let emittedValue: unknown;
      component.selectionChange.subscribe(value => {
        emittedValue = value;
      });

      const option = component.processedOptions()[0];
      component.selectOption(option);

      expect(component.value()).toBe('opt1');
      expect(emittedValue).toBe('opt1');
    });

    it('should select multiple options in multiselect mode', () => {
      (component as any).multiselect.set(true);
      component.options = [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' }
      ];
      component.ngOnInit();

      const options = component.processedOptions();
      component.selectOption(options[0]);
      component.selectOption(options[1]);

      const value = component.value();
      expect(Array.isArray(value)).toBe(true);
      expect((value as unknown[]).length).toBe(2);
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      component.writeValue('opt1');
      expect(component.value()).toBe('opt1');
    });

    it('should register onChange callback', () => {
      const onChangeFn = vi.fn();
      component.registerOnChange(onChangeFn);

      component.options = [{ label: 'Option 1', value: 'opt1' }];
      component.ngOnInit();
      const option = component.processedOptions()[0];
      component.selectOption(option);

      expect(onChangeFn).toHaveBeenCalled();
    });

    it('should set disabled state', () => {
      component.setDisabledState(true);
      expect(component.isDisabled()).toBe(true);
    });
  });

  describe('Clear', () => {
    it('should clear selection', () => {
      component.writeValue('opt1');
      expect(component.value()).toBe('opt1');

      const event = new Event('click');
      component.clear(event);

      expect(component.value()).toBeNull();
    });
  });
});
