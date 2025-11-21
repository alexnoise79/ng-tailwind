import type { Meta, StoryObj } from '@storybook/angular';
import { NgtToggleSwitch } from './toggle-switch.component';
import { FormsModule } from '@angular/forms';

const meta: Meta<NgtToggleSwitch> = {
  title: 'Components/ToggleSwitch',
  component: NgtToggleSwitch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Toggle switch size'
    },
    label: {
      control: 'text',
      description: 'Optional label text'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle switch is disabled'
    }
  }
};

export default meta;
type Story = StoryObj<NgtToggleSwitch>;

export const Default: Story = {
  args: {
    size: 'md',
    disabled: false
  },
  render: args => ({
    props: args,
    template: `<ngt-toggle-switch [size]="size" [disabled]="disabled"></ngt-toggle-switch>`
  })
};

export const WithLabel: Story = {
  args: {
    size: 'md',
    label: 'Enable notifications',
    disabled: false
  },
  render: args => ({
    props: args,
    template: `<ngt-toggle-switch [size]="size" [label]="label" [disabled]="disabled"></ngt-toggle-switch>`
  })
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4 items-start">
        <ngt-toggle-switch size="sm" label="Small"></ngt-toggle-switch>
        <ngt-toggle-switch size="md" label="Medium"></ngt-toggle-switch>
        <ngt-toggle-switch size="lg" label="Large"></ngt-toggle-switch>
      </div>
    `
  })
};

export const Disabled: Story = {
  args: {
    size: 'md',
    label: 'Disabled toggle',
    disabled: true
  },
  render: args => ({
    props: args,
    template: `<ngt-toggle-switch [size]="size" [label]="label" [disabled]="disabled"></ngt-toggle-switch>`
  })
};

export const WithNgModel: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [FormsModule]
    },
    template: `
      <div class="p-8 space-y-4">
        <ngt-toggle-switch [(ngModel)]="toggleValue" label="Toggle with ngModel"></ngt-toggle-switch>
        <p class="text-sm text-gray-600">Value: {{ toggleValue }}</p>
        <button class="px-4 py-2 bg-primary-600 text-white rounded" (click)="toggleValue = !toggleValue">
          Toggle Programmatically
        </button>
      </div>
    `,
    props: {
      toggleValue: false
    }
  })
};

export const MultipleToggles: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [FormsModule]
    },
    template: `
      <div class="p-8 space-y-4">
        <ngt-toggle-switch [(ngModel)]="emailNotifications" label="Email notifications"></ngt-toggle-switch>
        <ngt-toggle-switch [(ngModel)]="pushNotifications" label="Push notifications"></ngt-toggle-switch>
        <ngt-toggle-switch [(ngModel)]="smsNotifications" label="SMS notifications"></ngt-toggle-switch>
        <div class="mt-4 p-4 bg-gray-100 rounded">
          <p class="text-sm font-semibold mb-2">Current state:</p>
          <p class="text-sm text-gray-600">Email: {{ emailNotifications }}</p>
          <p class="text-sm text-gray-600">Push: {{ pushNotifications }}</p>
          <p class="text-sm text-gray-600">SMS: {{ smsNotifications }}</p>
        </div>
      </div>
    `,
    props: {
      emailNotifications: true,
      pushNotifications: false,
      smsNotifications: true
    }
  })
};

