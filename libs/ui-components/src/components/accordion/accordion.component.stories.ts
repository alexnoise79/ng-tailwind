import type { Meta, StoryObj } from '@storybook/angular';
import { NgtAccordion, NgtAccordionItem, NgtAccordionHeader, NgtAccordionButton, NgtAccordionCollapse, NgtAccordionBody } from './index';

const meta: Meta<NgtAccordion> = {
  title: 'Components/Accordion',
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
    multiOpen: false
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtAccordion, NgtAccordionItem, NgtAccordionHeader, NgtAccordionButton, NgtAccordionCollapse, NgtAccordionBody]
    },
    template: `
      <div ngtAccordion [multiOpen]="multiOpen">
        <div ngtAccordionItem #firstItem="NgtAccordionItem">
          <h2 ngtAccordionHeader>
            <button ngtAccordionButton>
              <span class="font-medium text-gray-900 dark:text-white">First Item</span>
              <svg [class.rotate-180]="firstItem.isOpen()" class="h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </h2>
          <div ngtAccordionCollapse>
            <div ngtAccordionBody>
              <p class="text-gray-600">
                This is the content of the first accordion item.
              </p>
            </div>
          </div>
        </div>
        <div ngtAccordionItem #secondItem="NgtAccordionItem">
          <h2 ngtAccordionHeader>
            <button ngtAccordionButton>
              <span class="font-medium text-gray-900 dark:text-white">Second Item</span>
              <svg [class.rotate-180]="secondItem.isOpen()" class="h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </h2>
          <div ngtAccordionCollapse>
            <div ngtAccordionBody>
              <p class="text-gray-600">
                This is the content of the second accordion item.
              </p>
            </div>
          </div>
        </div>
        <div ngtAccordionItem #thirdItem="NgtAccordionItem">
          <h2 ngtAccordionHeader>
            <button ngtAccordionButton>
              <span class="font-medium text-gray-900 dark:text-white">Third Item</span>
              <svg [class.rotate-180]="thirdItem.isOpen()" class="h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </h2>
          <div ngtAccordionCollapse>
            <div ngtAccordionBody>
              <p class="text-gray-600">
                This is the content of the third accordion item.
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  })
};

export const MultiOpen: Story = {
  args: {
    multiOpen: true
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtAccordion, NgtAccordionItem, NgtAccordionHeader, NgtAccordionButton, NgtAccordionCollapse, NgtAccordionBody]
    },
    template: `
      <div ngtAccordion [multiOpen]="multiOpen">
        <div ngtAccordionItem #firstItem="NgtAccordionItem">
          <h2 ngtAccordionHeader>
            <button ngtAccordionButton>
              <span class="font-medium text-gray-900 dark:text-white">First Item</span>
              <svg [class.rotate-180]="firstItem.isOpen()" class="h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </h2>
          <div ngtAccordionCollapse>
            <div ngtAccordionBody>
              <p class="text-gray-600">
                This is the content of the first accordion item.
              </p>
            </div>
          </div>
        </div>
        <div ngtAccordionItem #secondItem="NgtAccordionItem">
          <h2 ngtAccordionHeader>
            <button ngtAccordionButton>
              <span class="font-medium text-gray-900 dark:text-white">Second Item</span>
              <svg [class.rotate-180]="secondItem.isOpen()" class="h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </h2>
          <div ngtAccordionCollapse>
            <div ngtAccordionBody>
              <p class="text-gray-600">
                This is the content of the second accordion item.
              </p>
            </div>
          </div>
        </div>
        <div ngtAccordionItem #thirdItem="NgtAccordionItem">
          <h2 ngtAccordionHeader>
            <button ngtAccordionButton>
              <span class="font-medium text-gray-900 dark:text-white">Third Item</span>
              <svg [class.rotate-180]="thirdItem.isOpen()" class="h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </h2>
          <div ngtAccordionCollapse>
            <div ngtAccordionBody>
              <p class="text-gray-600">
                This is the content of the third accordion item.
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  })
};

export const Disabled: Story = {
  args: {
    multiOpen: false
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtAccordion, NgtAccordionItem, NgtAccordionHeader, NgtAccordionButton, NgtAccordionCollapse, NgtAccordionBody]
    },
    template: `
      <div ngtAccordion [multiOpen]="multiOpen">
        <div ngtAccordionItem [disabled]="true">
          <h2 ngtAccordionHeader>
            <button ngtAccordionButton>
              <span class="font-medium text-gray-900 dark:text-white">Disabled Item</span>
              <svg class="h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </h2>
          <div ngtAccordionCollapse>
            <div ngtAccordionBody>
              <p class="text-gray-600">
                This accordion item is disabled and cannot be toggled.
              </p>
            </div>
          </div>
        </div>
        <div ngtAccordionItem #enabledItem="NgtAccordionItem">
          <h2 ngtAccordionHeader>
            <button ngtAccordionButton>
              <span class="font-medium text-gray-900 dark:text-white">Enabled Item</span>
              <svg [class.rotate-180]="enabledItem.isOpen()" class="h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </h2>
          <div ngtAccordionCollapse>
            <div ngtAccordionBody>
              <p class="text-gray-600">
                This accordion item is enabled and can be toggled.
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  })
};
