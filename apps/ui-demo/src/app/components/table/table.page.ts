import { Component, signal, inject } from '@angular/core';
import { NgtTable, TableColumn, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService, Size, SortOrder } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { Product } from '../../models/demo.models';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.table-page',
  imports: [NgtTable, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet],
  templateUrl: './table.page.html'
})
export class TablePage {
  private toastService = inject(NgtToastService);

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      basic: 'showcase',
      gridlines: 'showcase',
      striped: 'showcase',
      pagination: 'showcase',
      reorderable: 'showcase'
    },
    {
      basic: 'html',
      gridlines: 'html',
      striped: 'html',
      pagination: 'html',
      reorderable: 'html'
    }
  );

  // Expose utility methods for template
  toggleDemoView = (demoKey: string) => this.codeViewUtil.toggleDemoView(demoKey);
  setActiveCodeTab = (demoKey: string, tab: 'html' | 'ts') => this.codeViewUtil.setActiveCodeTab(demoKey, tab);
  isShowingCode = (demoKey: string) => this.codeViewUtil.isShowingCode(demoKey);
  getActiveCodeTab = (demoKey: string) => this.codeViewUtil.getActiveCodeTab(demoKey, 'html');

  // Copy to clipboard functionality
  copyToClipboard(code: string): void {
    copyToClipboard(code, this.toastService);
  }
  products = signal<Product[]>([
    { code: '001', name: 'Product 1', category: 'Electronics', quantity: 10, price: 99.99, rating: 4, inventoryStatus: 'INSTOCK' },
    { code: '002', name: 'Product 2', category: 'Clothing', quantity: 25, price: 49.99, rating: 3, inventoryStatus: 'INSTOCK' },
    { code: '003', name: 'Product 3', category: 'Electronics', quantity: 5, price: 199.99, rating: 5, inventoryStatus: 'LOWSTOCK' },
    { code: '004', name: 'Product 4', category: 'Fitness', quantity: 15, price: 79.99, rating: 4, inventoryStatus: 'INSTOCK' },
    { code: '005', name: 'Product 5', category: 'Clothing', quantity: 30, price: 29.99, rating: 2, inventoryStatus: 'INSTOCK' },
    { code: '006', name: 'Product 6', category: 'Electronics', quantity: 8, price: 149.99, rating: 4, inventoryStatus: 'OUTOFSTOCK' },
    { code: '007', name: 'Product 7', category: 'Fitness', quantity: 12, price: 89.99, rating: 5, inventoryStatus: 'INSTOCK' },
    { code: '008', name: 'Product 8', category: 'Clothing', quantity: 20, price: 39.99, rating: 3, inventoryStatus: 'INSTOCK' },
    { code: '009', name: 'Product 9', category: 'Electronics', quantity: 3, price: 299.99, rating: 5, inventoryStatus: 'LOWSTOCK' },
    { code: '010', name: 'Product 10', category: 'Fitness', quantity: 18, price: 69.99, rating: 4, inventoryStatus: 'INSTOCK' },
    { code: '011', name: 'Product 11', category: 'Clothing', quantity: 22, price: 45.99, rating: 3, inventoryStatus: 'INSTOCK' },
    { code: '012', name: 'Product 12', category: 'Electronics', quantity: 7, price: 179.99, rating: 4, inventoryStatus: 'INSTOCK' }
  ]);

  basicColumns: TableColumn[] = [
    { field: 'code', header: 'Code', sortable: true },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'category', header: 'Category', sortable: true },
    { field: 'quantity', header: 'Quantity', sortable: true }
  ];

  extendedColumns: TableColumn[] = [
    { field: 'code', header: 'Code', sortable: true },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'category', header: 'Category', sortable: true },
    { field: 'quantity', header: 'Quantity', sortable: true },
    { field: 'price', header: 'Price', sortable: true }
  ];

  // Size for the "Table Sizes" demo section only
  selectedSize = signal<Size>('md');

  // Independent sizes for other tables
  basicTableSize = signal<Size>('md');
  gridlinesTableSize = signal<Size>('md');
  stripedTableSize = signal<Size>('md');
  paginationTableSize = signal<Size>('md');
  templateTableSize = signal<Size>('md');
  reorderableTableSize = signal<Size>('md');
  multipleSortTableSize = signal<Size>('md');
  combinedTableSize = signal<Size>('md');

  onSort(event: { field: string; order: SortOrder }): void {
    console.log('Sort event:', event);
  }

  onPageChange(event: { page: number; first: number; rows: number }): void {
    console.log('Page change event:', event);
  }

  onColumnReorder(event: { columns: TableColumn[]; dragIndex: number; dropIndex: number }): void {
    console.log('Column reorder event:', event);
    // Don't update the shared column arrays - each table maintains its own state
    // The table component handles the reordering internally, so we don't need to update the input
  }

  getSeverity(status?: string): string {
    if (!status) return '';
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return '';
    }
  }

  // Code snippets for each demo
  codeSnippets = {
    basic: {
      html: `<ngt-table
  [value]="products()"
  [columns]="basicColumns"
  [size]="'md'">
</ngt-table>`,
      ts: `import { signal } from '@angular/core';
import { TableColumn } from '@ng-tailwind/ui-components';

export class TablePage {
  products = signal<Product[]>([
    { code: '001', name: 'Product 1', category: 'Electronics', quantity: 10, price: 99.99, rating: 4, inventoryStatus: 'INSTOCK' },
    { code: '002', name: 'Product 2', category: 'Clothing', quantity: 25, price: 49.99, rating: 3, inventoryStatus: 'INSTOCK' }
  ]);

  basicColumns: TableColumn[] = [
    { field: 'code', header: 'Code', sortable: true },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'category', header: 'Category', sortable: true },
    { field: 'quantity', header: 'Quantity', sortable: true }
  ];
}`
    },
    gridlines: {
      html: `<ngt-table
  [value]="products()"
  [columns]="basicColumns"
  [showGridlines]="true">
</ngt-table>`,
      ts: `import { signal } from '@angular/core';
import { TableColumn } from '@ng-tailwind/ui-components';

export class TablePage {
  products = signal<Product[]>([...]);
  basicColumns: TableColumn[] = [...];
}`
    },
    striped: {
      html: `<ngt-table
  [value]="products()"
  [columns]="basicColumns"
  [striped]="true">
</ngt-table>`,
      ts: `import { signal } from '@angular/core';
import { TableColumn } from '@ng-tailwind/ui-components';

export class TablePage {
  products = signal<Product[]>([...]);
  basicColumns: TableColumn[] = [...];
}`
    },
    pagination: {
      html: `<ngt-table
  [value]="products()"
  [columns]="basicColumns"
  [paginator]="true"
  [rows]="5"
  (pageChange)="onPageChange($event)">
</ngt-table>`,
      ts: `import { signal } from '@angular/core';
import { TableColumn } from '@ng-tailwind/ui-components';

export class TablePage {
  products = signal<Product[]>([...]);
  basicColumns: TableColumn[] = [...];

  onPageChange(event: { page: number; first: number; rows: number }): void {
    console.log('Page change event:', event);
  }
}`
    },
    reorderable: {
      html: `<ngt-table
  [value]="products()"
  [columns]="basicColumns"
  [reorderableColumns]="true"
  (columnReorder)="onColumnReorder($event)">
</ngt-table>`,
      ts: `import { signal } from '@angular/core';
import { TableColumn } from '@ng-tailwind/ui-components';

export class TablePage {
  products = signal<Product[]>([...]);
  basicColumns: TableColumn[] = [...];

  onColumnReorder(event: { columns: TableColumn[]; dragIndex: number; dropIndex: number }): void {
    console.log('Column reorder event:', event);
  }
}`
    }
  };

  // Helper to get code snippet for a specific tab
  getCodeSnippet(demoKey: string, fileType: 'html' | 'ts'): string {
    return this.codeViewUtil.getCodeSnippet(this.codeSnippets, demoKey, fileType);
  }

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      basic: {
        html: 'table-basic.html',
        ts: 'table-basic.ts'
      },
      gridlines: {
        html: 'table-gridlines.html',
        ts: 'table-gridlines.ts'
      },
      striped: {
        html: 'table-striped.html',
        ts: 'table-striped.ts'
      },
      pagination: {
        html: 'table-pagination.html',
        ts: 'table-pagination.ts'
      },
      reorderable: {
        html: 'table-reorderable.html',
        ts: 'table-reorderable.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('table', demoKey, fileType, fileNames);
  }
}
