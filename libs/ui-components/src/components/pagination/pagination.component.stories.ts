import type { Meta, StoryObj } from '@storybook/angular';
import { NgtPagination } from './pagination.component';
import { signal } from '@angular/core';

const meta: Meta<NgtPagination> = {
  title: 'Components/Pagination',
  component: NgtPagination,
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'Current active page number'
    },
    totalPages: {
      control: 'number',
      description: 'Total number of pages (if provided, totalItems is ignored)'
    },
    totalItems: {
      control: 'number',
      description: 'Total number of items (used to calculate totalPages if totalPages is not provided)'
    },
    pageSize: {
      control: 'number',
      description: 'Number of items per page (used with totalItems)'
    },
    maxVisiblePages: {
      control: 'number',
      description: 'Maximum number of page buttons to show'
    },
    showFirstLast: {
      control: 'boolean',
      description: 'Whether to show first and last page buttons'
    },
    showPrevNext: {
      control: 'boolean',
      description: 'Whether to show previous and next page buttons'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the pagination component'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the pagination is disabled'
    }
  }
};

export default meta;
type Story = StoryObj<NgtPagination>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    showFirstLast: true,
    showPrevNext: true,
    size: 'md'
  },
  render: args => ({
    props: {
      ...args,
      currentPage: signal(args.currentPage || 1),
      onPageChange: (page: number) => {
        console.log('Page changed to:', page);
      }
    },
    template: `
      <ngt-pagination
        [currentPage]="currentPage()"
        [totalPages]="totalPages"
        [showFirstLast]="showFirstLast"
        [showPrevNext]="showPrevNext"
        [size]="size"
        [disabled]="disabled"
        (pageChanged)="currentPage.set($event); onPageChange($event)"
      ></ngt-pagination>
    `
  })
};

export const WithTotalItems: Story = {
  args: {
    currentPage: 1,
    totalItems: 100,
    pageSize: 10,
    showFirstLast: true,
    showPrevNext: true
  },
  render: args => ({
    props: {
      ...args,
      currentPage: signal(args.currentPage || 1),
      onPageChange: (page: number) => {
        console.log('Page changed to:', page);
      }
    },
    template: `
      <ngt-pagination
        [currentPage]="currentPage()"
        [totalItems]="totalItems"
        [pageSize]="pageSize"
        [showFirstLast]="showFirstLast"
        [showPrevNext]="showPrevNext"
        (pageChanged)="currentPage.set($event); onPageChange($event)"
      ></ngt-pagination>
    `
  })
};

export const Small: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    size: 'sm',
    showFirstLast: true,
    showPrevNext: true
  },
  render: args => ({
    props: {
      ...args,
      currentPage: signal(args.currentPage || 1),
      onPageChange: (page: number) => {
        console.log('Page changed to:', page);
      }
    },
    template: `
      <ngt-pagination
        [currentPage]="currentPage()"
        [totalPages]="totalPages"
        [size]="size"
        [showFirstLast]="showFirstLast"
        [showPrevNext]="showPrevNext"
        (pageChanged)="currentPage.set($event); onPageChange($event)"
      ></ngt-pagination>
    `
  })
};

export const Large: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    size: 'lg',
    showFirstLast: true,
    showPrevNext: true
  },
  render: args => ({
    props: {
      ...args,
      currentPage: signal(args.currentPage || 1),
      onPageChange: (page: number) => {
        console.log('Page changed to:', page);
      }
    },
    template: `
      <ngt-pagination
        [currentPage]="currentPage()"
        [totalPages]="totalPages"
        [size]="size"
        [showFirstLast]="showFirstLast"
        [showPrevNext]="showPrevNext"
        (pageChanged)="currentPage.set($event); onPageChange($event)"
      ></ngt-pagination>
    `
  })
};

export const WithoutFirstLast: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    showFirstLast: false,
    showPrevNext: true
  },
  render: args => ({
    props: {
      ...args,
      currentPage: signal(args.currentPage || 1),
      onPageChange: (page: number) => {
        console.log('Page changed to:', page);
      }
    },
    template: `
      <ngt-pagination
        [currentPage]="currentPage()"
        [totalPages]="totalPages"
        [showFirstLast]="showFirstLast"
        [showPrevNext]="showPrevNext"
        (pageChanged)="currentPage.set($event); onPageChange($event)"
      ></ngt-pagination>
    `
  })
};

export const WithoutPrevNext: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    showFirstLast: true,
    showPrevNext: false
  },
  render: args => ({
    props: {
      ...args,
      currentPage: signal(args.currentPage || 1),
      onPageChange: (page: number) => {
        console.log('Page changed to:', page);
      }
    },
    template: `
      <ngt-pagination
        [currentPage]="currentPage()"
        [totalPages]="totalPages"
        [showFirstLast]="showFirstLast"
        [showPrevNext]="showPrevNext"
        (pageChanged)="currentPage.set($event); onPageChange($event)"
      ></ngt-pagination>
    `
  })
};

export const ManyPages: Story = {
  args: {
    currentPage: 50,
    totalPages: 100,
    maxVisiblePages: 7,
    showFirstLast: true,
    showPrevNext: true
  },
  render: args => ({
    props: {
      ...args,
      currentPage: signal(args.currentPage || 1),
      onPageChange: (page: number) => {
        console.log('Page changed to:', page);
      }
    },
    template: `
      <ngt-pagination
        [currentPage]="currentPage()"
        [totalPages]="totalPages"
        [maxVisiblePages]="maxVisiblePages"
        [showFirstLast]="showFirstLast"
        [showPrevNext]="showPrevNext"
        (pageChanged)="currentPage.set($event); onPageChange($event)"
      ></ngt-pagination>
    `
  })
};

export const Disabled: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    disabled: true,
    showFirstLast: true,
    showPrevNext: true
  },
  render: args => ({
    props: {
      ...args,
      currentPage: signal(args.currentPage || 1)
    },
    template: `
      <ngt-pagination
        [currentPage]="currentPage()"
        [totalPages]="totalPages"
        [disabled]="disabled"
        [showFirstLast]="showFirstLast"
        [showPrevNext]="showPrevNext"
      ></ngt-pagination>
    `
  })
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
    showFirstLast: true,
    showPrevNext: true
  },
  render: args => ({
    props: {
      ...args,
      currentPage: signal(args.currentPage || 1),
      onPageChange: (page: number) => {
        console.log('Page changed to:', page);
      }
    },
    template: `
      <ngt-pagination
        [currentPage]="currentPage()"
        [totalPages]="totalPages"
        [showFirstLast]="showFirstLast"
        [showPrevNext]="showPrevNext"
        (pageChanged)="currentPage.set($event); onPageChange($event)"
      ></ngt-pagination>
    `
  })
};

