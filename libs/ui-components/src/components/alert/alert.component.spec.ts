/// <reference types="vitest/globals" />
import { NgtAlert, AlertVariant } from './alert.component';
import { runInInjectionContext, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

describe('NgtAlert', () => {
  let component: NgtAlert;
  let injector: Injector;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({});
    injector = TestBed.inject(Injector);
    
    component = runInInjectionContext(injector, () => {
      return new NgtAlert();
    });
    
    (component as any).variant = signal<AlertVariant>('info');
    (component as any).dismissible = signal(false);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Visibility', () => {
    it('should be visible by default', () => {
      expect(component.isVisibleValue()).toBe(true);
    });

    it('should hide when dismissed if dismissible', () => {
      (component as any).dismissible.set(true);
      let closeEmitted = false;
      component.close.subscribe(() => {
        closeEmitted = true;
      });

      component.handleClose();
      
      expect(component.isVisibleValue()).toBe(false);
      expect(closeEmitted).toBe(false);
      
      // Advance time to trigger the setTimeout
      vi.advanceTimersByTime(300);
      expect(closeEmitted).toBe(true);
    });

    it('should not hide when dismissed if not dismissible', () => {
      (component as any).dismissible.set(false);
      
      component.handleClose();
      
      expect(component.isVisibleValue()).toBe(true);
    });
  });

  describe('Variants', () => {
    const variants: AlertVariant[] = ['success', 'info', 'warning', 'danger', 'primary', 'secondary', 'light', 'dark'];
    
    variants.forEach(variant => {
      it(`should apply correct classes for ${variant} variant`, () => {
        (component as any).variant.set(variant);
        const classes = component.alertClasses();
        expect(classes).toContain('flex');
        expect(classes).toContain('items-start');
      });

      it(`should have correct icon classes for ${variant} variant`, () => {
        (component as any).variant.set(variant);
        const iconClasses = component.iconClasses();
        expect(iconClasses).toContain('shrink-0');
      });

      it(`should have default icon for ${variant} variant`, () => {
        (component as any).variant.set(variant);
        const icon = component.defaultIcon();
        expect(icon).toBeTruthy();
        expect(icon.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Alert classes', () => {
    it('should include base classes', () => {
      const classes = component.alertClasses();
      expect(classes).toContain('flex');
      expect(classes).toContain('items-start');
      expect(classes).toContain('rounded-lg');
    });

    it('should include visibility classes when visible', () => {
      expect(component.alertClasses()).toContain('opacity-100');
    });

    it('should include visibility classes when hidden', () => {
      (component as any).dismissible.set(true);
      component.handleClose();
      expect(component.alertClasses()).toContain('opacity-0');
    });
  });
});

