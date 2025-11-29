import type { Meta, StoryObj } from '@storybook/angular';
import { NgtCheckbox } from './checkbox.component';
import { FormsModule } from '@angular/forms';
import { signal, computed } from '@angular/core';

const meta: Meta<NgtCheckbox> = {
  title: 'Components/Checkbox',
  component: NgtCheckbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Checkbox size'
    },
    label: {
      control: 'text',
      description: 'Optional label text'
    },
    labelBefore: {
      control: 'boolean',
      description: 'Display label before checkbox'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in indeterminate state'
    }
  }
};

export default meta;
type Story = StoryObj<NgtCheckbox>;

export const Default: Story = {
  args: {
    size: 'md',
    disabled: false
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtCheckbox]
    },
    template: `<ngt-checkbox [size]="size" [disabled]="disabled"></ngt-checkbox>`
  })
};

export const WithLabel: Story = {
  args: {
    size: 'md',
    label: 'Accept terms and conditions',
    disabled: false
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtCheckbox]
    },
    template: `<ngt-checkbox [size]="size" [label]="label" [disabled]="disabled"></ngt-checkbox>`
  })
};

export const LabelBefore: Story = {
  args: {
    size: 'md',
    label: 'Label before checkbox',
    labelBefore: true
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtCheckbox]
    },
    template: `<ngt-checkbox [size]="size" [label]="label" [labelBefore]="labelBefore"></ngt-checkbox>`
  })
};

export const Sizes: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [NgtCheckbox]
    },
    template: `
      <div class="flex flex-col gap-4 items-start">
        <ngt-checkbox size="sm" label="Small checkbox"></ngt-checkbox>
        <ngt-checkbox size="md" label="Medium checkbox"></ngt-checkbox>
        <ngt-checkbox size="lg" label="Large checkbox"></ngt-checkbox>
      </div>
    `
  })
};

export const Disabled: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [NgtCheckbox]
    },
    template: `
      <div class="flex flex-col gap-4 items-start">
        <ngt-checkbox [disabled]="true" label="Disabled (unchecked)"></ngt-checkbox>
        <ngt-checkbox [disabled]="true" [ngModel]="true" label="Disabled (checked)"></ngt-checkbox>
      </div>
    `,
    props: {}
  })
};

export const WithNgModel: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [NgtCheckbox, FormsModule]
    },
    template: `
      <div class="p-8 space-y-4">
        <ngt-checkbox [(ngModel)]="checkboxValue" label="Checkbox with ngModel"></ngt-checkbox>
        <p class="text-sm text-gray-600">Value: {{ checkboxValue }}</p>
        <button class="px-4 py-2 bg-primary-600 text-white rounded" (click)="checkboxValue = !checkboxValue">
          Toggle Programmatically
        </button>
      </div>
    `,
    props: {
      checkboxValue: false
    }
  })
};

export const CustomValues: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [NgtCheckbox, FormsModule]
    },
    template: `
      <div class="p-8 space-y-4">
        <ngt-checkbox 
          [(ngModel)]="customValue" 
          [trueValue]="'yes'" 
          [falseValue]="'no'" 
          label="Custom values (yes/no)">
        </ngt-checkbox>
        <p class="text-sm text-gray-600">Value: {{ customValue }}</p>
      </div>
    `,
    props: {
      customValue: signal('no')
    }
  })
};

export const Indeterminate: Story = {
  render: () => {
    const child1 = signal(false);
    const child2 = signal(false);
    const child3 = signal(false);
    
    const allChildrenChecked = computed(() => child1() && child2() && child3());
    const someChildrenChecked = computed(() => child1() || child2() || child3());
    const isMasterIndeterminate = computed(() => someChildrenChecked() && !allChildrenChecked());
    const masterChecked = computed(() => allChildrenChecked());
    
    const toggleMaster = () => {
      const newValue = !allChildrenChecked();
      child1.set(newValue);
      child2.set(newValue);
      child3.set(newValue);
    };

    return {
      moduleMetadata: {
        imports: [NgtCheckbox, FormsModule]
      },
      template: `
        <div class="p-8 space-y-4">
          <ngt-checkbox 
            [ngModel]="masterChecked()" 
            [indeterminate]="isMasterIndeterminate()" 
            (ngModelChange)="toggleMaster()"
            label="Select all">
          </ngt-checkbox>
          <div class="ml-6 mt-2 flex flex-col gap-3">
            <ngt-checkbox [(ngModel)]="child1" label="Option 1"></ngt-checkbox>
            <ngt-checkbox [(ngModel)]="child2" label="Option 2"></ngt-checkbox>
            <ngt-checkbox [(ngModel)]="child3" label="Option 3"></ngt-checkbox>
          </div>
        </div>
      `,
      props: {
        child1,
        child2,
        child3,
        masterChecked,
        isMasterIndeterminate,
        toggleMaster
      }
    };
  }
};

export const CustomTemplates: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [NgtCheckbox, FormsModule]
    },
    template: `
      <div class="p-8 space-y-4">
        <ngt-checkbox [(ngModel)]="templateValue" label="Custom templates">
          <ng-template #trueTemplate>
            <span class="text-green-600 dark:text-green-400 ml-2">✓ Active</span>
          </ng-template>
          <ng-template #falseTemplate>
            <span class="text-gray-500 ml-2">○ Inactive</span>
          </ng-template>
        </ngt-checkbox>
      </div>
    `,
    props: {
      templateValue: false
    }
  })
};

