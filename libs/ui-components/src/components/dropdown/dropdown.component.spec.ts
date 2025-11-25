/// <reference types="vitest/globals" />
import { NgtDropdown } from './dropdown.component';
import { runInInjectionContext, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

describe('NgtDropdown', () => {
  let component: NgtDropdown;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    injector = TestBed.inject(Injector);

    component = runInInjectionContext(injector, () => {
      return new NgtDropdown();
    });

    (component as any).isOpen = signal(signal(false));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Placement', () => {
    it('should default to bottom-start', () => {
      expect(component.placementValue()).toBe('bottom-start');
    });

    it('should set placement to bottom-end', () => {
      component.placement = 'bottom-end';
      expect(component.placementValue()).toBe('bottom-end');
    });

    it('should set placement to top-start', () => {
      component.placement = 'top-start';
      expect(component.placementValue()).toBe('top-start');
    });

    it('should set placement to top-end', () => {
      component.placement = 'top-end';
      expect(component.placementValue()).toBe('top-end');
    });
  });

  describe('Toggle', () => {
    it('should toggle isOpen state', () => {
      expect(component.isOpen()()).toBe(false);

      component.toggle();
      expect(component.isOpen()()).toBe(true);

      component.toggle();
      expect(component.isOpen()()).toBe(false);
    });
  });

  describe('Open', () => {
    it('should open dropdown', () => {
      component.close();
      expect(component.isOpen()()).toBe(false);

      component.open();
      expect(component.isOpen()()).toBe(true);
    });
  });

  describe('Close', () => {
    it('should close dropdown', () => {
      component.open();
      expect(component.isOpen()()).toBe(true);

      component.close();
      expect(component.isOpen()()).toBe(false);
    });
  });
});
