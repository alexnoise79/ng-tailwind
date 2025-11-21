import type { Meta, StoryObj } from '@storybook/angular';
import { NgtButton } from './button.component';

const meta: Meta<NgtButton> = {
  title: 'Components/Button',
  component: NgtButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'outline', 'ghost'],
      description: 'Button variant style'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size'
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Button type attribute'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state'
    }
  }
};

export default meta;
type Story = StoryObj<NgtButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtButton]
    },
    template: `<ngt-button [variant]="variant" [size]="size" [type]="type" [disabled]="disabled" [loading]="loading">Button</ngt-button>`
  })
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md'
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtButton]
    },
    template: `<ngt-button [variant]="variant" [size]="size">Outline Button</ngt-button>`
  })
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md'
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtButton]
    },
    template: `<ngt-button [variant]="variant" [size]="size">Ghost Button</ngt-button>`
  })
};

export const Sizes: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [NgtButton]
    },
    template: `
      <div class="flex gap-4 items-center">
        <ngt-button variant="primary" size="sm">Small</ngt-button>
        <ngt-button variant="primary" size="md">Medium</ngt-button>
        <ngt-button variant="primary" size="lg">Large</ngt-button>
      </div>
    `
  })
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtButton]
    },
    template: `<ngt-button [variant]="variant" [loading]="loading">Loading...</ngt-button>`
  })
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtButton]
    },
    template: `<ngt-button [variant]="variant" [disabled]="disabled">Disabled</ngt-button>`
  })
};
