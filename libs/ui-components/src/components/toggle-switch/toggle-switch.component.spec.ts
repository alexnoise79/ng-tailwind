/// <reference types="vitest/globals" />
import { NgtToggleSwitch } from './toggle-switch.component';
import { runInInjectionContext, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Size } from '../../models';

describe('NgtToggleSwitch', () => {
  let component: NgtToggleSwitch;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    injector = TestBed.inject(Injector);
    
    component = runInInjectionContext(injector, () => {
      return new NgtToggleSwitch();
    });
    
    (component as any).size = signal<Size>('md');
    (component as any).label = signal<string | undefined>(undefined);
    
    // Mock checkboxRef
    (component as any).checkboxRef = {
      nativeElement: {
        checked: false
      }
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Value state', () => {
    it('should be false by default', () => {
      expect(component.value()).toBe(false);
    });

    it('should toggle value', () => {
      component.toggle();
      expect(component.value()).toBe(true);
      
      component.toggle();
      expect(component.value()).toBe(false);
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
      component.disabled = true;
      const initialValue = component.value();
      
      component.toggle();
      expect(component.value()).toBe(initialValue);
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      component.writeValue(true);
      expect(component.value()).toBe(true);
    });

    it('should handle null value', () => {
      component.writeValue(null as any);
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
  });

  describe('Toggle classes', () => {
    it('should include base classes', () => {
      const classes = component.toggleClasses();
      expect(classes).toContain('relative');
      expect(classes).toContain('inline-flex');
    });

    it('should include active state classes when value is true', () => {
      component.writeValue(true);
      const classes = component.toggleClasses();
      expect(classes).toContain('bg-primary-600');
    });

    it('should include inactive state classes when value is false', () => {
      component.writeValue(false);
      const classes = component.toggleClasses();
      expect(classes).toContain('bg-gray-200');
    });
  });

  describe('Thumb classes', () => {
    it('should include translate classes when value is true', () => {
      component.writeValue(true);
      (component as any).size.set('md');
      const classes = component.thumbClasses();
      expect(classes).toContain('translate-x-4');
    });

    it('should include translate-x-0 when value is false', () => {
      component.writeValue(false);
      const classes = component.thumbClasses();
      expect(classes).toContain('translate-x-0');
    });
  });
});

