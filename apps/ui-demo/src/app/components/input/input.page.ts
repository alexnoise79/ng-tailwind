import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NgtInput, NgtButton, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService, AutoCompleteSelectEvent } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';
import { AutocompleteService, AutocompleteItem } from '../../services/autocomplete.service';

@Component({
  selector: 'section.input',
  imports: [FormsModule, JsonPipe, NgtInput, NgtButton, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet],
  templateUrl: './input.page.html'
})
export class InputPage {
  private toastService = inject(NgtToastService);
  private autocompleteService = inject(AutocompleteService);

  // Basic
  textValue1 = signal<string>('');
  numberValue1 = signal<number>(0);
  emailValue1 = signal<string>('');
  telValue1 = signal<string>('');

  // Sizes
  textValue2 = signal<string>('');
  textValue3 = signal<string>('');
  textValue4 = signal<string>('');

  // Disabled
  disabledValue = signal<string>('Disabled input');

  // Number modes
  decimalValue = signal<number>(0);
  currencyValue = signal<number>(0);
  currencyType = signal<string>('USD');


  // Show clear
  clearValue1 = signal<string>('');
  clearValue2 = signal<string>('Pre-filled value');

  // Mask
  maskValue1 = signal<string>('');
  maskValue2 = signal<string>('');
  maskValue3 = signal<string>('');

  // Chips
  chipValue1 = signal<string>('');
  chipValue2 = signal<string>('');
  chipRegex = new RegExp('\\s+');

  // Filter
  filterValue1 = signal<string>('');
  filterValue2 = signal<string>('');
  filterRegex = /[a-zA-Z]/;

  // Autocomplete
  autocompleteValue1 = signal<string>('');
  autocompleteValue2 = signal<string>('');
  selectedItem = signal<AutocompleteItem | null>(null);

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      basic: 'showcase',
      sizes: 'showcase',
      disabled: 'showcase',
      numberModes: 'showcase',
      clear: 'showcase',
      mask: 'showcase',
      chips: 'showcase',
      filter: 'showcase',
      autocomplete: 'showcase',
      forms: 'showcase'
    },
    {
      basic: 'html',
      sizes: 'html',
      disabled: 'html',
      numberModes: 'html',
      clear: 'html',
      mask: 'html',
      chips: 'html',
      filter: 'html',
      autocomplete: 'html',
      forms: 'html'
    }
  );

  // Expose utility methods for template
  toggleDemoView = (demoKey: string) => this.codeViewUtil.toggleDemoView(demoKey);
  setActiveCodeTab = (demoKey: string, tab: 'html' | 'ts') => this.codeViewUtil.setActiveCodeTab(demoKey, tab);
  isShowingCode = (demoKey: string) => this.codeViewUtil.isShowingCode(demoKey);
  getActiveCodeTab = (demoKey: string) => this.codeViewUtil.getActiveCodeTab(demoKey, 'html');

  // Copy to clipboard functionality
  copyToClipboard(code: string): void {
    copyToClipboard(code, this.toastService);
  }

  // Code snippets for each demo
  codeSnippets = {
    basic: {
      html: `<ngt-input
  type="text"
  [(ngModel)]="textValue1"
  placeholder="Enter text"
  class="w-full md:w-64"
/>

<ngt-input
  type="number"
  [(ngModel)]="numberValue1"
  placeholder="Enter number"
  class="w-full md:w-64"
/>

<ngt-input
  type="email"
  [(ngModel)]="emailValue1"
  placeholder="Enter email"
  class="w-full md:w-64"
/>

<ngt-input
  type="tel"
  [(ngModel)]="telValue1"
  placeholder="Enter phone"
  class="w-full md:w-64"
/>`,
      ts: `import { signal } from '@angular/core';

export class InputPage {
  textValue1 = signal<string>('');
  numberValue1 = signal<number>(0);
  emailValue1 = signal<string>('');
  telValue1 = signal<string>('');
}`
    },
    sizes: {
      html: `<ngt-input
  type="text"
  size="sm"
  [(ngModel)]="textValue2"
  placeholder="Small input"
  class="w-full md:w-64"
/>

<ngt-input
  type="text"
  size="md"
  [(ngModel)]="textValue3"
  placeholder="Medium input (default)"
  class="w-full md:w-64"
/>

<ngt-input
  type="text"
  size="lg"
  [(ngModel)]="textValue4"
  placeholder="Large input"
  class="w-full md:w-64"
/>`,
      ts: `import { signal } from '@angular/core';

export class InputPage {
  textValue2 = signal<string>('');
  textValue3 = signal<string>('');
  textValue4 = signal<string>('');
}`
    },
    disabled: {
      html: `<ngt-input
  type="text"
  [(ngModel)]="disabledValue"
  [disabled]="true"
  class="w-full md:w-64"
/>`,
      ts: `import { signal } from '@angular/core';

export class InputPage {
  disabledValue = signal<string>('Disabled input');
}`
    },
    numberModes: {
      html: `<ngt-input
  [(ngModel)]="decimalValue"
  type="number"
  mode="decimal"
  placeholder="Enter decimal"
  class="w-full md:w-64"
/>

<ngt-input
  [(ngModel)]="currencyValue"
  [currency]="currencyType()"
  type="number"
  mode="currency"
  placeholder="Enter amount"
  class="w-full md:w-64"
/>`,
      ts: `import { signal } from '@angular/core';

export class InputPage {
  decimalValue = signal<number>(0);
  currencyValue = signal<number>(0);
  currencyType = signal<string>('USD');
}`
    },
    clear: {
      html: `<ngt-input
  type="text"
  [(ngModel)]="clearValue1"
  [showClear]="true"
  placeholder="Type and clear"
  class="w-full md:w-64"
/>

<ngt-input
  type="text"
  [(ngModel)]="clearValue2"
  [showClear]="true"
  placeholder="Pre-filled with clear"
  class="w-full md:w-64"
/>`,
      ts: `import { signal } from '@angular/core';

export class InputPage {
  clearValue1 = signal<string>('');
  clearValue2 = signal<string>('Pre-filled value');
}`
    },
    mask: {
      html: `<ngt-input
  type="text"
  mask="(999) 999-9999"
  [(ngModel)]="maskValue1"
  placeholder="Phone number"
  class="w-full md:w-64"
/>

<ngt-input
  type="text"
  mask="99-99-9999"
  [(ngModel)]="maskValue2"
  placeholder="Date"
  class="w-full md:w-64"
/>

<ngt-input
  type="text"
  mask="a*-999-a999"
  [(ngModel)]="maskValue3"
  placeholder="Mixed format"
  class="w-full md:w-64"
/>`,
      ts: `import { signal } from '@angular/core';

export class InputPage {
  maskValue1 = signal<string>('');
  maskValue2 = signal<string>('');
  maskValue3 = signal<string>('');
}`
    },
    chips: {
      html: `<ngt-input
  type="text"
  chip=","
  chipFormat=","
  [(ngModel)]="chipValue1"
  placeholder="Enter tags separated by comma"
  class="w-full md:w-64"
/>

<ngt-input
  type="text"
  [chip]="chipRegex"
  chipFormat=" "
  [(ngModel)]="chipValue2"
  placeholder="Enter words separated by space"
  class="w-full md:w-64"
/>`,
      ts: `import { signal } from '@angular/core';

export class InputPage {
  chipValue1 = signal<string>('');
  chipValue2 = signal<string>('');
  chipRegex = new RegExp('\\s+');
}`
    },
    filter: {
      html: `<ngt-input
  type="text"
  [filter]="['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']"
  [(ngModel)]="filterValue1"
  placeholder="Numbers only"
  class="w-full md:w-64"
/>

<ngt-input
  type="text"
  [filter]="filterRegex"
  [(ngModel)]="filterValue2"
  placeholder="Letters only"
  class="w-full md:w-64"
/>`,
      ts: `import { signal } from '@angular/core';

export class InputPage {
  filterValue1 = signal<string>('');
  filterValue2 = signal<string>('');
  filterRegex = /[a-zA-Z]/;
}`
    },
    autocomplete: {
      html: `<ngt-input
  type="text"
  [(ngModel)]="autocompleteValue1"
  [completeMethod]="searchItems.bind(this)"
  optionLabel="name"
  optionValue="id"
  [minQueryLength]="2"
  [delay]="300"
  scrollHeight="200px"
  placeholder="Search items (min 2 chars)"
  class="w-full md:w-64"
  (onSelect)="onItemSelect($event)"
/>

<ngt-input
  type="text"
  [(ngModel)]="autocompleteValue2"
  [completeMethod]="searchItems.bind(this)"
  optionLabel="name"
  [minQueryLength]="1"
  [delay]="500"
  scrollHeight="250px"
  placeholder="Search with custom template"
  class="w-full md:w-64"
>
  <ng-template #item let-item>
    <div class="flex items-center justify-between">
      <div>
        <div class="font-medium">{{ item.name }}</div>
        <div class="text-xs text-gray-500">{{ item.category }}</div>
      </div>
    </div>
  </ng-template>
  <ng-template #loader>
    <div class="flex items-center justify-center p-4">
      <svg class="animate-spin h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span class="ml-2">Searching...</span>
    </div>
  </ng-template>
</ngt-input>`,
      ts: `import { Component, signal, inject } from '@angular/core';
import { NgtInput, AutoCompleteSelectEvent } from '@ng-tailwind/ui-components';
import { AutocompleteService, AutocompleteItem } from './services/autocomplete.service';

export class InputPage {
  private autocompleteService = inject(AutocompleteService);
  
  autocompleteValue1 = signal<string>('');
  autocompleteValue2 = signal<string>('');
  selectedItem = signal<AutocompleteItem | null>(null);

  async searchItems(query: string): Promise<AutocompleteItem[]> {
    return this.autocompleteService.search(query, 300);
  }

  onItemSelect(event: AutoCompleteSelectEvent): void {
    console.log('Selected:', event.value);
    // Handle selection
  }
}`
    },
    forms: {
      html: `<form #exampleForm="ngForm" (ngSubmit)="onSubmit()">
  <div class="flex flex-col gap-1 mb-4">
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
    <ngt-input
      #email="ngModel"
      type="email"
      [(ngModel)]="emailValue1"
      name="email"
      placeholder="Enter email"
      [invalid]="!!(email.invalid && (email.touched || formSubmitted()))"
      class="w-full md:w-64"
      required
    />
    @if (email.invalid && (email.touched || formSubmitted())) {
      <p class="text-sm text-red-600">Email is required.</p>
    }
  </div>
  <ngt-button type="submit" variant="primary">Submit</ngt-button>
</form>`,
      ts: `import { signal } from '@angular/core';

export class InputPage {
  emailValue1 = signal<string>('');
  formSubmitted = signal(false);

  onSubmit(): void {
    this.formSubmitted.set(true);
    console.log('Form submitted');
  }
}`
    }
  };

  formSubmitted = signal(false);

  onSubmit(): void {
    this.formSubmitted.set(true);
    console.log('Form submitted');
  }

  // Autocomplete methods
  async searchItems(query: string): Promise<AutocompleteItem[]> {
    return this.autocompleteService.search(query, 800);
  }

  onItemSelect(event: AutoCompleteSelectEvent): void {
    this.selectedItem.set(event.value as AutocompleteItem);
    this.toastService.show({
      severity: 'success',
      summary: 'Item Selected',
      detail: `Selected: ${(event.value as AutocompleteItem).name}`
    });
  }

  // Helper to get code snippet for a specific tab
  getCodeSnippet(demoKey: string, fileType: 'html' | 'ts'): string {
    return this.codeViewUtil.getCodeSnippet(this.codeSnippets, demoKey, fileType);
  }

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      basic: {
        html: 'input-basic.html',
        ts: 'input-basic.ts'
      },
      sizes: {
        html: 'input-sizes.html',
        ts: 'input-sizes.ts'
      },
      disabled: {
        html: 'input-disabled.html',
        ts: 'input-disabled.ts'
      },
      numberModes: {
        html: 'input-number-modes.html',
        ts: 'input-number-modes.ts'
      },
      clear: {
        html: 'input-clear.html',
        ts: 'input-clear.ts'
      },
      mask: {
        html: 'input-mask.html',
        ts: 'input-mask.ts'
      },
      chips: {
        html: 'input-chips.html',
        ts: 'input-chips.ts'
      },
      filter: {
        html: 'input-filter.html',
        ts: 'input-filter.ts'
      },
      autocomplete: {
        html: 'input-autocomplete.html',
        ts: 'input-autocomplete.ts'
      },
      forms: {
        html: 'input-forms.html',
        ts: 'input-forms.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('input', demoKey, fileType, fileNames);
  }
}

