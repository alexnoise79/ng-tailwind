import type { Meta, StoryObj } from '@storybook/angular';
import { NgtDropdown } from './dropdown.component';
import { NgtDropdownTrigger } from './dropdown-trigger.directive';
import { NgtDropdownContent } from './dropdown-content.directive';
import { signal } from '@angular/core';

const meta: Meta<NgtDropdown> = {
  title: 'Components/Dropdown',
  component: NgtDropdown,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Alignment of dropdown content'
    }
  }
};

export default meta;
type Story = StoryObj<NgtDropdown>;

export const Default: Story = {
  args: {
    align: 'left'
  },
  render: args => {
    const isOpen = signal(false);
    return {
      props: { ...args, isOpen },
      moduleMetadata: {
        imports: [NgtDropdown, NgtDropdownTrigger, NgtDropdownContent]
      },
      template: `
        <ngt-dropdown [align]="align" [isOpen]="isOpen">
          <button
            ngt-dropdown-trigger
            class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Open Dropdown
          </button>
          <div ngt-dropdown-content class="mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
          </div>
        </ngt-dropdown>
      `
    };
  }
};

export const RightAligned: Story = {
  args: {
    align: 'right'
  },
  render: args => {
    const isOpen = signal(false);
    return {
      props: { ...args, isOpen },
      moduleMetadata: {
        imports: [NgtDropdown, NgtDropdownTrigger, NgtDropdownContent]
      },
      template: `
        <div class="flex justify-end">
          <ngt-dropdown [align]="align" [isOpen]="isOpen">
            <button
              ngt-dropdown-trigger
              class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Right Aligned
            </button>
            <div ngt-dropdown-content class="mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
            </div>
          </ngt-dropdown>
        </div>
      `
    };
  }
};
