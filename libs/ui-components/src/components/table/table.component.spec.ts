/// <reference types="vitest/globals" />
import { NgtTable } from './table.component';
import { runInInjectionContext, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Size, TableColumn, SortOrder } from '../../models';

describe('NgtTable', () => {
  let component: NgtTable;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    injector = TestBed.inject(Injector);
    
    component = runInInjectionContext(injector, () => {
      return new NgtTable();
    });
    
    (component as any).size = signal<Size>('md');
    (component as any).showGridlines = signal(false);
    (component as any).striped = signal(false);
    (component as any).stripedColumns = signal(false);
    (component as any).paginator = signal(false);
    (component as any).rows = signal(10);
    (component as any).totalRecords = signal<number | null>(null);
    (component as any).sortMode = signal<'single' | 'multiple'>('single');
    (component as any).sortField = signal<string | null>(null);
    (component as any).sortOrder = signal<SortOrder>(null);
    (component as any).multiSortMeta = signal([]);
    (component as any).reorderableColumns = signal(false);
    (component as any).value = signal([]);
    (component as any).columns = signal([]);
  });

  afterEach(() => {
    if (component) {
      component.ngOnDestroy();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Sorting', () => {
    it('should sort by field', () => {
      const columns: TableColumn[] = [
        { field: 'name', header: 'Name', sortable: true }
      ];
      (component as any).columns = signal(columns);
      (component as any).value = signal([
        { name: 'B' },
        { name: 'A' },
        { name: 'C' }
      ]);
      // Wait for effect to sync columns
      (component as any)._columns.set(columns);
      
      const event = new Event('click');
      component.sort(event, 'name');
      
      expect((component as any)._sortField()).toBe('name');
      expect((component as any)._sortOrder()).toBe('asc');
    });

    it('should toggle sort order', () => {
      const columns: TableColumn[] = [
        { field: 'name', header: 'Name', sortable: true }
      ];
      (component as any).columns = signal(columns);
      (component as any)._columns.set(columns);
      (component as any)._sortField.set('name');
      (component as any)._sortOrder.set('asc');
      
      const event = new Event('click');
      component.sort(event, 'name');
      
      expect((component as any)._sortOrder()).toBe('desc');
    });

    it('should get sort icon', () => {
      (component as any)._sortField.set('name');
      (component as any)._sortOrder.set('asc');
      
      expect(component.getSortIcon('name')).toBe('↑');
    });

    it('should check if column is sorted', () => {
      (component as any)._sortField.set('name');
      (component as any)._sortOrder.set('asc');
      
      expect(component.isColumnSorted('name')).toBe(true);
      expect(component.isColumnSorted('other')).toBe(false);
    });
  });

  describe('Pagination', () => {
    it('should calculate total pages', () => {
      (component as any).value = signal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      (component as any).rows.set(5);
      (component as any).paginator.set(true);
      
      expect(component.totalPages()).toBe(3);
    });

    it('should handle page change', () => {
      (component as any).paginator.set(true);
      (component as any).rows.set(5);
      
      let emittedPage: any;
      component.pageChange.subscribe((event) => {
        emittedPage = event;
      });
      
      component.onPageChangeHandler(2);
      
      expect((component as any)._currentPage()).toBe(2);
      expect(emittedPage).toEqual({ page: 2, first: 5, rows: 5 });
    });
  });

  describe('Field resolution', () => {
    it('should resolve nested field data', () => {
      const data = { user: { name: 'John' } };
      const value = component.resolveFieldData(data, 'user.name');
      expect(value).toBe('John');
    });

    it('should return undefined for invalid field', () => {
      const data = { user: { name: 'John' } };
      const value = component.resolveFieldData(data, 'invalid.field');
      expect(value).toBeUndefined();
    });
  });
});

