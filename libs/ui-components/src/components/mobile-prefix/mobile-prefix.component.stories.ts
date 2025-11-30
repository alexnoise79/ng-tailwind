import type { Meta, StoryObj } from '@storybook/angular';
import { NgtMobilePrefix, IPrefix, IMobilePrefix } from './mobile-prefix.component';
import { signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

const samplePrefixes: Array<IPrefix> = [
  { id: 1, name: 'United States', dialCode: '1', code: 'US' },
  { id: 2, name: 'United Kingdom', dialCode: '44', code: 'GB' },
  { id: 3, name: 'Canada', dialCode: '1', code: 'CA' },
  { id: 4, name: 'Germany', dialCode: '49', code: 'DE' },
  { id: 5, name: 'France', dialCode: '33', code: 'FR' },
  { id: 6, name: 'Italy', dialCode: '39', code: 'IT' },
  { id: 7, name: 'Spain', dialCode: '34', code: 'ES' },
  { id: 8, name: 'Australia', dialCode: '61', code: 'AU' },
  { id: 9, name: 'Japan', dialCode: '81', code: 'JP' },
  { id: 10, name: 'China', dialCode: '86', code: 'CN' },
  { id: 11, name: 'Kazakhstan', dialCode: '7', code: 'KZ' },
  { id: 12, name: 'South Korea', dialCode: '82', code: 'KR' },
  { id: 13, name: 'Brazil', dialCode: '55', code: 'BR' },
  { id: 14, name: 'India', dialCode: '91', code: 'IN' },
  { id: 15, name: 'Russia', dialCode: '7', code: 'RU' },
  { id: 16, name: 'Mexico', dialCode: '52', code: 'MX' },
  { id: 17, name: 'Indonesia', dialCode: '62', code: 'ID' },
  { id: 18, name: 'Turkey', dialCode: '90', code: 'TR' },
  { id: 19, name: 'Saudi Arabia', dialCode: '966', code: 'SA' },
  { id: 20, name: 'United Arab Emirates', dialCode: '971', code: 'AE' }
];

const meta: Meta<NgtMobilePrefix> = {
  title: 'Components/Mobile Prefix',
  component: NgtMobilePrefix,
  tags: ['autodocs'],
  argTypes: {
    values: {
      control: 'object',
      description: 'Array of country prefixes to display in the dropdown'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the phone number input field'
    },
    readonly: {
      control: 'boolean',
      description: 'Makes the phone number input field readonly'
    }
  }
};

export default meta;
type Story = StoryObj<NgtMobilePrefix>;

export const Default: Story = {
  args: {
    values: samplePrefixes,
    placeholder: '',
    readonly: false
  },
  render: args => {
    const mobileValue = signal<IMobilePrefix | null>(null);
    return {
      props: {
        ...args,
        mobileValue: mobileValue,
        onValueChange: (value: IMobilePrefix | null) => {
          mobileValue.set(value);
        }
      },
      moduleMetadata: {
        imports: [NgtMobilePrefix, FormsModule]
      },
      template: `
        <div class="p-8">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <ngt-mobile-prefix
              [(ngModel)]="mobileValue"
              [values]="values"
              [placeholder]="placeholder"
              [readonly]="readonly"
              class="w-full md:w-96"
            />
          </div>
          @if (mobileValue() && mobileValue()?.country) {
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Value: +{{ mobileValue()?.country?.dialCode }}{{ mobileValue()?.phone }}
            </p>
          } @else {
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Value: Empty
            </p>
          }
        </div>
      `
    };
  }
};

export const WithPlaceholder: Story = {
  args: {
    values: samplePrefixes,
    placeholder: 'Enter phone number',
    readonly: false
  },
  render: args => {
    const mobileValue = signal<IMobilePrefix | null>(null);
    return {
      props: {
        ...args,
        mobileValue: mobileValue
      },
      moduleMetadata: {
        imports: [NgtMobilePrefix, FormsModule]
      },
      template: `
        <div class="p-8">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number with Placeholder
            </label>
            <ngt-mobile-prefix
              [(ngModel)]="mobileValue"
              [values]="values"
              [placeholder]="placeholder"
              [readonly]="readonly"
              class="w-full md:w-96"
            />
          </div>
        </div>
      `
    };
  }
};

export const WithInitialValue: Story = {
  args: {
    values: samplePrefixes,
    placeholder: '',
    readonly: false
  },
  render: args => {
    const initialValue = new IMobilePrefix('3451234567', samplePrefixes.find(p => p.code === 'IT') || samplePrefixes[5]);
    const mobileValue = signal<IMobilePrefix | null>(initialValue);
    return {
      props: {
        ...args,
        mobileValue: mobileValue
      },
      moduleMetadata: {
        imports: [NgtMobilePrefix, FormsModule]
      },
      template: `
        <div class="p-8">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number with Initial Value
            </label>
            <ngt-mobile-prefix
              [(ngModel)]="mobileValue"
              [values]="values"
              [placeholder]="placeholder"
              [readonly]="readonly"
              class="w-full md:w-96"
            />
          </div>
          @if (mobileValue() && mobileValue()?.country) {
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Value: +{{ mobileValue()?.country?.dialCode }}{{ mobileValue()?.phone }}
            </p>
          }
        </div>
      `
    };
  }
};

export const Readonly: Story = {
  args: {
    values: samplePrefixes,
    placeholder: '',
    readonly: true
  },
  render: args => {
    const initialValue = new IMobilePrefix('3451234567', samplePrefixes.find(p => p.code === 'IT') || samplePrefixes[5]);
    const mobileValue = signal<IMobilePrefix | null>(initialValue);
    return {
      props: {
        ...args,
        mobileValue: mobileValue
      },
      moduleMetadata: {
        imports: [NgtMobilePrefix, FormsModule]
      },
      template: `
        <div class="p-8">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Readonly Phone Number
            </label>
            <ngt-mobile-prefix
              [(ngModel)]="mobileValue"
              [values]="values"
              [placeholder]="placeholder"
              [readonly]="readonly"
              class="w-full md:w-96"
            />
          </div>
        </div>
      `
    };
  }
};

export const Disabled: Story = {
  args: {
    values: samplePrefixes,
    placeholder: '',
    readonly: false
  },
  render: args => {
    const mobileValue = signal<IMobilePrefix | null>(null);
    return {
      props: {
        ...args,
        mobileValue: mobileValue
      },
      moduleMetadata: {
        imports: [NgtMobilePrefix, FormsModule]
      },
      template: `
        <div class="p-8">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Disabled Phone Number
            </label>
            <ngt-mobile-prefix
              [(ngModel)]="mobileValue"
              [values]="values"
              [placeholder]="placeholder"
              [readonly]="readonly"
              [disabled]="true"
              class="w-full md:w-96"
            />
          </div>
        </div>
      `
    };
  }
};

export const WithFormIntegration: Story = {
  args: {
    values: samplePrefixes,
    placeholder: 'Enter phone number',
    readonly: false
  },
  render: args => {
    const mobileValue = signal<IMobilePrefix | null>(null);
    const formSubmitted = signal(false);
    return {
      props: {
        ...args,
        mobileValue: mobileValue,
        formSubmitted: formSubmitted,
        onSubmit: () => {
          formSubmitted.set(true);
          console.log('Form submitted', mobileValue());
        }
      },
      moduleMetadata: {
        imports: [NgtMobilePrefix, FormsModule]
      },
      template: `
        <div class="p-8">
          <form #exampleForm="ngForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <div class="flex flex-col gap-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <ngt-mobile-prefix
                #phone="ngModel"
                [(ngModel)]="mobileValue"
                [values]="values"
                [placeholder]="placeholder"
                name="phone"
                required
                class="w-full md:w-96"
              />
              @if (phone.invalid && (phone.touched || formSubmitted())) {
                <p class="text-sm text-red-600 dark:text-red-400">
                  Phone number is required.
                </p>
              }
            </div>
            <button
              type="submit"
              class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Submit
            </button>
          </form>
        </div>
      `
    };
  }
};
