import type { Meta, StoryObj } from '@storybook/angular';
import { NgtAccordion } from './accordion.component';
import { NgtAccordionItem } from './accordion-item.component';
import { signal } from '@angular/core';

const meta: Meta<NgtAccordion> = {
  title: 'Components/Accordion',
  component: NgtAccordion,
  tags: ['autodocs'],
  argTypes: {
    multiOpen: {
      control: 'boolean',
      description: 'Whether multiple items can be open at once'
    }
  }
};

export default meta;
type Story = StoryObj<NgtAccordion>;

export const SingleOpen: Story = {
  args: {
    multiOpen: signal(false)
  },
  render: args => ({
    props: args,
    imports: [NgtAccordionItem],
    template: `
      <ngt-accordion [multiOpen]="multiOpen">
        <ngt-accordion-item title="First Item">
          <p class="text-gray-600">
            This is the content of the first accordion item.
          </p>
        </ngt-accordion-item>
        <ngt-accordion-item title="Second Item">
          <p class="text-gray-600">
            This is the content of the second accordion item.
          </p>
        </ngt-accordion-item>
        <ngt-accordion-item title="Third Item">
          <p class="text-gray-600">
            This is the content of the third accordion item.
          </p>
        </ngt-accordion-item>
      </ngt-accordion>
    `
  })
};

export const MultiOpen: Story = {
  args: {
    multiOpen: signal(true)
  },
  render: args => ({
    props: args,
    imports: [NgtAccordionItem],
    template: `
      <ngt-accordion [multiOpen]="multiOpen">
        <ngt-accordion-item title="First Item">
          <p class="text-gray-600">
            This is the content of the first accordion item.
          </p>
        </ngt-accordion-item>
        <ngt-accordion-item title="Second Item">
          <p class="text-gray-600">
            This is the content of the second accordion item.
          </p>
        </ngt-accordion-item>
        <ngt-accordion-item title="Third Item">
          <p class="text-gray-600">
            This is the content of the third accordion item.
          </p>
        </ngt-accordion-item>
      </ngt-accordion>
    `
  })
};
