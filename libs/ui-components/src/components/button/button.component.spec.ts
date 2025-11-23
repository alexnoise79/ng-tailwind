/// <reference types="vitest/globals" />
import { NgtButton, ButtonVariant } from './button.component';
import { runInInjectionContext, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Size } from '../../models';

describe('NgtButton', () => {
  let component: NgtButton;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    injector = TestBed.inject(Injector);

    component = runInInjectionContext(injector, () => {
      return new NgtButton();
    });

    (component as any).variant = signal<ButtonVariant>('primary');
    (component as any).size = signal<Size>('md');
    (component as any).type = signal<'button' | 'submit' | 'reset'>('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Disabled state', () => {
    it('should be enabled by default', () => {
      expect(component.isDisabled()).toBe(false);
    });

    it('should set disabled state', () => {
      component.disabled = true;
      expect(component.isDisabled()).toBe(true);
    });

    it('should handle null disabled value', () => {
      component.disabled = null as any;
      expect(component.isDisabled()).toBe(false);
    });
  });

  describe('Loading state', () => {
    it('should not be loading by default', () => {
      expect(component.isLoading()).toBe(false);
    });

    it('should set loading state', () => {
      component.loading = true;
      expect(component.isLoading()).toBe(true);
    });

    it('should handle null loading value', () => {
      component.loading = null as any;
      expect(component.isLoading()).toBe(false);
    });
  });

  describe('Variants', () => {
    const variants: ButtonVariant[] = ['primary', 'outline', 'ghost'];

    variants.forEach(variant => {
      it(`should apply correct classes for ${variant} variant`, () => {
        (component as any).variant.set(variant);
        const classes = component.buttonClasses();
        expect(classes).toContain('inline-flex');
        expect(classes).toContain('items-center');
      });
    });

    it('should have primary variant classes', () => {
      (component as any).variant.set('primary');
      const classes = component.buttonClasses();
      expect(classes).toContain('bg-primary-600');
    });

    it('should have outline variant classes', () => {
      (component as any).variant.set('outline');
      const classes = component.buttonClasses();
      expect(classes).toContain('border');
    });

    it('should have ghost variant classes', () => {
      (component as any).variant.set('ghost');
      const classes = component.buttonClasses();
      expect(classes).toContain('text-primary-600');
    });
  });

  describe('Sizes', () => {
    const sizes: Size[] = ['sm', 'md', 'lg'];

    sizes.forEach(size => {
      it(`should apply correct classes for ${size} size`, () => {
        (component as any).size.set(size);
        const classes = component.buttonClasses();
        expect(classes).toContain('inline-flex');
      });
    });
  });

  describe('Click handling', () => {
    it('should prevent default when disabled', () => {
      component.disabled = true;
      const event = new Event('click');
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

      component.handleClick(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(stopPropagationSpy).toHaveBeenCalled();
    });

    it('should prevent default when loading', () => {
      component.loading = true;
      const event = new Event('click');
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

      component.handleClick(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(stopPropagationSpy).toHaveBeenCalled();
    });

    it('should not prevent default when enabled and not loading', () => {
      component.disabled = false;
      component.loading = false;
      const event = new Event('click');
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      component.handleClick(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });
  });

  describe('Button classes', () => {
    it('should include base classes', () => {
      const classes = component.buttonClasses();
      expect(classes).toContain('inline-flex');
      expect(classes).toContain('items-center');
      expect(classes).toContain('justify-center');
      expect(classes).toContain('font-medium');
      expect(classes).toContain('rounded-md');
    });

    it('should include disabled classes', () => {
      const classes = component.buttonClasses();
      expect(classes).toContain('disabled:opacity-50');
      expect(classes).toContain('disabled:cursor-not-allowed');
    });
  });
});
