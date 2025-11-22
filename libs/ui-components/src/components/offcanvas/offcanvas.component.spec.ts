/// <reference types="vitest/globals" />
import { NgtOffCanvas, OffcanvasPosition } from './offcanvas.component';
import { runInInjectionContext, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

describe('NgtOffCanvas', () => {
  let component: NgtOffCanvas;
  let injector: Injector;
  let mockDocument: Partial<Document>;

  beforeEach(() => {
    mockDocument = {
      body: {
        style: {
          overflow: ''
        }
      } as any,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [{ provide: DOCUMENT, useValue: mockDocument }]
    });
    injector = TestBed.inject(Injector);

    component = runInInjectionContext(injector, () => {
      return new NgtOffCanvas();
    });

    (component as any).title = signal<string | undefined>(undefined);
    (component as any).position = signal<OffcanvasPosition>('end');
    (component as any).showHeader = signal(true);
    (component as any).closeOnBackdropClick = signal(true);
    (component as any).backdrop = signal(true);
  });

  afterEach(() => {
    if (component) {
      try {
        component.ngOnDestroy();
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isOpen state', () => {
    it('should be closed by default', () => {
      expect(component.isOpen()).toBe(false);
    });

    it('should set isOpen with boolean value', () => {
      component.isOpen = true;
      expect(component.isOpen()).toBe(true);
    });

    it('should set isOpen with signal value', () => {
      const openSignal = signal(true);
      component.isOpen = openSignal;
      expect(component.isOpen()).toBe(true);
    });
  });

  describe('Position classes', () => {
    const positions: OffcanvasPosition[] = ['start', 'end', 'top', 'bottom'];

    positions.forEach(position => {
      it(`should return correct classes for ${position} position`, () => {
        (component as any).position.set(position);
        const classes = component.getPositionClasses();
        expect(classes).toContain('fixed');
        expect(classes).toContain('z-50');
      });
    });
  });

  describe('Width classes', () => {
    it('should return w-full for top position', () => {
      (component as any).position.set('top');
      expect(component.getWidthClasses()).toContain('w-full');
    });

    it('should return w-full for bottom position', () => {
      (component as any).position.set('bottom');
      expect(component.getWidthClasses()).toContain('w-full');
    });

    it('should return responsive width classes for start/end', () => {
      (component as any).position.set('start');
      const classes = component.getWidthClasses();
      expect(classes).toContain('w-full');
    });
  });

  describe('Close handling', () => {
    it('should emit closed event', () => {
      let closedEmitted = false;
      component.closed.subscribe(() => {
        closedEmitted = true;
      });

      component.handleClose();
      expect(closedEmitted).toBe(true);
    });

    it('should close on backdrop click if enabled', () => {
      (component as any).closeOnBackdropClick.set(true);
      let closedEmitted = false;
      component.closed.subscribe(() => {
        closedEmitted = true;
      });

      component.onBackdropClick();
      expect(closedEmitted).toBe(true);
    });

    it('should not close on backdrop click if disabled', () => {
      (component as any).closeOnBackdropClick.set(false);
      let closedEmitted = false;
      component.closed.subscribe(() => {
        closedEmitted = true;
      });

      component.onBackdropClick();
      expect(closedEmitted).toBe(false);
    });
  });
});
