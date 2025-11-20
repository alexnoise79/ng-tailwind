import type { Meta, StoryObj } from '@storybook/angular';
import { DropdownComponent } from './dropdown.component';
import { DropdownTriggerDirective } from './dropdown-trigger.directive';
import { DropdownContentDirective } from './dropdown-content.directive';
import { signal } from '@angular/core';

const meta: Meta<DropdownComponent> = {
  title: 'Components/Dropdown',
  component: DropdownComponent,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Alignment of dropdown content',
    },
  },
};

export default meta;
type Story = StoryObj<DropdownComponent>;

export const Default: Story = {
  args: {
    align: 'left',
    isOpen: signal(false),
  },
  render: (args) => ({
    props: args,
    imports: [DropdownTriggerDirective, DropdownContentDirective],
    template: `
      <ui-dropdown [align]="align" [isOpen]="isOpen">
        <button
          ui-dropdown-trigger
          class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Open Dropdown
        </button>
        <div ui-dropdown-content class="mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
        </div>
      </ui-dropdown>
    `,
  }),
};

export const RightAligned: Story = {
  args: {
    align: 'right',
    isOpen: signal(false),
  },
  render: (args) => ({
    props: args,
    imports: [DropdownTriggerDirective, DropdownContentDirective],
    template: `
      <div class="flex justify-end">
        <ui-dropdown [align]="align" [isOpen]="isOpen">
          <button
            ui-dropdown-trigger
            class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Right Aligned
          </button>
          <div ui-dropdown-content class="mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
          </div>
        </ui-dropdown>
      </div>
    `,
  }),
};

