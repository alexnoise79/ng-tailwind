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
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
      description: 'Placement of dropdown content relative to trigger'
    }
  }
};

export default meta;
type Story = StoryObj<NgtDropdown>;

export const Default: Story = {
  args: {
    placement: 'bottom-start'
  },
  render: args => {
    const isOpen = signal(false);
    return {
      props: { ...args, isOpen },
      moduleMetadata: {
        imports: [NgtDropdown, NgtDropdownTrigger, NgtDropdownContent]
      },
      template: `
        <ngt-dropdown [placement]="placement" [isOpen]="isOpen">
          <button
            ngt-dropdown-trigger
            class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Open Dropdown
          </button>
          <div ngt-dropdown-content class="w-48 bg-white rounded-md shadow-lg border border-gray-200">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
          </div>
        </ngt-dropdown>
      `
    };
  }
};

export const BottomEnd: Story = {
  args: {
    placement: 'bottom-end'
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
          <ngt-dropdown [placement]="placement" [isOpen]="isOpen">
            <button
              ngt-dropdown-trigger
              class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Bottom End
            </button>
            <div ngt-dropdown-content class="w-48 bg-white rounded-md shadow-lg border border-gray-200">
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
