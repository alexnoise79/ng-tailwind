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
      description: 'Selected date model'
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
    }
  }
};

export default meta;
type Story = StoryObj<NgtDatepicker>;

export const Default: Story = {
  args: {
    model: null,
    disabled: false
  },
  render: args => {
    const model = signal<NgtDateStruct | null>(args.model || null);
    return {
      props: {
        ...args,
        model: model,
        onDateSelect: (date: NgtDateStruct) => {
          model.set(date);
          console.log('Date selected:', date);
        },
        onNavigate: (event: { current: { year: number; month: number } }) => {
          console.log('Navigated to:', event.current);
        }
      },
      template: `
        <div class="p-8">
          <ngt-datepicker
            [model]="model"
            [disabled]="disabled"
            [minDate]="minDate"
            [maxDate]="maxDate"
            [startDate]="startDate"
            (dateSelect)="onDateSelect($event)"
            (navigate)="onNavigate($event)"
          ></ngt-datepicker>
          @if (model()) {
            <p class="mt-4 text-sm text-gray-600">
              Selected: {{ model()!.year }}-{{ model()!.month }}-{{ model()!.day }}
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
    disabled: false
  },
  render: args => {
    const model = signal<NgtDateStruct | null>(args.model || null);
    return {
      props: {
        ...args,
        model: model,
        onDateSelect: (date: NgtDateStruct) => {
          model.set(date);
        }
      },
      template: `
        <div class="p-8">
          <ngt-datepicker
            [model]="model"
            [disabled]="disabled"
            (dateSelect)="onDateSelect($event)"
          ></ngt-datepicker>
          @if (model()) {
            <p class="mt-4 text-sm text-gray-600">
              Selected: {{ model()!.year }}-{{ model()!.month }}-{{ model()!.day }}
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
    maxDate: { year: 2024, month: 12, day: 31 }
  },
  render: args => {
    const model = signal<NgtDateStruct | null>(args.model || null);
    return {
      props: {
        ...args,
        model: model,
        onDateSelect: (date: NgtDateStruct) => {
          model.set(date);
        }
      },
      template: `
        <div class="p-8">
          <ngt-datepicker
            [model]="model"
            [disabled]="disabled"
            [minDate]="minDate"
            [maxDate]="maxDate"
            (dateSelect)="onDateSelect($event)"
          ></ngt-datepicker>
          @if (model()) {
            <p class="mt-4 text-sm text-gray-600">
              Selected: {{ model()!.year }}-{{ model()!.month }}-{{ model()!.day }}
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
    disabled: true
  },
  render: args => {
    const model = signal<NgtDateStruct | null>(args.model || null);
    return {
      props: {
        ...args,
        model: model,
        onDateSelect: (date: NgtDateStruct) => {
          model.set(date);
        }
      },
      template: `
        <div class="p-8">
          <ngt-datepicker
            [model]="model"
            [disabled]="disabled"
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
    startDate: { year: 2025, month: 6, day: 1 }
  },
  render: args => {
    const model = signal<NgtDateStruct | null>(args.model || null);
    return {
      props: {
        ...args,
        model: model,
        onDateSelect: (date: NgtDateStruct) => {
          model.set(date);
        }
      },
      template: `
        <div class="p-8">
          <ngt-datepicker
            [model]="model"
            [disabled]="disabled"
            [startDate]="startDate"
            (dateSelect)="onDateSelect($event)"
          ></ngt-datepicker>
          @if (model()) {
            <p class="mt-4 text-sm text-gray-600">
              Selected: {{ model()!.year }}-{{ model()!.month }}-{{ model()!.day }}
            </p>
          }
        </div>
      `
    };
  }
};
