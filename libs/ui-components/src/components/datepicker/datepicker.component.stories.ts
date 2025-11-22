import type { Meta, StoryObj } from '@storybook/angular';
import { NgtDatepicker, NgtDateStruct } from './datepicker.component';
import { signal } from '@angular/core';

const meta: Meta<NgtDatepicker> = {
  title: 'Components/Datepicker',
  component: NgtDatepicker,
  tags: ['autodocs'],
  argTypes: {
    model: {
      control: 'object',
      description: 'Selected date model (string, Date, or NgtDateStruct)'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the datepicker is disabled'
    },
    minDate: {
      control: 'object',
      description: 'Minimum selectable date'
    },
    maxDate: {
      control: 'object',
      description: 'Maximum selectable date'
    },
    startDate: {
      control: 'object',
      description: 'Initial month/year to display'
    },
    showTime: {
      control: 'boolean',
      description: 'Whether to show time selection'
    },
    format: {
      control: 'select',
      options: ['iso', 'iso-local', 'date', 'datetime'],
      description: 'Output format for the date string'
    }
  }
};

export default meta;
type Story = StoryObj<NgtDatepicker>;

export const Default: Story = {
  args: {
    model: null,
    disabled: false,
    showTime: false,
    format: 'iso'
  },
  render: args => {
    const selectedDate = signal<string | null>(null);
    return {
      props: {
        ...args,
        selectedDate: selectedDate,
        onDateSelect: (date: string) => {
          selectedDate.set(date);
          console.log('Date selected:', date);
        },
        onNavigate: (event: { current: { year: number; month: number } }) => {
          console.log('Navigated to:', event.current);
        }
      },
      moduleMetadata: {
        imports: [NgtDatepicker]
      },
      template: `
        <div class="p-8">
          <ngt-datepicker
            [model]="model"
            [disabled]="disabled"
            [minDate]="minDate"
            [maxDate]="maxDate"
            [startDate]="startDate"
            [showTime]="showTime"
            [format]="format"
            (dateSelect)="onDateSelect($event)"
            (navigate)="onNavigate($event)"
          ></ngt-datepicker>
          @if (selectedDate()) {
            <p class="mt-4 text-sm text-gray-600">
              Selected: {{ selectedDate() }}
            </p>
          }
        </div>
      `
    };
  }
};

export const WithInitialDate: Story = {
  args: {
    model: { year: 2024, month: 3, day: 15 },
    disabled: false,
    showTime: false,
    format: 'iso'
  },
  render: args => {
    const selectedDate = signal<string | null>(null);
    return {
      props: {
        ...args,
        selectedDate: selectedDate,
        onDateSelect: (date: string) => {
          selectedDate.set(date);
        }
      },
      template: `
        <div class="p-8">
          <ngt-datepicker
            [model]="model"
            [disabled]="disabled"
            [showTime]="showTime"
            [format]="format"
            (dateSelect)="onDateSelect($event)"
          ></ngt-datepicker>
          @if (selectedDate()) {
            <p class="mt-4 text-sm text-gray-600">
              Selected: {{ selectedDate() }}
            </p>
          }
        </div>
      `
    };
  }
};

export const WithTime: Story = {
  args: {
    model: null,
    disabled: false,
    showTime: true,
    format: 'iso'
  },
  render: args => {
    const selectedDate = signal<string | null>(null);
    return {
      props: {
        ...args,
        selectedDate: selectedDate,
        onDateSelect: (date: string) => {
          selectedDate.set(date);
        }
      },
      template: `
        <div class="p-8">
          <ngt-datepicker
            [model]="model"
            [disabled]="disabled"
            [showTime]="showTime"
            [format]="format"
            (dateSelect)="onDateSelect($event)"
          ></ngt-datepicker>
          @if (selectedDate()) {
            <p class="mt-4 text-sm text-gray-600">
              Selected: {{ selectedDate() }}
            </p>
          }
        </div>
      `
    };
  }
};

export const WithStringInput: Story = {
  args: {
    model: '2024-03-15T10:30:00Z',
    disabled: false,
    showTime: true,
    format: 'iso'
  },
  render: args => {
    const selectedDate = signal<string | null>(null);
    return {
      props: {
        ...args,
        selectedDate: selectedDate,
        onDateSelect: (date: string) => {
          selectedDate.set(date);
        }
      },
      template: `
        <div class="p-8">
          <ngt-datepicker
            [model]="model"
            [disabled]="disabled"
            [showTime]="showTime"
            [format]="format"
            (dateSelect)="onDateSelect($event)"
          ></ngt-datepicker>
          @if (selectedDate()) {
            <p class="mt-4 text-sm text-gray-600">
              Selected: {{ selectedDate() }}
            </p>
          }
        </div>
      `
    };
  }
};

export const WithDateTimeFormat: Story = {
  args: {
    model: null,
    disabled: false,
    showTime: true,
    format: 'datetime'
  },
  render: args => {
    const selectedDate = signal<string | null>(null);
    return {
      props: {
        ...args,
        selectedDate: selectedDate,
        onDateSelect: (date: string) => {
          selectedDate.set(date);
        }
      },
      template: `
        <div class="p-8">
          <ngt-datepicker
            [model]="model"
            [disabled]="disabled"
            [showTime]="showTime"
            [format]="format"
            (dateSelect)="onDateSelect($event)"
          ></ngt-datepicker>
          @if (selectedDate()) {
            <p class="mt-4 text-sm text-gray-600">
              Selected: {{ selectedDate() }}
            </p>
          }
        </div>
      `
    };
  }
};

export const WithMinMaxDates: Story = {
  args: {
    model: null,
    disabled: false,
    minDate: { year: 2024, month: 1, day: 1 },
    maxDate: { year: 2024, month: 12, day: 31 },
    showTime: false,
    format: 'iso'
  },
  render: args => {
    const selectedDate = signal<string | null>(null);
    return {
      props: {
        ...args,
        selectedDate: selectedDate,
        onDateSelect: (date: string) => {
          selectedDate.set(date);
        }
      },
      template: `
        <div class="p-8">
          <ngt-datepicker
            [model]="model"
            [disabled]="disabled"
            [minDate]="minDate"
            [maxDate]="maxDate"
            [showTime]="showTime"
            [format]="format"
            (dateSelect)="onDateSelect($event)"
          ></ngt-datepicker>
          @if (selectedDate()) {
            <p class="mt-4 text-sm text-gray-600">
              Selected: {{ selectedDate() }}
            </p>
          }
        </div>
      `
    };
  }
};

export const Disabled: Story = {
  args: {
    model: null,
    disabled: true,
    showTime: false,
    format: 'iso'
  },
  render: args => {
    const selectedDate = signal<string | null>(null);
    return {
      props: {
        ...args,
        selectedDate: selectedDate,
        onDateSelect: (date: string) => {
          selectedDate.set(date);
        }
      },
      template: `
        <div class="p-8">
          <ngt-datepicker
            [model]="model"
            [disabled]="disabled"
            [showTime]="showTime"
            [format]="format"
            (dateSelect)="onDateSelect($event)"
          ></ngt-datepicker>
        </div>
      `
    };
  }
};

export const WithCustomStartDate: Story = {
  args: {
    model: null,
    disabled: false,
    startDate: { year: 2025, month: 6, day: 1 },
    showTime: false,
    format: 'iso'
  },
  render: args => {
    const selectedDate = signal<string | null>(null);
    return {
      props: {
        ...args,
        selectedDate: selectedDate,
        onDateSelect: (date: string) => {
          selectedDate.set(date);
        }
      },
      template: `
        <div class="p-8">
          <ngt-datepicker
            [model]="model"
            [disabled]="disabled"
            [startDate]="startDate"
            [showTime]="showTime"
            [format]="format"
            (dateSelect)="onDateSelect($event)"
          ></ngt-datepicker>
          @if (selectedDate()) {
            <p class="mt-4 text-sm text-gray-600">
              Selected: {{ selectedDate() }}
            </p>
          }
        </div>
      `
    };
  }
};
