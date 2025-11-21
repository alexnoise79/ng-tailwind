import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgtSelect, NgtButton, NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { CommonModule } from '@angular/common';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';

interface City {
  name: string;
  code: string;
  country?: string;
}

interface Country {
  name: string;
  code: string;
}

@Component({
  selector: 'section.select',
  imports: [CommonModule, FormsModule, NgtSelect, NgtButton, NgtNav, NgtNavItem],
  templateUrl: './select.component.html'
})
export class SelectDemoComponent {
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
  cityKeyValue = signal<Record<string, string>[]>([
    { NY: 'New York' },
    { LDN: 'London' },
    { PRS: 'Paris' }
  ]);

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

  // Tab management
  activeTab = signal<'showcase' | 'api'>('showcase');

  setActiveTab(tab: 'showcase' | 'api'): void {
    this.activeTab.set(tab);
  }

  // Copy to clipboard functionality
  copyToClipboard(code: string): void {
    copyToClipboard(code, this.toastService);
  }

  // Code snippets for each demo
  codeSnippets = {
    basic: `<ngt-select
  [options]="cities()"
  [(ngModel)]="selectedCity1"
  placeholder="Select a City"
  class="w-full md:w-56"
/>`,
    objectOptions: `<ngt-select
  [options]="cityObjects()"
  [(ngModel)]="selectedCity2"
  optionLabel="name"
  optionValue="code"
  placeholder="Select a City"
  class="w-full md:w-56"
  (selectionChange)="onSelectChange($event)"
/>`,
    keyValue: `<ngt-select
  [options]="cityKeyValue()"
  [(ngModel)]="selectedCity3"
  placeholder="Select a City"
  class="w-full md:w-56"
/>`,
    sizes: `<ngt-select
  [options]="cities()"
  [(ngModel)]="selectedCity4"
  size="sm"
  placeholder="Select a City"
  class="w-full md:w-56"
/>`,
    checkmark: `<ngt-select
  [options]="cityObjects()"
  [(ngModel)]="selectedCity7"
  [checkmark]="true"
  optionLabel="name"
  optionValue="code"
  [showClear]="true"
  placeholder="Select a City"
  class="w-full md:w-56"
/>`,
    clear: `<ngt-select
  [options]="cityObjects()"
  [(ngModel)]="selectedCity8"
  optionLabel="name"
  optionValue="code"
  [showClear]="true"
  placeholder="Select a City"
  class="w-full md:w-56"
/>`,
    filter: `<ngt-select
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
    multiselect: `<ngt-select
  [options]="cities()"
  [(ngModel)]="selectedCities1"
  [multiselect]="true"
  placeholder="Select Cities"
  class="w-full md:w-56"
/>`,
    grouped: `<ngt-select
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
    forms: `<form #exampleForm="ngForm" (ngSubmit)="onSubmit()">
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
</form>`
  };
}

