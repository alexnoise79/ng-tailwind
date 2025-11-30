/// <reference types="vitest/globals" />
import { NgtCheckbox } from './checkbox.component';
import { runInInjectionContext, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Size } from '../../models';

describe('NgtCheckbox', () => {
  let component: NgtCheckbox;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    injector = TestBed.inject(Injector);

    component = runInInjectionContext(injector, () => {
      return new NgtCheckbox();
    });

    (component as any).size = signal<Size>('md');
    (component as any).label = signal<string | undefined>(undefined);
    (component as any).labelBefore = signal(false);
    (component as any).trueValue = signal<unknown>(true);
    (component as any).falseValue = signal<unknown>(false);
    (component as any).indeterminate = signal(false);

    // Mock checkboxRef
    (component as any).checkboxRef = {
      nativeElement: {
        checked: false,
        indeterminate: false
      }
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Value state', () => {
    it('should be null by default', () => {
      expect(component.value()).toBe(null);
    });

    it('should toggle value between trueValue and falseValue', () => {
      component.writeValue(true);
      expect(component.value()).toBe(true);

      component.toggle();
      expect(component.value()).toBe(false);

      component.toggle();
      expect(component.value()).toBe(true);
    });

    it('should use custom trueValue and falseValue', () => {
      (component as any).trueValue.set('yes');
      (component as any).falseValue.set('no');

      component.writeValue('yes');
      expect(component.value()).toBe('yes');
      expect(component.isChecked()).toBe(true);

      component.toggle();
      expect(component.value()).toBe('no');
      expect(component.isChecked()).toBe(false);
    });
  });

  describe('Disabled state', () => {
    it('should be enabled by default', () => {
      expect(component.isDisabled()).toBe(false);
    });

    it('should set disabled state', () => {
      component.disabled = true;
      expect(component.isDisabled()).toBe(true);
    });

    it('should not toggle when disabled', () => {
      component.writeValue(true);
      component.disabled = true;
      const initialValue = component.value();

      component.toggle();
      expect(component.value()).toBe(initialValue);
    });
  });

  describe('Indeterminate state', () => {
    it('should not be indeterminate by default', () => {
      expect(component.isIndeterminate()).toBe(false);
    });

    it('should set indeterminate state', () => {
      (component as any).indeterminate.set(true);
      expect(component.isIndeterminate()).toBe(true);
    });

    it('should clear indeterminate when toggled', () => {
      (component as any).indeterminate.set(true);
      component.writeValue(false);
      component.toggle();

      const checkboxElement = (component as any).checkboxRef.nativeElement;
      expect(checkboxElement.indeterminate).toBe(false);
    });
  });

  describe('Label', () => {
    it('should not have label by default', () => {
      expect((component as any).label()).toBeUndefined();
    });

    it('should display label', () => {
      (component as any).label.set('Test label');
      expect((component as any).label()).toBe('Test label');
    });

    it('should support labelBefore', () => {
      (component as any).labelBefore.set(true);
      expect((component as any).labelBefore()).toBe(true);
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      component.writeValue(true);
      expect(component.value()).toBe(true);
    });

    it('should handle null value', () => {
      component.writeValue(null);
      expect(component.value()).toBe(false);
    });

    it('should handle undefined value', () => {
      component.writeValue(undefined);
      expect(component.value()).toBe(false);
    });

    it('should register onChange callback', () => {
      const onChangeFn = vi.fn();
      component.registerOnChange(onChangeFn);

      component.toggle();
      expect(onChangeFn).toHaveBeenCalledWith(true);
    });

    it('should register onTouched callback', () => {
      const onTouchedFn = vi.fn();
      component.registerOnTouched(onTouchedFn);

      component.toggle();
      expect(onTouchedFn).toHaveBeenCalled();
    });

    it('should set disabled state', () => {
      component.setDisabledState(true);
      expect(component.isDisabled()).toBe(true);
    });

    it('should handle custom values in writeValue', () => {
      (component as any).trueValue.set('yes');
      (component as any).falseValue.set('no');

      component.writeValue('yes');
      expect(component.value()).toBe('yes');

      component.writeValue('no');
      expect(component.value()).toBe('no');
    });
  });

  describe('Checkbox classes', () => {
    it('should include base classes', () => {
      const classes = component.checkboxClasses();
      expect(classes).toContain('rounded');
      expect(classes).toContain('border-gray-300');
    });

    it('should include size classes', () => {
      (component as any).size.set('sm');
      const classes = component.checkboxClasses();
      expect(classes).toContain('h-3');
      expect(classes).toContain('w-3');
    });
  });

  describe('onCheckboxChange', () => {
    it('should update value when checkbox changes', () => {
      const event = {
        target: {
          checked: true
        }
      } as any;

      component.onCheckboxChange(event);
      expect(component.value()).toBe(true);
    });

    it('should use custom values when checkbox changes', () => {
      (component as any).trueValue.set('yes');
      (component as any).falseValue.set('no');

      const event = {
        target: {
          checked: true
        }
      } as any;

      component.onCheckboxChange(event);
      expect(component.value()).toBe('yes');
    });

    it('should clear indeterminate when checkbox changes', () => {
      (component as any).indeterminate.set(true);
      const checkboxElement = (component as any).checkboxRef.nativeElement;
      checkboxElement.indeterminate = true;

      const event = {
        target: {
          checked: true
        }
      } as any;

      component.onCheckboxChange(event);
      expect(checkboxElement.indeterminate).toBe(false);
    });
  });
});
