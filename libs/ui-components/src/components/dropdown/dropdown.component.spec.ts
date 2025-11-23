/// <reference types="vitest/globals" />
import { NgtDropdown, DropdownAlign } from './dropdown.component';
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

  describe('Align', () => {
    it('should default to left', () => {
      expect(component.alignValue()).toBe('left');
    });

    it('should set align to right', () => {
      component.align = 'right';
      expect(component.alignValue()).toBe('right');
    });

    it('should set align to left', () => {
      component.align = 'left';
      expect(component.alignValue()).toBe('left');
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
