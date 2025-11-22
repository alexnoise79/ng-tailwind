import type { Meta, StoryObj } from '@storybook/angular';
import { NgtTimepicker, NgtTimeStruct } from './timepicker.component';
import { signal } from '@angular/core';

const meta: Meta<NgtTimepicker> = {
  title: 'Components/Timepicker',
  component: NgtTimepicker,
  tags: ['autodocs'],
  argTypes: {
    model: {
      control: 'object',
      description: 'Selected time model (string, Date, or NgtTimeStruct)'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the timepicker is disabled'
    },
    showSeconds: {
      control: 'boolean',
      description: 'Whether to show seconds input'
    },
    meridian: {
      control: 'boolean',
      description: 'Whether to use 12-hour format with AM/PM'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the timepicker'
    }
  }
};

export default meta;
type Story = StoryObj<NgtTimepicker>;

export const Default: Story = {
  args: {
    model: null,
    disabled: false,
    showSeconds: false,
    meridian: false,
    size: 'md'
  },
  render: args => {
    const selectedTime = signal<NgtTimeStruct | null>(null);
    return {
      props: {
        ...args,
        selectedTime: selectedTime,
        onTimeSelect: (time: NgtTimeStruct) => {
          selectedTime.set(time);
          console.log('Time selected:', time);
        }
      },
      moduleMetadata: {
        imports: [NgtTimepicker]
      },
      template: `
        <div class="p-8">
          <ngt-timepicker
            [model]="model"
            [disabled]="disabled"
            [showSeconds]="showSeconds"
            [meridian]="meridian"
            [size]="size"
            (timeSelect)="onTimeSelect($event)"
          ></ngt-timepicker>
          @if (selectedTime()) {
            <p class="mt-4 text-sm text-gray-600">
              Selected: {{ selectedTime()!.hour }}:{{ String(selectedTime()!.minute).padStart(2, '0') }}
              @if (selectedTime()!.second !== undefined) {
                :{{ String(selectedTime()!.second).padStart(2, '0') }}
              }
            </p>
          }
        </div>
      `
    };
  }
};

export const WithSeconds: Story = {
  args: {
    model: null,
    disabled: false,
    showSeconds: true,
    meridian: false,
    size: 'md'
  },
  render: args => {
    const selectedTime = signal<NgtTimeStruct | null>(null);
    return {
      props: {
        ...args,
        selectedTime: selectedTime,
        onTimeSelect: (time: NgtTimeStruct) => {
          selectedTime.set(time);
        }
      },
      template: `
        <div class="p-8">
          <ngt-timepicker
            [model]="model"
            [disabled]="disabled"
            [showSeconds]="showSeconds"
            [meridian]="meridian"
            [size]="size"
            (timeSelect)="onTimeSelect($event)"
          ></ngt-timepicker>
          @if (selectedTime()) {
            <p class="mt-4 text-sm text-gray-600">
              Selected: {{ selectedTime()!.hour }}:{{ String(selectedTime()!.minute).padStart(2, '0') }}:{{ String(selectedTime()!.second || 0).padStart(2, '0') }}
            </p>
          }
        </div>
      `
    };
  }
};

export const WithMeridian: Story = {
  args: {
    model: null,
    disabled: false,
    showSeconds: false,
    meridian: true,
    size: 'md'
  },
  render: args => {
    const selectedTime = signal<NgtTimeStruct | null>(null);
    return {
      props: {
        ...args,
        selectedTime: selectedTime,
        onTimeSelect: (time: NgtTimeStruct) => {
          selectedTime.set(time);
        }
      },
      template: `
        <div class="p-8">
          <ngt-timepicker
            [model]="model"
            [disabled]="disabled"
            [showSeconds]="showSeconds"
            [meridian]="meridian"
            [size]="size"
            (timeSelect)="onTimeSelect($event)"
          ></ngt-timepicker>
          @if (selectedTime()) {
            <p class="mt-4 text-sm text-gray-600">
              Selected: {{ selectedTime()!.hour }}:{{ String(selectedTime()!.minute).padStart(2, '0') }}
            </p>
          }
        </div>
      `
    };
  }
};

export const Sizes: Story = {
  render: () => {
    const timeSmall = signal<NgtTimeStruct | null>(null);
    const timeMedium = signal<NgtTimeStruct | null>(null);
    const timeLarge = signal<NgtTimeStruct | null>(null);
    return {
      props: {
        timeSmall: timeSmall,
        timeMedium: timeMedium,
        timeLarge: timeLarge,
        onTimeSelectSmall: (time: NgtTimeStruct) => timeSmall.set(time),
        onTimeSelectMedium: (time: NgtTimeStruct) => timeMedium.set(time),
        onTimeSelectLarge: (time: NgtTimeStruct) => timeLarge.set(time)
      },
      template: `
        <div class="p-8 space-y-8">
          <div>
            <p class="text-sm font-medium text-gray-700 mb-2">Small (sm):</p>
            <ngt-timepicker
              [model]="null"
              [size]="'sm'"
              (timeSelect)="onTimeSelectSmall($event)"
            ></ngt-timepicker>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-700 mb-2">Medium (md) - Default:</p>
            <ngt-timepicker
              [model]="null"
              [size]="'md'"
              (timeSelect)="onTimeSelectMedium($event)"
            ></ngt-timepicker>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-700 mb-2">Large (lg):</p>
            <ngt-timepicker
              [model]="null"
              [size]="'lg'"
              (timeSelect)="onTimeSelectLarge($event)"
            ></ngt-timepicker>
          </div>
        </div>
      `
    };
  }
};

export const WithInitialTime: Story = {
  args: {
    model: { hour: 14, minute: 30, second: 0 },
    disabled: false,
    showSeconds: true,
    meridian: false,
    size: 'md'
  },
  render: args => {
    const selectedTime = signal<NgtTimeStruct | null>(null);
    return {
      props: {
        ...args,
        selectedTime: selectedTime,
        onTimeSelect: (time: NgtTimeStruct) => {
          selectedTime.set(time);
        }
      },
      template: `
        <div class="p-8">
          <ngt-timepicker
            [model]="model"
            [disabled]="disabled"
            [showSeconds]="showSeconds"
            [meridian]="meridian"
            [size]="size"
            (timeSelect)="onTimeSelect($event)"
          ></ngt-timepicker>
          @if (selectedTime()) {
            <p class="mt-4 text-sm text-gray-600">
              Selected: {{ selectedTime()!.hour }}:{{ String(selectedTime()!.minute).padStart(2, '0') }}:{{ String(selectedTime()!.second || 0).padStart(2, '0') }}
            </p>
          }
        </div>
      `
    };
  }
};

export const Disabled: Story = {
  args: {
    model: { hour: 10, minute: 30 },
    disabled: true,
    showSeconds: false,
    meridian: false,
    size: 'md'
  },
  render: args => {
    return {
      props: args,
      template: `
        <div class="p-8">
          <ngt-timepicker
            [model]="model"
            [disabled]="disabled"
            [showSeconds]="showSeconds"
            [meridian]="meridian"
            [size]="size"
          ></ngt-timepicker>
        </div>
      `
    };
  }
};

