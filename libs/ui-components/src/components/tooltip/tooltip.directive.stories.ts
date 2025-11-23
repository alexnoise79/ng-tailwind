import type { Meta, StoryObj } from '@storybook/angular';
import { NgtTooltip } from './tooltip.directive';

const meta: Meta<NgtTooltip> = {
  title: 'Components/Tooltip',
  component: NgtTooltip,
  tags: ['autodocs'],
  argTypes: {
    ngtTooltip: {
      control: 'text',
      description: 'Tooltip text content'
    },
    tooltipPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip position'
    },
    delay: {
      control: 'number',
      description: 'Legacy delay in milliseconds before showing tooltip'
    },
    showDelay: {
      control: 'number',
      description: 'Delay in milliseconds before showing tooltip'
    },
    hideDelay: {
      control: 'number',
      description: 'Delay in milliseconds before hiding tooltip'
    }
  }
};

export default meta;
type Story = StoryObj<NgtTooltip>;

export const Default: Story = {
  args: {
    ngtTooltip: 'This is a tooltip',
    tooltipPosition: 'top',
    delay: 200
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtTooltip]
    },
    template: `
      <div class="p-8">
        <button 
          [ngtTooltip]="ngtTooltip" 
          [tooltipPosition]="tooltipPosition" 
          [delay]="delay"
          class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
          Hover me
        </button>
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
          <button 
            ngtTooltip="Top tooltip" 
            tooltipPosition="top"
            class="px-4 py-2 bg-primary-600 text-white rounded-md">
            Top
          </button>
        </div>
        <div class="flex justify-between">
          <button 
            ngtTooltip="Left tooltip" 
            tooltipPosition="left"
            class="px-4 py-2 bg-primary-600 text-white rounded-md">
            Left
          </button>
          <button 
            ngtTooltip="Right tooltip" 
            tooltipPosition="right"
            class="px-4 py-2 bg-primary-600 text-white rounded-md">
            Right
          </button>
        </div>
        <div class="flex justify-center">
          <button 
            ngtTooltip="Bottom tooltip" 
            tooltipPosition="bottom"
            class="px-4 py-2 bg-primary-600 text-white rounded-md">
            Bottom
          </button>
        </div>
      </div>
    `
  })
};

