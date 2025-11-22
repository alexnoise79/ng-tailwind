/// <reference types="vitest/globals" />
import { NgtToast, ToastSeverity } from './toast.component';
import { runInInjectionContext, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

describe('NgtToast', () => {
  let component: NgtToast;
  let injector: Injector;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({});
    injector = TestBed.inject(Injector);
    
    component = runInInjectionContext(injector, () => {
      return new NgtToast();
    });
    
    (component as any).toastElement = { nativeElement: {} };
  });

  afterEach(() => {
    vi.useRealTimers();
    if (component) {
      component.ngOnDestroy();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Close', () => {
    it('should emit closed event when close is called', () => {
      let closedEmitted = false;
      component.closed.subscribe(() => {
        closedEmitted = true;
      });
      
      component.close();
      vi.advanceTimersByTime(300);
      
      expect(closedEmitted).toBe(true);
    });

    it('should close if closable', () => {
      component.closable = true;
      let closedEmitted = false;
      component.closed.subscribe(() => {
        closedEmitted = true;
      });
      
      component.handleClose();
      vi.advanceTimersByTime(300);
      
      expect(closedEmitted).toBe(true);
    });

    it('should not close if not closable', () => {
      component.closable = false;
      let closedEmitted = false;
      component.closed.subscribe(() => {
        closedEmitted = true;
      });
      
      component.handleClose();
      
      expect(closedEmitted).toBe(false);
    });
  });

  describe('Severity', () => {
    const severities: ToastSeverity[] = ['success', 'info', 'warning', 'danger'];
    
    severities.forEach(severity => {
      it(`should apply correct classes for ${severity} severity`, () => {
        component.severity = severity;
        const classes = component.toastClasses();
        expect(classes).toContain('flex');
        expect(classes).toContain('items-start');
      });
    });
  });

  describe('Lifecycle', () => {
    it('should initialize', () => {
      component.ngOnInit();
      
      // After initialization, component should be ready
      expect(component).toBeTruthy();
      expect(component.toastId).toBeDefined();
      
      // Visibility signal should be initialized
      const isVisible = (component as any).isVisible;
      expect(isVisible).toBeDefined();
      expect(isVisible()).toBe(false); // Initially false before setTimeout
      
      // Advance time to trigger the setTimeout that sets visibility to true
      vi.advanceTimersByTime(10);
      expect(isVisible()).toBe(true); // Should be true after delay
      
      // Component should be properly initialized without errors
      expect(component).toBeTruthy();
    });
  });
});

