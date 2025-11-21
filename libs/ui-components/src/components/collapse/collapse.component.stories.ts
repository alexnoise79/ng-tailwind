import type { Meta, StoryObj } from '@storybook/angular';
import { NgtCollapse } from './collapse.component';
import { NgtButton } from '../button/button.component';
import { signal } from '@angular/core';

const meta: Meta<NgtCollapse> = {
  title: 'Components/Collapse',
  component: NgtCollapse,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the collapse is open',
    },
    horizontal: {
      control: 'boolean',
      description: 'Whether to collapse horizontally instead of vertically',
    },
  },
};

export default meta;
type Story = StoryObj<NgtCollapse>;

export const Default: Story = {
  args: {
    isOpen: signal(false),
    horizontal: false,
  },
  render: (args) => ({
    props: args,
    imports: [NgtButton],
    template: `
      <div class="space-y-4">
        <ngt-button variant="primary" (click)="isOpen.set(!isOpen())">
          {{ isOpen() ? 'Hide' : 'Show' }} Content
        </ngt-button>
        <ngt-collapse [isOpen]="isOpen" [horizontal]="horizontal">
          <div class="bg-gray-100 p-4 rounded-md">
            <p class="text-gray-700">
              This is collapsible content. It can be shown or hidden with smooth animations.
            </p>
            <p class="text-gray-600 mt-2">
              The collapse component supports both vertical and horizontal collapsing.
            </p>
          </div>
        </ngt-collapse>
      </div>
    `,
  }),
};

export const Horizontal: Story = {
  args: {
    isOpen: signal(false),
    horizontal: true,
  },
  render: (args) => ({
    props: args,
    imports: [NgtButton],
    template: `
      <div class="space-y-4">
        <ngt-button variant="primary" (click)="isOpen.set(!isOpen())">
          {{ isOpen() ? 'Hide' : 'Show' }} Content
        </ngt-button>
        <div class="flex items-center gap-2">
          <ngt-collapse [isOpen]="isOpen" [horizontal]="horizontal">
            <div class="bg-gray-100 p-4 rounded-md whitespace-nowrap">
              <p class="text-gray-700">Horizontal collapse content</p>
            </div>
          </ngt-collapse>
          <span class="text-gray-500">After collapse</span>
        </div>
      </div>
    `,
  }),
};

export const WithRichContent: Story = {
  args: {
    isOpen: signal(false),
    horizontal: false,
  },
  render: (args) => ({
    props: args,
    imports: [NgtButton],
    template: `
      <div class="space-y-4">
        <ngt-button variant="primary" (click)="isOpen.set(!isOpen())">
          Toggle Rich Content
        </ngt-button>
        <ngt-collapse [isOpen]="isOpen">
          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Rich Content Example</h3>
            <p class="text-gray-600 mb-4">
              The collapse component can contain any content, including headings, paragraphs,
              lists, and more.
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-1 mb-4">
              <li>Feature one</li>
              <li>Feature two</li>
              <li>Feature three</li>
            </ul>
            <div class="flex gap-2">
              <ngt-button variant="outline" size="sm">Action 1</ngt-button>
              <ngt-button variant="primary" size="sm">Action 2</ngt-button>
            </div>
          </div>
        </ngt-collapse>
      </div>
    `,
  }),
};

