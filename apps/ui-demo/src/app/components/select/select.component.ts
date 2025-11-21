import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgtSelect, NgtButton } from '@ng-tailwind/ui-components';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule, FormsModule, NgtSelect, NgtButton],
  templateUrl: './select.component.html'
})
export class SelectDemoComponent {
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
}

