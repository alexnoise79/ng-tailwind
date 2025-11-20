import type { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from './modal.component';
import { ButtonComponent } from '../button/button.component';
import { signal } from '@angular/core';

const meta: Meta<ModalComponent> = {
  title: 'Components/Modal',
  component: ModalComponent,
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
type Story = StoryObj<ModalComponent>;

export const Default: Story = {
  args: {
    isOpen: signal(false),
    title: 'Example Modal',
    showFooter: false,
    closeOnBackdropClick: true
  },
  render: args => ({
    props: args,
    imports: [ButtonComponent],
    template: `
      <div>
        <ui-button variant="primary" (click)="isOpen.set(true)">Open Modal</ui-button>
        <ui-modal
          [isOpen]="isOpen"
          [title]="title"
          [showFooter]="showFooter"
          [closeOnBackdropClick]="closeOnBackdropClick"
          (close)="isOpen.set(false)"
        >
          <p class="text-gray-600 mb-4">
            This is a modal dialog built with Angular CDK Overlay.
            It includes focus trapping, keyboard navigation, and animations.
          </p>
        </ui-modal>
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
    imports: [ButtonComponent],
    template: `
      <div>
        <ui-button variant="primary" (click)="isOpen.set(true)">Open Modal</ui-button>
        <ui-modal
          [isOpen]="isOpen"
          [title]="title"
          [showFooter]="showFooter"
          (close)="isOpen.set(false)"
        >
          <p class="text-gray-600 mb-4">
            This modal has a footer section with action buttons.
          </p>
          <div footer>
            <ui-button variant="outline" (click)="isOpen.set(false)">Cancel</ui-button>
            <ui-button variant="primary" (click)="isOpen.set(false)">Confirm</ui-button>
          </div>
        </ui-modal>
      </div>
    `
  })
};
