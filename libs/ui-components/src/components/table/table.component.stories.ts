import type { Meta, StoryObj } from '@storybook/angular';
import { NgtTable } from './table.component';
import { TableColumn } from '../../models';
import { signal } from '@angular/core';

const meta: Meta<NgtTable> = {
  title: 'Components/Table',
  component: NgtTable,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Table size'
    },
    showGridlines: {
      control: 'boolean',
      description: 'Whether to show gridlines'
    },
    striped: {
      control: 'boolean',
      description: 'Whether to show striped rows'
    },
    paginator: {
      control: 'boolean',
      description: 'Whether to show pagination'
    },
    rows: {
      control: 'number',
      description: 'Number of rows per page'
    },
    sortMode: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Sort mode'
    },
    reorderableColumns: {
      control: 'boolean',
      description: 'Whether columns can be reordered'
    }
  }
};

export default meta;
type Story = StoryObj<NgtTable>;

const sampleProducts = [
  { code: '001', name: 'Product 1', category: 'Electronics', quantity: 10, price: 99.99 },
  { code: '002', name: 'Product 2', category: 'Clothing', quantity: 25, price: 49.99 },
  { code: '003', name: 'Product 3', category: 'Electronics', quantity: 5, price: 199.99 },
  { code: '004', name: 'Product 4', category: 'Fitness', quantity: 15, price: 79.99 },
  { code: '005', name: 'Product 5', category: 'Clothing', quantity: 30, price: 29.99 },
  { code: '006', name: 'Product 6', category: 'Electronics', quantity: 8, price: 149.99 },
  { code: '007', name: 'Product 7', category: 'Fitness', quantity: 12, price: 89.99 },
  { code: '008', name: 'Product 8', category: 'Clothing', quantity: 20, price: 39.99 }
];

const basicColumns: TableColumn[] = [
  { field: 'code', header: 'Code', sortable: true },
  { field: 'name', header: 'Name', sortable: true },
  { field: 'category', header: 'Category', sortable: true },
  { field: 'quantity', header: 'Quantity', sortable: true }
];

export const Basic: Story = {
  args: {
    value: sampleProducts,
    columns: basicColumns,
    size: 'md',
    showGridlines: false,
    striped: false
  },
  render: args => ({
    props: {
      ...args,
      value: signal(args.value || [])
    },
    template: `
      <ngt-table
        [value]="value()"
        [columns]="columns"
        [size]="size"
        [showGridlines]="showGridlines"
        [striped]="striped">
      </ngt-table>
    `
  })
};

export const WithGridlines: Story = {
  args: {
    value: sampleProducts,
    columns: basicColumns,
    size: 'md',
    showGridlines: true,
    striped: false
  },
  render: args => ({
    props: {
      ...args,
      value: signal(args.value || [])
    },
    template: `
      <ngt-table
        [value]="value()"
        [columns]="columns"
        [size]="size"
        [showGridlines]="showGridlines"
        [striped]="striped">
      </ngt-table>
    `
  })
};

export const Striped: Story = {
  args: {
    value: sampleProducts,
    columns: basicColumns,
    size: 'md',
    showGridlines: false,
    striped: true
  },
  render: args => ({
    props: {
      ...args,
      value: signal(args.value || [])
    },
    template: `
      <ngt-table
        [value]="value()"
        [columns]="columns"
        [size]="size"
        [showGridlines]="showGridlines"
        [striped]="striped">
      </ngt-table>
    `
  })
};

export const WithPagination: Story = {
  args: {
    value: sampleProducts,
    columns: basicColumns,
    size: 'md',
    showGridlines: false,
    striped: false,
    paginator: true,
    rows: 3
  },
  render: args => ({
    props: {
      ...args,
      value: signal(args.value || []),
      currentPage: signal(1)
    },
    template: `
      <ngt-table
        [value]="value()"
        [columns]="columns"
        [size]="size"
        [showGridlines]="showGridlines"
        [striped]="striped"
        [paginator]="paginator"
        [rows]="rows"
        (pageChange)="console.log('Page changed:', $event)">
      </ngt-table>
    `
  })
};

export const Small: Story = {
  args: {
    value: sampleProducts,
    columns: basicColumns,
    size: 'sm',
    showGridlines: true,
    striped: false
  },
  render: args => ({
    props: {
      ...args,
      value: signal(args.value || [])
    },
    template: `
      <ngt-table
        [value]="value()"
        [columns]="columns"
        [size]="size"
        [showGridlines]="showGridlines"
        [striped]="striped">
      </ngt-table>
    `
  })
};

export const Large: Story = {
  args: {
    value: sampleProducts,
    columns: basicColumns,
    size: 'lg',
    showGridlines: true,
    striped: false
  },
  render: args => ({
    props: {
      ...args,
      value: signal(args.value || [])
    },
    template: `
      <ngt-table
        [value]="value()"
        [columns]="columns"
        [size]="size"
        [showGridlines]="showGridlines"
        [striped]="striped">
      </ngt-table>
    `
  })
};

export const WithTemplate: Story = {
  args: {
    value: sampleProducts,
    columns: basicColumns,
    size: 'md',
    showGridlines: true,
    striped: false
  },
  render: args => ({
    props: {
      ...args,
      value: signal(args.value || [])
    },
    template: `
      <ngt-table
        [value]="value()"
        [columns]="columns"
        [size]="size"
        [showGridlines]="showGridlines"
        [striped]="striped">
        <ng-template #header let-columns>
          <tr>
            <th *ngFor="let col of columns" class="px-4 py-3 text-left font-semibold">
              {{ col.header }}
            </th>
          </tr>
        </ng-template>
        <ng-template #body let-product let-columns="columns">
          <tr>
            <td *ngFor="let col of columns" class="px-4 py-3">
              {{ product[col.field] }}
            </td>
          </tr>
        </ng-template>
      </ngt-table>
    `
  })
};

