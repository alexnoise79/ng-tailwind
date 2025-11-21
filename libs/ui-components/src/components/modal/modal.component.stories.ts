import type { Meta, StoryObj } from '@storybook/angular';
import { NgtModal } from './modal.component';
import { NgtButton } from '../button/button.component';
import { signal } from '@angular/core';

const meta: Meta<NgtModal> = {
  title: 'Components/Modal',
  component: NgtModal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open'
    },
    title: {
      control: 'text',
      description: 'Modal title'
    },
    showFooter: {
      control: 'boolean',
      description: 'Whether to show footer section'
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Whether to close on backdrop click'
    }
  }
};

export default meta;
type Story = StoryObj<NgtModal>;

export const Default: Story = {
  args: {
    isOpen: signal(false),
    title: 'Example Modal',
    showFooter: false,
    closeOnBackdropClick: true
  },
  render: args => ({
    props: args,
    imports: [NgtButton],
    template: `
      <div>
        <ngt-button variant="primary" (click)="isOpen.set(true)">Open Modal</ngt-button>
        <ngt-modal
          [isOpen]="isOpen"
          [title]="title"
          [showFooter]="showFooter"
          [closeOnBackdropClick]="closeOnBackdropClick"
          (closed)="isOpen.set(false)"
        >
          <p class="text-gray-600 mb-4">
            This is a modal dialog built with Angular CDK Overlay.
            It includes focus trapping, keyboard navigation, and animations.
          </p>
        </ngt-modal>
      </div>
    `
  })
};

export const WithFooter: Story = {
  args: {
    isOpen: signal(false),
    title: 'Modal with Footer',
    showFooter: true,
    closeOnBackdropClick: true
  },
  render: args => ({
    props: args,
    imports: [NgtButton],
    template: `
      <div>
        <ngt-button variant="primary" (click)="isOpen.set(true)">Open Modal</ngt-button>
        <ngt-modal
          [isOpen]="isOpen"
          [title]="title"
          [showFooter]="showFooter"
          (closed)="isOpen.set(false)"
        >
          <p class="text-gray-600 mb-4">
            This modal has a footer section with action buttons.
          </p>
          <div footer>
            <ngt-button variant="outline" (click)="isOpen.set(false)">Cancel</ngt-button>
            <ngt-button variant="primary" (click)="isOpen.set(false)">Confirm</ngt-button>
          </div>
        </ngt-modal>
      </div>
    `
  })
};
