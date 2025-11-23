/// <reference types="vitest/globals" />
import { NgtCollapse } from './collapse.component';
import { runInInjectionContext, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

describe('NgtCollapse', () => {
  let component: NgtCollapse;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    injector = TestBed.inject(Injector);

    component = runInInjectionContext(injector, () => {
      return new NgtCollapse();
    });

    (component as any).horizontal = signal(false);
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

    it('should toggle isOpen state', () => {
      component.isOpen = false;
      expect(component.isOpen()).toBe(false);

      component.isOpen = true;
      expect(component.isOpen()).toBe(true);
    });
  });

  describe('Horizontal mode', () => {
    it('should have horizontal input', () => {
      expect((component as any).horizontal).toBeDefined();
    });

    it('should default to false for horizontal', () => {
      expect((component as any).horizontal()).toBe(false);
    });
  });
});
