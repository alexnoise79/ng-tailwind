import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NgtSelect, NgtButton, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { City, Country } from '../../models/demo.models';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.select',
  imports: [FormsModule, JsonPipe, NgtSelect, NgtButton, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet],
  templateUrl: './select.page.html'
})
export class SelectPage {
  private toastService = inject(NgtToastService);

  // Basic
  selectedCity1 = signal<string | null>(null);
  cities = signal<string[]>(['New York', 'London', 'Paris', 'Tokyo', 'Berlin']);

  // Object options
  selectedCity2 = signal<City | null>(null);
  cityObjects = signal<City[]>([
    { name: 'New York', code: 'NY' },
    { name: 'London', code: 'LDN' },
    { name: 'Paris', code: 'PRS' },
    { name: 'Tokyo', code: 'TKY' },
    { name: 'Berlin', code: 'BER' }
  ]);

  // Key-Value pairs
  selectedCity3 = signal<string | null>(null);
  cityKeyValue = signal<Record<string, string>[]>([{ NY: 'New York' }, { LDN: 'London' }, { PRS: 'Paris' }]);

  // Sizes
  selectedCity4 = signal<string | null>(null);
  selectedCity5 = signal<string | null>(null);
  selectedCity6 = signal<string | null>(null);

  // With checkmark
  selectedCity7 = signal<City | null>(null);

  // With clear
  selectedCity8 = signal<City | null>(null);
  selectedCity9 = signal<City | null>({ name: 'London', code: 'LDN' });

  // With filter
  selectedCountry1 = signal<Country | null>(null);
  countries = signal<Country[]>([
    { name: 'United States', code: 'US' },
    { name: 'United Kingdom', code: 'UK' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'Italy', code: 'IT' },
    { name: 'Spain', code: 'ES' },
    { name: 'Japan', code: 'JP' },
    { name: 'China', code: 'CN' },
    { name: 'India', code: 'IN' },
    { name: 'Australia', code: 'AU' }
  ]);

  // Multiselect
  selectedCities1 = signal<string[]>([]);
  selectedCities2 = signal<City[]>([]);

  // Grouped options
  selectedCity10 = signal<City | null>(null);
  groupedCities = signal<City[]>([
    { name: 'New York', code: 'NY', country: 'USA' },
    { name: 'Los Angeles', code: 'LA', country: 'USA' },
    { name: 'Chicago', code: 'CHI', country: 'USA' },
    { name: 'London', code: 'LDN', country: 'UK' },
    { name: 'Manchester', code: 'MAN', country: 'UK' },
    { name: 'Birmingham', code: 'BIR', country: 'UK' },
    { name: 'Paris', code: 'PRS', country: 'France' },
    { name: 'Lyon', code: 'LYN', country: 'France' },
    { name: 'Marseille', code: 'MAR', country: 'France' }
  ]);

  // Template-driven form
  selectedCityForm = signal<string | null>(null);
  formSubmitted = signal(false);

  // Reactive form equivalent (using signal)
  selectedCityReactive = signal<string | null>(null);
  invalid = signal(false);

  onSubmit(): void {
    this.formSubmitted.set(true);
    console.log('Form submitted with value:', this.selectedCityForm());
  }

  onSelectChange(value: unknown): void {
    console.log('Selection changed:', value);
  }

  isInvalid(): boolean {
    return this.invalid() && (this.selectedCityReactive() === null || this.selectedCityReactive() === undefined);
  }


  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      basic: 'showcase',
      objectOptions: 'showcase',
      keyValue: 'showcase',
      sizes: 'showcase',
      checkmark: 'showcase',
      clear: 'showcase',
      filter: 'showcase',
      multiselect: 'showcase',
      grouped: 'showcase',
      forms: 'showcase'
    },
    {
      basic: 'html',
      objectOptions: 'html',
      keyValue: 'html',
      sizes: 'html',
      checkmark: 'html',
      clear: 'html',
      filter: 'html',
      multiselect: 'html',
      grouped: 'html',
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
      html: `<ngt-select
  [options]="cities()"
  [(ngModel)]="selectedCity1"
  placeholder="Select a City"
  class="w-full md:w-56"
/>`,
      ts: `import { signal } from '@angular/core';

export class SelectPage {
  selectedCity1 = signal<string | null>(null);
  cities = signal<string[]>(['New York', 'London', 'Paris', 'Tokyo', 'Berlin']);
}`
    },
    objectOptions: {
      html: `<ngt-select
  [options]="cityObjects()"
  [(ngModel)]="selectedCity2"
  optionLabel="name"
  optionValue="code"
  placeholder="Select a City"
  class="w-full md:w-56"
  (selectionChange)="onSelectChange($event)"
/>`,
      ts: `import { signal } from '@angular/core';

export class SelectPage {
  selectedCity2 = signal<City | null>(null);
  cityObjects = signal<City[]>([
    { name: 'New York', code: 'NY' },
    { name: 'London', code: 'LDN' },
    { name: 'Paris', code: 'PRS' }
  ]);

  onSelectChange(value: unknown): void {
    console.log('Selection changed:', value);
  }
}`
    },
    keyValue: {
      html: `<ngt-select
  [options]="cityKeyValue()"
  [(ngModel)]="selectedCity3"
  placeholder="Select a City"
  class="w-full md:w-56"
/>`,
      ts: `import { signal } from '@angular/core';

export class SelectPage {
  selectedCity3 = signal<string | null>(null);
  cityKeyValue = signal<Record<string, string>[]>([
    { NY: 'New York' },
    { LDN: 'London' },
    { PRS: 'Paris' }
  ]);
}`
    },
    sizes: {
      html: `<ngt-select
  [options]="cities()"
  [(ngModel)]="selectedCity4"
  size="sm"
  placeholder="Select a City"
  class="w-full md:w-56"
/>`,
      ts: `import { signal } from '@angular/core';

export class SelectPage {
  selectedCity4 = signal<string | null>(null);
  cities = signal<string[]>(['New York', 'London', 'Paris', 'Tokyo', 'Berlin']);
}`
    },
    checkmark: {
      html: `<ngt-select
  [options]="cityObjects()"
  [(ngModel)]="selectedCity7"
  [checkmark]="true"
  optionLabel="name"
  optionValue="code"
  [showClear]="true"
  placeholder="Select a City"
  class="w-full md:w-56"
/>`,
      ts: `import { signal } from '@angular/core';

export class SelectPage {
  selectedCity7 = signal<City | null>(null);
  cityObjects = signal<City[]>([
    { name: 'New York', code: 'NY' },
    { name: 'London', code: 'LDN' },
    { name: 'Paris', code: 'PRS' }
  ]);
}`
    },
    clear: {
      html: `<ngt-select
  [options]="cityObjects()"
  [(ngModel)]="selectedCity8"
  optionLabel="name"
  optionValue="code"
  [showClear]="true"
  placeholder="Select a City"
  class="w-full md:w-56"
/>`,
      ts: `import { signal } from '@angular/core';

export class SelectPage {
  selectedCity8 = signal<City | null>(null);
  cityObjects = signal<City[]>([
    { name: 'New York', code: 'NY' },
    { name: 'London', code: 'LDN' },
    { name: 'Paris', code: 'PRS' }
  ]);
}`
    },
    filter: {
      html: `<ngt-select
  [options]="countries()"
  [(ngModel)]="selectedCountry1"
  [filter]="true"
  filterBy="name"
  optionLabel="name"
  optionValue="code"
  [showClear]="true"
  placeholder="Select a Country"
  class="w-full md:w-56"
/>`,
      ts: `import { signal } from '@angular/core';

export class SelectPage {
  selectedCountry1 = signal<Country | null>(null);
  countries = signal<Country[]>([
    { name: 'United States', code: 'US' },
    { name: 'United Kingdom', code: 'UK' },
    { name: 'France', code: 'FR' }
  ]);
}`
    },
    multiselect: {
      html: `<ngt-select
  [options]="cities()"
  [(ngModel)]="selectedCities1"
  [multiselect]="true"
  placeholder="Select Cities"
  class="w-full md:w-56"
/>`,
      ts: `import { signal } from '@angular/core';

export class SelectPage {
  selectedCities1 = signal<string[]>([]);
  cities = signal<string[]>(['New York', 'London', 'Paris', 'Tokyo', 'Berlin']);
}`
    },
    grouped: {
      html: `<ngt-select
  [options]="groupedCities()"
  [(ngModel)]="selectedCity10"
  [group]="true"
  optionLabel="name"
  optionValue="code"
  optionGroup="country"
  placeholder="Select a City"
  class="w-full md:w-56"
>
  <ng-template #group let-group>
    <div class="font-semibold">{{ group.label }}</div>
  </ng-template>
</ngt-select>`,
      ts: `import { signal } from '@angular/core';

export class SelectPage {
  selectedCity10 = signal<City | null>(null);
  groupedCities = signal<City[]>([
    { name: 'New York', code: 'NY', country: 'USA' },
    { name: 'London', code: 'LDN', country: 'UK' },
    { name: 'Paris', code: 'PRS', country: 'France' }
  ]);
}`
    },
    forms: {
      html: `<form #exampleForm="ngForm" (ngSubmit)="onSubmit()">
  <ngt-select
    #city="ngModel"
    [(ngModel)]="selectedCityForm"
    name="city"
    [options]="cities()"
    [invalid]="!!(city.invalid && (city.touched || formSubmitted()))"
    placeholder="Select a City"
    class="w-full md:w-56"
    required
  />
  @if (city.invalid && (city.touched || formSubmitted())) {
    <p class="text-sm text-red-600">City is required.</p>
  }
  <ngt-button type="submit" variant="primary">Submit</ngt-button>
</form>`,
      ts: `import { signal } from '@angular/core';

export class SelectPage {
  selectedCityForm = signal<string | null>(null);
  formSubmitted = signal(false);
  cities = signal<string[]>(['New York', 'London', 'Paris', 'Tokyo', 'Berlin']);

  onSubmit(): void {
    this.formSubmitted.set(true);
    console.log('Form submitted with value:', this.selectedCityForm());
  }
}`
    }
  };

  // Helper to get code snippet for a specific tab
  getCodeSnippet(demoKey: string, fileType: 'html' | 'ts'): string {
    return this.codeViewUtil.getCodeSnippet(this.codeSnippets, demoKey, fileType);
  }

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      basic: {
        html: 'select-basic.html',
        ts: 'select-basic.ts'
      },
      objectOptions: {
        html: 'select-object-options.html',
        ts: 'select-object-options.ts'
      },
      keyValue: {
        html: 'select-key-value.html',
        ts: 'select-key-value.ts'
      },
      sizes: {
        html: 'select-sizes.html',
        ts: 'select-sizes.ts'
      },
      checkmark: {
        html: 'select-checkmark.html',
        ts: 'select-checkmark.ts'
      },
      clear: {
        html: 'select-clear.html',
        ts: 'select-clear.ts'
      },
      filter: {
        html: 'select-filter.html',
        ts: 'select-filter.ts'
      },
      multiselect: {
        html: 'select-multiselect.html',
        ts: 'select-multiselect.ts'
      },
      grouped: {
        html: 'select-grouped.html',
        ts: 'select-grouped.ts'
      },
      forms: {
        html: 'select-forms.html',
        ts: 'select-forms.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('select', demoKey, fileType, fileNames);
  }
}
