import type { Meta, StoryObj } from '@storybook/angular';
import { TooltipComponent } from './tooltip.component';

const meta: Meta<TooltipComponent> = {
  title: 'Components/Tooltip',
  component: TooltipComponent,
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
type Story = StoryObj<TooltipComponent>;

export const Default: Story = {
  args: {
    text: 'This is a tooltip',
    position: 'top',
    delay: 200
  },
  render: args => ({
    props: args,
    template: `
      <div class="p-8">
        <ui-tooltip [text]="text" [position]="position" [delay]="delay">
          <button class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
            Hover me
          </button>
        </ui-tooltip>
      </div>
    `
  })
};

export const Positions: Story = {
  render: () => ({
    template: `
      <div class="p-16 space-y-8">
        <div class="flex justify-center">
          <ui-tooltip text="Top tooltip" position="top">
            <button class="px-4 py-2 bg-primary-600 text-white rounded-md">Top</button>
          </ui-tooltip>
        </div>
        <div class="flex justify-between">
          <ui-tooltip text="Left tooltip" position="left">
            <button class="px-4 py-2 bg-primary-600 text-white rounded-md">Left</button>
          </ui-tooltip>
          <ui-tooltip text="Right tooltip" position="right">
            <button class="px-4 py-2 bg-primary-600 text-white rounded-md">Right</button>
          </ui-tooltip>
        </div>
        <div class="flex justify-center">
          <ui-tooltip text="Bottom tooltip" position="bottom">
            <button class="px-4 py-2 bg-primary-600 text-white rounded-md">Bottom</button>
          </ui-tooltip>
        </div>
      </div>
    `
  })
};
