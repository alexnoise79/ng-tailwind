/// <reference types="vitest/globals" />
import { NgtProgressbar } from './progressbar.component';
import { Variant } from '../../models';
import { runInInjectionContext, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

describe('NgtProgressbar', () => {
  let component: NgtProgressbar;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    injector = TestBed.inject(Injector);

    component = runInInjectionContext(injector, () => {
      return new NgtProgressbar();
    });

    (component as any).value = signal(0);
    (component as any).animated = signal(undefined);
    (component as any).ariaLabel = signal(undefined);
    (component as any).height = signal(undefined);
    (component as any).max = signal(undefined);
    (component as any).showValue = signal(undefined);
    (component as any).striped = signal(undefined);
    (component as any).textType = signal(undefined);
    (component as any).type = signal(undefined);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Value calculations', () => {
    it('should calculate percentage correctly', () => {
      (component as any).value.set(50);
      expect(component.percentage()).toBe(50);
    });

    it('should calculate percentage with custom max', () => {
      (component as any).max.set(200);
      (component as any).value.set(100);
      expect(component.percentage()).toBe(50);
    });

    it('should clamp value to 0 when negative', () => {
      (component as any).value.set(-10);
      expect(component.currentValue()).toBe(0);
    });

    it('should clamp value to max when exceeding max', () => {
      (component as any).max.set(100);
      (component as any).value.set(150);
      expect(component.currentValue()).toBe(100);
    });

    it('should default max to 100 when invalid', () => {
      (component as any).max.set(-10);
      expect(component.maxValue()).toBe(100);
    });

    it('should default max to 100 when 0', () => {
      (component as any).max.set(0);
      expect(component.maxValue()).toBe(100);
    });
  });

  describe('Configuration defaults', () => {
    it('should use config default for animated', () => {
      expect(component.animatedValue()).toBe(false);
    });

    it('should use config default for ariaLabel', () => {
      expect(component.ariaLabelValue()).toBe('progress bar');
    });

    it('should use config default for max', () => {
      expect(component.maxValue()).toBe(100);
    });

    it('should use config default for showValue', () => {
      expect(component.showValueValue()).toBe(false);
    });

    it('should use config default for striped', () => {
      expect(component.stripedValue()).toBe(false);
    });

    it('should override config with input value', () => {
      (component as any).animated.set(true);
      expect(component.animatedValue()).toBe(true);
    });
  });

  describe('Variants', () => {
    const variants: Variant[] = ['success', 'info', 'warning', 'danger', 'primary', 'secondary', 'light', 'dark'];

    variants.forEach(variant => {
      it(`should apply correct classes for ${variant} type`, () => {
        (component as any).type.set(variant);
        const classes = component.progressbarInnerClasses();
        expect(classes).toContain('h-full');
        expect(classes).toContain('transition-all');
      });
    });

    it('should default to blue-500 when no type specified', () => {
      const classes = component.progressbarInnerClasses();
      expect(classes).toContain('bg-blue-500');
    });
  });

  describe('Striped and animated', () => {
    it('should apply striped class when striped is true', () => {
      (component as any).striped.set(true);
      const classes = component.progressbarInnerClasses();
      expect(classes).toContain('progress-bar-striped');
    });

    it('should apply animated class when both striped and animated are true', () => {
      (component as any).striped.set(true);
      (component as any).animated.set(true);
      const classes = component.progressbarInnerClasses();
      expect(classes).toContain('progress-bar-striped');
      expect(classes).toContain('animate-stripes');
    });

    it('should not apply animated class when striped is false', () => {
      (component as any).striped.set(false);
      (component as any).animated.set(true);
      const classes = component.progressbarInnerClasses();
      expect(classes).not.toContain('animate-stripes');
    });
  });

  describe('Progress bar classes', () => {
    it('should include base classes', () => {
      const classes = component.progressbarClasses();
      expect(classes).toContain('w-full');
      expect(classes).toContain('bg-gray-200');
      expect(classes).toContain('rounded-full');
    });

    it('should include default height when height is not set', () => {
      const classes = component.progressbarClasses();
      expect(classes).toContain('h-2');
    });
  });

  describe('Progress bar percentage', () => {
    it('should calculate percentage correctly for width binding', () => {
      (component as any).value.set(50);
      expect(component.percentage()).toBe(50);
    });

    it('should handle 0 percentage', () => {
      (component as any).value.set(0);
      expect(component.percentage()).toBe(0);
    });

    it('should handle 100 percentage', () => {
      (component as any).value.set(100);
      expect(component.percentage()).toBe(100);
    });
  });

  describe('Progress bar height', () => {
    it('should return undefined when height is not set', () => {
      expect(component.heightValue()).toBeUndefined();
    });

    it('should return height value when set', () => {
      (component as any).height.set('3rem');
      expect(component.heightValue()).toBe('3rem');
    });
  });

  describe('Text classes', () => {
    it('should include base text classes', () => {
      const classes = component.textClasses();
      expect(classes).toContain('text-xs');
      expect(classes).toContain('font-medium');
    });

    it('should default to white text when no textType specified', () => {
      const classes = component.textClasses();
      expect(classes).toContain('text-white');
    });

    const variants: Variant[] = ['success', 'info', 'warning', 'danger', 'primary', 'secondary', 'light', 'dark'];

    variants.forEach(variant => {
      it(`should apply correct text classes for ${variant} textType`, () => {
        (component as any).textType.set(variant);
        const classes = component.textClasses();
        expect(classes).toContain('text-xs');
        expect(classes).toContain('font-medium');
      });
    });
  });
});
