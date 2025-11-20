import type { Meta, StoryObj } from '@storybook/angular';
import { AccordionComponent } from './accordion.component';
import { AccordionItemComponent } from './accordion-item.component';
import { signal } from '@angular/core';

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  argTypes: {
    multiOpen: {
      control: 'boolean',
      description: 'Whether multiple items can be open at once',
    },
  },
};

export default meta;
type Story = StoryObj<AccordionComponent>;

export const SingleOpen: Story = {
  args: {
    multiOpen: signal(false),
  },
  render: (args) => ({
    props: args,
    imports: [AccordionItemComponent],
    template: `
      <ui-accordion [multiOpen]="multiOpen">
        <ui-accordion-item title="First Item">
          <p class="text-gray-600">
            This is the content of the first accordion item.
          </p>
        </ui-accordion-item>
        <ui-accordion-item title="Second Item">
          <p class="text-gray-600">
            This is the content of the second accordion item.
          </p>
        </ui-accordion-item>
        <ui-accordion-item title="Third Item">
          <p class="text-gray-600">
            This is the content of the third accordion item.
          </p>
        </ui-accordion-item>
      </ui-accordion>
    `,
  }),
};

export const MultiOpen: Story = {
  args: {
    multiOpen: signal(true),
  },
  render: (args) => ({
    props: args,
    imports: [AccordionItemComponent],
    template: `
      <ui-accordion [multiOpen]="multiOpen">
        <ui-accordion-item title="First Item">
          <p class="text-gray-600">
            This is the content of the first accordion item.
          </p>
        </ui-accordion-item>
        <ui-accordion-item title="Second Item">
          <p class="text-gray-600">
            This is the content of the second accordion item.
          </p>
        </ui-accordion-item>
        <ui-accordion-item title="Third Item">
          <p class="text-gray-600">
            This is the content of the third accordion item.
          </p>
        </ui-accordion-item>
      </ui-accordion>
    `,
  }),
};

