import type { Meta, StoryObj } from '@storybook/angular';
import { NgtTooltip } from './tooltip.component';

const meta: Meta<NgtTooltip> = {
  title: 'Components/Tooltip',
  component: NgtTooltip,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Tooltip text content'
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip position'
    },
    delay: {
      control: 'number',
      description: 'Delay in milliseconds before showing tooltip'
    }
  }
};

export default meta;
type Story = StoryObj<NgtTooltip>;

export const Default: Story = {
  args: {
    text: 'This is a tooltip',
    position: 'top',
    delay: 200
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtTooltip]
    },
    template: `
      <div class="p-8">
        <ngt-tooltip [text]="text" [position]="position" [delay]="delay">
          <button class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
            Hover me
          </button>
        </ngt-tooltip>
      </div>
    `
  })
};

export const Positions: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [NgtTooltip]
    },
    template: `
      <div class="p-16 space-y-8">
        <div class="flex justify-center">
          <ngt-tooltip text="Top tooltip" position="top">
            <button class="px-4 py-2 bg-primary-600 text-white rounded-md">Top</button>
          </ngt-tooltip>
        </div>
        <div class="flex justify-between">
          <ngt-tooltip text="Left tooltip" position="left">
            <button class="px-4 py-2 bg-primary-600 text-white rounded-md">Left</button>
          </ngt-tooltip>
          <ngt-tooltip text="Right tooltip" position="right">
            <button class="px-4 py-2 bg-primary-600 text-white rounded-md">Right</button>
          </ngt-tooltip>
        </div>
        <div class="flex justify-center">
          <ngt-tooltip text="Bottom tooltip" position="bottom">
            <button class="px-4 py-2 bg-primary-600 text-white rounded-md">Bottom</button>
          </ngt-tooltip>
        </div>
      </div>
    `
  })
};
