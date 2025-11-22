/// <reference types="vitest/globals" />
import { NgtTooltip, TooltipPosition } from './tooltip.component';
import { runInInjectionContext, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

describe('NgtTooltip', () => {
  let component: NgtTooltip;
  let injector: Injector;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({});
    injector = TestBed.inject(Injector);

    component = runInInjectionContext(injector, () => {
      return new NgtTooltip();
    });

    (component as any).text = signal('Test tooltip');
    (component as any).position = signal<TooltipPosition>('top');
    (component as any).delay = signal(200);
  });

  afterEach(() => {
    vi.useRealTimers();
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Visibility', () => {
    it('should be hidden by default', () => {
      expect(component.isVisible()).toBe(false);
    });

    it('should show after delay', () => {
      component.show();
      expect(component.isVisible()).toBe(false);

      vi.advanceTimersByTime(200);
      expect(component.isVisible()).toBe(true);
    });

    it('should hide immediately', () => {
      component.show();
      vi.advanceTimersByTime(200);
      expect(component.isVisible()).toBe(true);

      component.hide();
      vi.advanceTimersByTime(50);
      expect(component.isVisible()).toBe(false);
    });
  });

  describe('Position classes', () => {
    const positions: TooltipPosition[] = ['top', 'bottom', 'left', 'right'];

    positions.forEach(position => {
      it(`should return correct classes for ${position} position`, () => {
        (component as any).position.set(position);
        const classes = component.tooltipClasses();
        expect(classes).toContain('absolute');
        expect(classes).toContain('z-50');
      });
    });
  });

  describe('Lifecycle', () => {
    it('should cleanup timeouts on destroy', () => {
      component.show();
      expect(component.isVisible()).toBe(false);

      // Verify timeout is set
      const showTimeout = (component as any).showTimeout;
      expect(showTimeout).toBeDefined();

      // Spy on clearTimeout to verify it's called
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

      // Destroy should clear timeouts and not throw
      component.ngOnDestroy();

      // Verify clearTimeout was called to clean up timeouts
      // hide() is called first, which may set hideTimeout, then both are cleared
      expect(clearTimeoutSpy).toHaveBeenCalled();
      // After destroy, showTimeout should be cleared (set to undefined by hide())
      expect((component as any).showTimeout).toBeUndefined();
      // hide() is called which sets visibility to false
      expect(component.isVisible()).toBe(false);

      // Advance timers to ensure no timers are still pending
      vi.advanceTimersByTime(300);

      clearTimeoutSpy.mockRestore();
    });
  });
});
