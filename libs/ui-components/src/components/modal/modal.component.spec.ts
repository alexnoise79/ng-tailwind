/// <reference types="vitest/globals" />
import { NgtModal } from './modal.component';
import { runInInjectionContext, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

describe('NgtModal', () => {
  let component: NgtModal;
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
      return new NgtModal();
    });
    
    (component as any).title = signal<string | undefined>(undefined);
    (component as any).showFooter = signal(false);
    (component as any).closeOnBackdropClick = signal(true);
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
      
      openSignal.set(false);
      expect(component.isOpen()).toBe(false);
    });
  });

  describe('Close handling', () => {
    it('should emit closed event when handleClose is called', () => {
      let closedEmitted = false;
      component.closed.subscribe(() => {
        closedEmitted = true;
      });
      
      component.handleClose();
      expect(closedEmitted).toBe(true);
    });

    it('should close on backdrop click if closeOnBackdropClick is true', () => {
      (component as any).closeOnBackdropClick.set(true);
      let closedEmitted = false;
      component.closed.subscribe(() => {
        closedEmitted = true;
      });
      
      component.onBackdropClick();
      expect(closedEmitted).toBe(true);
    });

    it('should not close on backdrop click if closeOnBackdropClick is false', () => {
      (component as any).closeOnBackdropClick.set(false);
      let closedEmitted = false;
      component.closed.subscribe(() => {
        closedEmitted = true;
      });
      
      component.onBackdropClick();
      expect(closedEmitted).toBe(false);
    });
  });

  describe('Lifecycle', () => {
    it('should initialize', () => {
      component.ngOnInit();
      expect(component).toBeTruthy();
    });

    it('should cleanup on destroy', () => {
      component.ngOnInit();
      component.ngOnDestroy();
      // Should not throw
      expect(true).toBe(true);
    });
  });
});

