import type { Meta, StoryObj } from '@storybook/angular';
import { NgtSelect } from './select.component';
import { FormsModule } from '@angular/forms';

interface City {
  name: string;
  code: string;
}

const meta: Meta<NgtSelect> = {
  title: 'Components/Select',
  component: NgtSelect,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the select component'
    },
    checkmark: {
      control: 'boolean',
      description: 'Show checkmark for selected option'
    },
    showClear: {
      control: 'boolean',
      description: 'Show clear button when value is selected'
    },
    multiselect: {
      control: 'boolean',
      description: 'Enable multiple selection'
    },
    group: {
      control: 'boolean',
      description: 'Enable grouping of options'
    },
    filter: {
      control: 'boolean',
      description: 'Enable filtering of options'
    },
    fluid: {
      control: 'boolean',
      description: 'Make select take full width'
    },
    invalid: {
      control: 'boolean',
      description: 'Show invalid state'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select'
    }
  }
};

export default meta;
type Story = StoryObj<NgtSelect>;

const cities: string[] = ['New York', 'London', 'Paris', 'Tokyo', 'Berlin'];
const cityObjects: City[] = [
  { name: 'New York', code: 'NY' },
  { name: 'London', code: 'LDN' },
  { name: 'Paris', code: 'PRS' },
  { name: 'Tokyo', code: 'TKY' },
  { name: 'Berlin', code: 'BER' }
];

export const Basic: Story = {
  args: {
    options: cities,
    size: 'md',
    placeholder: 'Select a City'
  },
  render: args => ({
    props: {
      ...args,
      selectedCity: null
    },
    template: `
      <ngt-select
        [options]="options"
        [(ngModel)]="selectedCity"
        [size]="size"
        [placeholder]="placeholder"
        class="w-full md:w-56"
      />
      <p class="mt-2 text-sm text-gray-600">Selected: {{ selectedCity || 'None' }}</p>
    `,
    moduleMetadata: {
      imports: [FormsModule]
    }
  })
};

export const ObjectOptions: Story = {
  args: {
    options: cityObjects,
    optionLabel: 'name',
    optionValue: 'code',
    size: 'md',
    placeholder: 'Select a City'
  },
  render: args => ({
    props: {
      ...args,
      selectedCity: null
    },
    template: `
      <ngt-select
        [options]="options"
        [(ngModel)]="selectedCity"
        [optionLabel]="optionLabel"
        [optionValue]="optionValue"
        [size]="size"
        [placeholder]="placeholder"
        class="w-full md:w-56"
      />
      <p class="mt-2 text-sm text-gray-600">Selected: {{ selectedCity || 'None' }}</p>
    `,
    moduleMetadata: {
      imports: [FormsModule]
    }
  })
};

export const Sizes: Story = {
  render: () => ({
    props: {
      cities,
      selectedCity1: null,
      selectedCity2: null,
      selectedCity3: null
    },
    template: `
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Small</label>
          <ngt-select
            [options]="cities"
            [(ngModel)]="selectedCity1"
            size="sm"
            placeholder="Select a City"
            class="w-full md:w-56"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Medium</label>
          <ngt-select
            [options]="cities"
            [(ngModel)]="selectedCity2"
            size="md"
            placeholder="Select a City"
            class="w-full md:w-56"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Large</label>
          <ngt-select
            [options]="cities"
            [(ngModel)]="selectedCity3"
            size="lg"
            placeholder="Select a City"
            class="w-full md:w-56"
          />
        </div>
      </div>
    `,
    moduleMetadata: {
      imports: [FormsModule]
    }
  })
};

export const WithCheckmark: Story = {
  args: {
    options: cityObjects,
    optionLabel: 'name',
    optionValue: 'code',
    checkmark: true,
    showClear: true,
    size: 'md',
    placeholder: 'Select a City'
  },
  render: args => ({
    props: {
      ...args,
      selectedCity: null
    },
    template: `
      <ngt-select
        [options]="options"
        [(ngModel)]="selectedCity"
        [optionLabel]="optionLabel"
        [optionValue]="optionValue"
        [checkmark]="checkmark"
        [showClear]="showClear"
        [size]="size"
        [placeholder]="placeholder"
        class="w-full md:w-56"
      />
    `,
    moduleMetadata: {
      imports: [FormsModule]
    }
  })
};

export const WithClear: Story = {
  args: {
    options: cityObjects,
    optionLabel: 'name',
    optionValue: 'code',
    showClear: true,
    size: 'md',
    placeholder: 'Select a City'
  },
  render: args => ({
    props: {
      ...args,
      selectedCity: { name: 'London', code: 'LDN' }
    },
    template: `
      <ngt-select
        [options]="options"
        [(ngModel)]="selectedCity"
        [optionLabel]="optionLabel"
        [optionValue]="optionValue"
        [showClear]="showClear"
        [size]="size"
        [placeholder]="placeholder"
        class="w-full md:w-56"
      />
    `,
    moduleMetadata: {
      imports: [FormsModule]
    }
  })
};

export const WithFilter: Story = {
  args: {
    options: cityObjects,
    optionLabel: 'name',
    optionValue: 'code',
    filter: true,
    filterBy: 'name',
    showClear: true,
    size: 'md',
    placeholder: 'Select a City'
  },
  render: args => ({
    props: {
      ...args,
      selectedCity: null
    },
    template: `
      <ngt-select
        [options]="options"
        [(ngModel)]="selectedCity"
        [optionLabel]="optionLabel"
        [optionValue]="optionValue"
        [filter]="filter"
        [filterBy]="filterBy"
        [showClear]="showClear"
        [size]="size"
        [placeholder]="placeholder"
        class="w-full md:w-56"
      />
    `,
    moduleMetadata: {
      imports: [FormsModule]
    }
  })
};

export const Multiselect: Story = {
  args: {
    options: cities,
    multiselect: true,
    size: 'md',
    placeholder: 'Select Cities'
  },
  render: args => ({
    props: {
      ...args,
      selectedCities: []
    },
    template: `
      <ngt-select
        [options]="options"
        [(ngModel)]="selectedCities"
        [multiselect]="multiselect"
        [size]="size"
        [placeholder]="placeholder"
        class="w-full md:w-56"
      />
      <p class="mt-2 text-sm text-gray-600">Selected: {{ selectedCities.length > 0 ? selectedCities.join(', ') : 'None' }}</p>
    `,
    moduleMetadata: {
      imports: [FormsModule]
    }
  })
};

export const Disabled: Story = {
  args: {
    options: cities,
    disabled: true,
    size: 'md',
    placeholder: 'Select a City'
  },
  render: args => ({
    props: {
      ...args,
      selectedCity: null
    },
    template: `
      <ngt-select
        [options]="options"
        [(ngModel)]="selectedCity"
        [disabled]="disabled"
        [size]="size"
        [placeholder]="placeholder"
        class="w-full md:w-56"
      />
    `,
    moduleMetadata: {
      imports: [FormsModule]
    }
  })
};

export const Invalid: Story = {
  args: {
    options: cities,
    invalid: true,
    size: 'md',
    placeholder: 'Select a City'
  },
  render: args => ({
    props: {
      ...args,
      selectedCity: null
    },
    template: `
      <ngt-select
        [options]="options"
        [(ngModel)]="selectedCity"
        [invalid]="invalid"
        [size]="size"
        [placeholder]="placeholder"
        class="w-full md:w-56"
      />
      <p class="mt-1 text-sm text-red-600">This field is required.</p>
    `,
    moduleMetadata: {
      imports: [FormsModule]
    }
  })
};

