import type { Meta, StoryObj } from '@storybook/angular';
import { NgtOffCanvas, OffcanvasPosition } from './offcanvas.component';
import { NgtButton } from '../button/button.component';
import { signal } from '@angular/core';

const meta: Meta<NgtOffCanvas> = {
  title: 'Components/Offcanvas',
  component: NgtOffCanvas,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the offcanvas is open'
    },
    title: {
      control: 'text',
      description: 'Offcanvas title'
    },
    position: {
      control: 'select',
      options: ['start', 'end', 'top', 'bottom'],
      description: 'Position of the offcanvas'
    },
    showHeader: {
      control: 'boolean',
      description: 'Whether to show header section'
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Whether to close on backdrop click'
    },
    backdrop: {
      control: 'boolean',
      description: 'Whether to show backdrop'
    }
  }
};

export default meta;
type Story = StoryObj<NgtOffCanvas>;

export const Default: Story = {
  args: {
    isOpen: signal(false),
    title: 'Example Offcanvas',
    position: 'end',
    showHeader: true,
    closeOnBackdropClick: true,
    backdrop: true
  },
  render: args => ({
    props: args,
    imports: [NgtButton],
    template: `
      <div>
        <ngt-button variant="primary" (click)="isOpen.set(true)">Open Offcanvas</ngt-button>
        @if (isOpen()) {
          <ngt-offcanvas
            [isOpen]="isOpen"
            [title]="title"
            [position]="position"
            [showHeader]="showHeader"
            [closeOnBackdropClick]="closeOnBackdropClick"
            [backdrop]="backdrop"
            (closed)="isOpen.set(false)"
          >
            <div class="space-y-4">
              <p class="text-gray-600">
                This is an offcanvas component that slides in from the edge of the screen.
                It includes focus trapping, keyboard navigation, and smooth animations.
              </p>
              <p class="text-gray-600">
                You can place any content here.
              </p>
              <div class="flex gap-2 mt-6">
                <ngt-button variant="outline" (click)="isOpen.set(false)">Close</ngt-button>
                <ngt-button variant="primary" (click)="isOpen.set(false)">Save Changes</ngt-button>
              </div>
            </div>
          </ngt-offcanvas>
        }
      </div>
    `
  })
};

export const FromStart: Story = {
  args: {
    isOpen: signal(false),
    title: 'Offcanvas from Start',
    position: 'start',
    showHeader: true,
    closeOnBackdropClick: true,
    backdrop: true
  },
  render: args => ({
    props: args,
    imports: [NgtButton],
    template: `
      <div>
        <ngt-button variant="primary" (click)="isOpen.set(true)">Open from Start</ngt-button>
        @if (isOpen()) {
          <ngt-offcanvas
            [isOpen]="isOpen"
            [title]="title"
            [position]="position"
            (closed)="isOpen.set(false)"
          >
            <div class="space-y-4">
              <p class="text-gray-600">This offcanvas slides in from the left side.</p>
            </div>
          </ngt-offcanvas>
        }
      </div>
    `
  })
};

export const FromTop: Story = {
  args: {
    isOpen: signal(false),
    title: 'Offcanvas from Top',
    position: 'top',
    showHeader: true,
    closeOnBackdropClick: true,
    backdrop: true
  },
  render: args => ({
    props: args,
    imports: [NgtButton],
    template: `
      <div>
        <ngt-button variant="primary" (click)="isOpen.set(true)">Open from Top</ngt-button>
        @if (isOpen()) {
          <ngt-offcanvas
            [isOpen]="isOpen"
            [title]="title"
            [position]="position"
            (closed)="isOpen.set(false)"
          >
            <div class="space-y-4">
              <p class="text-gray-600">This offcanvas slides in from the top of the screen.</p>
            </div>
          </ngt-offcanvas>
        }
      </div>
    `
  })
};

export const FromBottom: Story = {
  args: {
    isOpen: signal(false),
    title: 'Offcanvas from Bottom',
    position: 'bottom',
    showHeader: true,
    closeOnBackdropClick: true,
    backdrop: true
  },
  render: args => ({
    props: args,
    imports: [NgtButton],
    template: `
      <div>
        <ngt-button variant="primary" (click)="isOpen.set(true)">Open from Bottom</ngt-button>
        @if (isOpen()) {
          <ngt-offcanvas
            [isOpen]="isOpen"
            [title]="title"
            [position]="position"
            (closed)="isOpen.set(false)"
          >
            <div class="space-y-4">
              <p class="text-gray-600">This offcanvas slides in from the bottom of the screen.</p>
            </div>
          </ngt-offcanvas>
        }
      </div>
    `
  })
};

export const WithoutBackdrop: Story = {
  args: {
    isOpen: signal(false),
    title: 'Offcanvas without Backdrop',
    position: 'end',
    showHeader: true,
    closeOnBackdropClick: true,
    backdrop: false
  },
  render: args => ({
    props: args,
    imports: [NgtButton],
    template: `
      <div>
        <ngt-button variant="primary" (click)="isOpen.set(true)">Open without Backdrop</ngt-button>
        @if (isOpen()) {
          <ngt-offcanvas
            [isOpen]="isOpen"
            [title]="title"
            [position]="position"
            [backdrop]="backdrop"
            (closed)="isOpen.set(false)"
          >
            <div class="space-y-4">
              <p class="text-gray-600">This offcanvas has no backdrop.</p>
              <p class="text-gray-600">The background remains fully visible and interactive.</p>
            </div>
          </ngt-offcanvas>
        }
      </div>
    `
  })
};

