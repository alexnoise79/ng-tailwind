import { Component, signal } from '@angular/core';
import { NgtTable, TableColumn } from '@ng-tailwind/ui-components';

interface Product {
  code: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  rating?: number;
  inventoryStatus?: string;
}

@Component({
  selector: 'section.table',
  imports: [NgtTable],
  templateUrl: './table.page.html'
})
export class TablePage {
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
  selectedSize = signal<'sm' | 'md' | 'lg'>('md');
  
  // Independent sizes for other tables
  basicTableSize = signal<'sm' | 'md' | 'lg'>('md');
  gridlinesTableSize = signal<'sm' | 'md' | 'lg'>('md');
  stripedTableSize = signal<'sm' | 'md' | 'lg'>('md');
  paginationTableSize = signal<'sm' | 'md' | 'lg'>('md');
  templateTableSize = signal<'sm' | 'md' | 'lg'>('md');
  reorderableTableSize = signal<'sm' | 'md' | 'lg'>('md');
  multipleSortTableSize = signal<'sm' | 'md' | 'lg'>('md');
  combinedTableSize = signal<'sm' | 'md' | 'lg'>('md');

  onSort(event: { field: string; order: 'asc' | 'desc' | null }): void {
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
}

