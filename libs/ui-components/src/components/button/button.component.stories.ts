import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
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
type Story = StoryObj<ButtonComponent>;

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
    template: `<ui-button [variant]="variant" [size]="size" [type]="type" [disabled]="disabled" [loading]="loading">Button</ui-button>`
  })
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md'
  },
  render: args => ({
    props: args,
    template: `<ui-button [variant]="variant" [size]="size">Outline Button</ui-button>`
  })
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md'
  },
  render: args => ({
    props: args,
    template: `<ui-button [variant]="variant" [size]="size">Ghost Button</ui-button>`
  })
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex gap-4 items-center">
        <ui-button variant="primary" size="sm">Small</ui-button>
        <ui-button variant="primary" size="md">Medium</ui-button>
        <ui-button variant="primary" size="lg">Large</ui-button>
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
    template: `<ui-button [variant]="variant" [loading]="loading">Loading...</ui-button>`
  })
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true
  },
  render: args => ({
    props: args,
    template: `<ui-button [variant]="variant" [disabled]="disabled">Disabled</ui-button>`
  })
};
