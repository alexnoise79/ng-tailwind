import type { Meta, StoryObj } from '@storybook/angular';
import { NgtProgressbar } from './progressbar.component';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'progressbar-story-wrapper',
  template: `
    <div class="p-8 space-y-6 max-w-2xl">
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Basic Progress Bars</h3>
        <ngt-progressbar [value]="25" />
        <ngt-progressbar [value]="50" />
        <ngt-progressbar [value]="75" />
        <ngt-progressbar [value]="100" />
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold">With Percentage</h3>
        <ngt-progressbar [value]="30" [showValue]="true" />
        <ngt-progressbar [value]="60" [showValue]="true" />
        <ngt-progressbar [value]="90" [showValue]="true" />
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold">All Variants</h3>
        <ngt-progressbar [value]="25" type="primary" />
        <ngt-progressbar [value]="35" type="success" />
        <ngt-progressbar [value]="45" type="info" />
        <ngt-progressbar [value]="55" type="warning" />
        <ngt-progressbar [value]="65" type="danger" />
        <ngt-progressbar [value]="75" type="secondary" />
        <ngt-progressbar [value]="85" type="dark" />
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Striped</h3>
        <ngt-progressbar [value]="40" [striped]="true" />
        <ngt-progressbar [value]="60" [striped]="true" type="success" />
        <ngt-progressbar [value]="80" [striped]="true" type="warning" />
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Animated Stripes</h3>
        <ngt-progressbar [value]="50" [striped]="true" [animated]="true" />
        <ngt-progressbar [value]="70" [striped]="true" [animated]="true" type="success" />
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Custom Height</h3>
        <ngt-progressbar [value]="40" height="0.5rem" />
        <ngt-progressbar [value]="50" height="1rem" />
        <ngt-progressbar [value]="60" height="2rem" />
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Custom Max Value</h3>
        <ngt-progressbar [value]="150" [max]="200" [showValue]="true" />
        <ngt-progressbar [value]="75" [max]="1000" [showValue]="true" />
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Animated Example</h3>
        <ngt-progressbar [value]="progressValue()" [showValue]="true" [animated]="true" [striped]="true" />
        <button class="mt-2 px-4 py-2 bg-primary-600 text-white rounded" (click)="updateProgress()">Update Progress</button>
      </div>
    </div>
  `,
  imports: [NgtProgressbar]
})
class ProgressbarStoryWrapper {
  progressValue = signal(25);

  updateProgress() {
    this.progressValue.set(Math.floor(Math.random() * 100));
  }
}

const meta: Meta<NgtProgressbar> = {
  title: 'Components/Progressbar',
  component: NgtProgressbar,
  tags: ['autodocs'],
  argTypes: {
    animated: {
      control: 'boolean',
      description: 'If true, the stripes on the progress bar are animated. Takes effect only for browsers supporting CSS3 animations, and if striped is true.'
    },
    ariaLabel: {
      control: 'text',
      description: 'The accessible progress bar name.'
    },
    height: {
      control: 'text',
      description: 'The height of the progress bar. Accepts any valid CSS height values, ex. "2rem"'
    },
    max: {
      control: 'number',
      description: 'The maximal value to be displayed in the progress bar. Should be a positive number. Will default to 100 otherwise.'
    },
    showValue: {
      control: 'boolean',
      description: 'If true, the current percentage will be shown in the xx% format.'
    },
    striped: {
      control: 'boolean',
      description: 'If true, the progress bars will be displayed as striped.'
    },
    textType: {
      control: 'select',
      options: ['success', 'info', 'warning', 'danger', 'primary', 'secondary', 'dark', 'light'],
      description: 'Optional text variant type of the progress bar.'
    },
    type: {
      control: 'select',
      options: ['success', 'info', 'warning', 'danger', 'primary', 'secondary', 'dark', 'light'],
      description: 'The type of the progress bar. Supports types based on Bootstrap background color variants.'
    },
    value: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'The current value for the progress bar. Should be in the [0, max] range.'
    }
  }
};

export default meta;
type Story = StoryObj<NgtProgressbar>;

export const Default: Story = {
  args: {
    value: 50
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtProgressbar]
    },
    template: `
      <div class="p-8">
        <ngt-progressbar [value]="value" />
      </div>
    `
  })
};

export const WithPercentage: Story = {
  args: {
    value: 65,
    showValue: true
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtProgressbar]
    },
    template: `
      <div class="p-8">
        <ngt-progressbar [value]="value" [showValue]="showValue" />
      </div>
    `
  })
};

export const Striped: Story = {
  args: {
    value: 60,
    striped: true
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtProgressbar]
    },
    template: `
      <div class="p-8">
        <ngt-progressbar [value]="value" [striped]="striped" />
      </div>
    `
  })
};

export const Animated: Story = {
  args: {
    value: 70,
    striped: true,
    animated: true
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtProgressbar]
    },
    template: `
      <div class="p-8">
        <ngt-progressbar [value]="value" [striped]="striped" [animated]="animated" />
      </div>
    `
  })
};

export const AllVariants: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [NgtProgressbar]
    },
    template: `
      <div class="p-8 space-y-4">
        <ngt-progressbar [value]="25" type="primary" [showValue]="true" />
        <ngt-progressbar [value]="35" type="success" [showValue]="true" />
        <ngt-progressbar [value]="45" type="info" [showValue]="true" />
        <ngt-progressbar [value]="55" type="warning" [showValue]="true" />
        <ngt-progressbar [value]="65" type="danger" [showValue]="true" />
        <ngt-progressbar [value]="75" type="secondary" [showValue]="true" />
        <ngt-progressbar [value]="85" type="dark" [showValue]="true" />
      </div>
    `
  })
};

export const CustomHeight: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [NgtProgressbar]
    },
    template: `
      <div class="p-8 space-y-4">
        <ngt-progressbar [value]="50" height="0.5rem" />
        <ngt-progressbar [value]="50" height="1rem" />
        <ngt-progressbar [value]="50" height="2rem" />
        <ngt-progressbar [value]="50" height="3rem" />
      </div>
    `
  })
};

export const CustomMax: Story = {
  args: {
    value: 75,
    max: 200,
    showValue: true
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtProgressbar]
    },
    template: `
      <div class="p-8">
        <ngt-progressbar [value]="value" [max]="max" [showValue]="showValue" />
      </div>
    `
  })
};

export const Interactive: Story = {
  render: () =>
    ({
      component: ProgressbarStoryWrapper
    }) as any
};
