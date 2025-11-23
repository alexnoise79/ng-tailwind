/// <reference types="vitest/globals" />
import { NgtNav, NavOrientation, NavStyle, NavAlign } from './nav.directive';
import { runInInjectionContext, Injector, ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

describe('NgtNav', () => {
  let component: NgtNav;
  let injector: Injector;
  let mockElementRef: Partial<ElementRef>;

  beforeEach(() => {
    mockElementRef = {
      nativeElement: {
        querySelector: vi.fn(() => null)
      }
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ElementRef, useValue: mockElementRef },
        { provide: Renderer2, useValue: {} }
      ]
    });
    injector = TestBed.inject(Injector);

    component = runInInjectionContext(injector, () => {
      return new NgtNav();
    });

    (component as any).orientation = signal<NavOrientation>('horizontal');
    (component as any).style = signal<NavStyle>('tabs');
    (component as any).align = signal<NavAlign>('start');
    (component as any).activeId = signal<string | null>(null);
    (component as any).elementRef = mockElementRef;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('selectItem', () => {
    it('should set selectedId', () => {
      component.selectItem('item1');
      expect(component.selectedId()).toBe('item1');
    });
  });

  describe('Nav classes', () => {
    it('should include base classes', () => {
      const classes = component.navClasses();
      expect(classes).toContain('nav-list');
    });

    it('should include horizontal orientation classes', () => {
      (component as any).orientation.set('horizontal');
      const classes = component.navClasses();
      expect(classes).toContain('flex-row');
    });

    it('should include vertical orientation classes', () => {
      (component as any).orientation.set('vertical');
      const classes = component.navClasses();
      expect(classes).toContain('flex-col');
    });
  });

  describe('getNavItemClasses', () => {
    it('should return flex-1 for justified align in horizontal orientation', () => {
      (component as any).align.set('justified');
      (component as any).orientation.set('horizontal');
      expect(component.getNavItemClasses()).toBe('flex-1');
    });

    it('should return empty string for non-justified align', () => {
      (component as any).align.set('start');
      expect(component.getNavItemClasses()).toBe('');
    });
  });
});
