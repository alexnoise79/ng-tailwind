/// <reference types="vitest/globals" />
import { NgtPagination } from './pagination.component';
import { runInInjectionContext, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Size } from '../../models';

describe('NgtPagination', () => {
  let component: NgtPagination;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    injector = TestBed.inject(Injector);
    
    component = runInInjectionContext(injector, () => {
      return new NgtPagination();
    });
    
    (component as any).currentPage = signal(1);
    (component as any).totalPages = signal<number | null>(null);
    (component as any).totalItems = signal<number | null>(null);
    (component as any).pageSize = signal(10);
    (component as any).maxVisiblePages = signal(5);
    (component as any).showFirstLast = signal(true);
    (component as any).showPrevNext = signal(true);
    (component as any).size = signal<Size>('md');
    (component as any).disabled = signal(false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Total pages calculation', () => {
    it('should calculate total pages from totalItems and pageSize', () => {
      (component as any).totalItems.set(100);
      (component as any).pageSize.set(10);
      expect(component.totalPagesValue()).toBe(10);
    });

    it('should use explicit totalPages if provided', () => {
      (component as any).totalPages.set(5);
      (component as any).totalItems.set(100);
      expect(component.totalPagesValue()).toBe(5);
    });

    it('should return 1 if totalItems is null', () => {
      (component as any).totalItems.set(null);
      expect(component.totalPagesValue()).toBe(1);
    });

    it('should handle pageSize of 0', () => {
      (component as any).totalItems.set(100);
      (component as any).pageSize.set(0);
      expect(component.totalPagesValue()).toBe(1);
    });
  });

  describe('Visible pages', () => {
    it('should show all pages if total is less than maxVisible', () => {
      (component as any).totalItems.set(30);
      (component as any).pageSize.set(10);
      (component as any)._currentPage.set(1);
      
      const pages = component.visiblePages();
      expect(pages.length).toBe(3);
      expect(pages).toEqual([1, 2, 3]);
    });

    it('should show limited pages when total exceeds maxVisible', () => {
      (component as any).totalItems.set(100);
      (component as any).pageSize.set(10);
      (component as any)._currentPage.set(5);
      (component as any).maxVisiblePages.set(5);
      
      const pages = component.visiblePages();
      expect(pages.length).toBeLessThanOrEqual(5);
    });
  });

  describe('Ellipsis', () => {
    it('should show start ellipsis when needed', () => {
      (component as any).totalItems.set(100);
      (component as any).pageSize.set(10);
      (component as any)._currentPage.set(10);
      
      expect(component.showStartEllipsis()).toBe(true);
    });

    it('should show end ellipsis when needed', () => {
      (component as any).totalItems.set(100);
      (component as any).pageSize.set(10);
      (component as any)._currentPage.set(1);
      
      expect(component.showEndEllipsis()).toBe(true);
    });
  });

  describe('Page navigation', () => {
    it('should go to specific page', () => {
      (component as any).totalItems.set(100);
      (component as any).pageSize.set(10);
      (component as any)._currentPage.set(1);
      
      let emittedPage: number | undefined;
      component.pageChanged.subscribe((page) => {
        emittedPage = page;
      });
      
      component.goToPage(5);
      
      expect((component as any)._currentPage()).toBe(5);
      expect(emittedPage).toBe(5);
    });

    it('should not go to invalid page', () => {
      (component as any).totalItems.set(100);
      (component as any).pageSize.set(10);
      (component as any)._currentPage.set(5);
      
      component.goToPage(0);
      expect((component as any)._currentPage()).toBe(5);
      
      component.goToPage(11);
      expect((component as any)._currentPage()).toBe(5);
    });

    it('should not go to page when disabled', () => {
      (component as any).disabled.set(true);
      (component as any)._currentPage.set(1);
      
      component.goToPage(2);
      expect((component as any)._currentPage()).toBe(1);
    });

    it('should go to first page', () => {
      (component as any).totalItems.set(100);
      (component as any).pageSize.set(10);
      (component as any)._currentPage.set(5);
      
      component.goToFirst();
      expect((component as any)._currentPage()).toBe(1);
    });

    it('should go to last page', () => {
      (component as any).totalItems.set(100);
      (component as any).pageSize.set(10);
      (component as any)._currentPage.set(1);
      
      component.goToLast();
      expect((component as any)._currentPage()).toBe(10);
    });

    it('should go to previous page', () => {
      (component as any).totalItems.set(100);
      (component as any).pageSize.set(10);
      (component as any)._currentPage.set(5);
      
      component.goToPrevious();
      expect((component as any)._currentPage()).toBe(4);
    });

    it('should go to next page', () => {
      (component as any).totalItems.set(100);
      (component as any).pageSize.set(10);
      (component as any)._currentPage.set(5);
      
      component.goToNext();
      expect((component as any)._currentPage()).toBe(6);
    });

    it('should not go to previous page if on first page', () => {
      (component as any).totalItems.set(100);
      (component as any).pageSize.set(10);
      (component as any)._currentPage.set(1);
      
      component.goToPrevious();
      expect((component as any)._currentPage()).toBe(1);
    });

    it('should not go to next page if on last page', () => {
      (component as any).totalItems.set(100);
      (component as any).pageSize.set(10);
      (component as any)._currentPage.set(10);
      
      component.goToNext();
      expect((component as any)._currentPage()).toBe(10);
    });
  });

  describe('Page state', () => {
    it('should identify first page', () => {
      (component as any)._currentPage.set(1);
      expect(component.isFirstPage()).toBe(true);
      
      (component as any)._currentPage.set(2);
      expect(component.isFirstPage()).toBe(false);
    });

    it('should identify last page', () => {
      (component as any).totalItems.set(100);
      (component as any).pageSize.set(10);
      (component as any)._currentPage.set(10);
      expect(component.isLastPage()).toBe(true);
      
      (component as any)._currentPage.set(9);
      expect(component.isLastPage()).toBe(false);
    });
  });

  describe('Button classes', () => {
    it('should return classes for active button', () => {
      const classes = component.getButtonClasses(true);
      expect(classes).toContain('bg-primary-600');
      expect(classes).toContain('text-white');
    });

    it('should return classes for inactive button', () => {
      const classes = component.getButtonClasses(false);
      expect(classes).toContain('bg-white');
    });

    it('should include disabled classes when disabled', () => {
      (component as any).disabled.set(true);
      const classes = component.getButtonClasses(false);
      expect(classes).toContain('opacity-50');
    });
  });
});

