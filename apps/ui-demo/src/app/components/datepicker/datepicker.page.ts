import { Component, signal, inject } from '@angular/core';
import { NgtDatepicker, NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';

@Component({
  selector: 'section.datepicker',
  imports: [NgtDatepicker, NgtNav, NgtNavItem],
  templateUrl: './datepicker.page.html'
})
export class DatepickerPage {
  private toastService = inject(NgtToastService);
  selectedDate = signal<string | null>(null);
  selectedDateWithTime = signal<string | null>(null);
  selectedDateCustomFormat = signal<string | null>(null);
  selectedFormat = signal<'iso' | 'iso-local' | 'date' | 'datetime'>('datetime');

  // Tab management
  activeTab = signal<DemoTab>('showcase');

  setActiveTab(tab: DemoTab): void {
    this.activeTab.set(tab);
  }

  // Copy to clipboard functionality
  copyToClipboard(code: string): void {
    copyToClipboard(code, this.toastService);
  }

  // Code snippets for each demo
  get codeSnippets() {
    return {
      basic: `<ngt-datepicker [model]="selectedDate()" (dateSelect)="selectedDate.set($event)"></ngt-datepicker>`,
      withTime: `<ngt-datepicker [model]="selectedDateWithTime()" [showTime]="true" (dateSelect)="selectedDateWithTime.set($event)"></ngt-datepicker>`,
      withFormat: `<ngt-datepicker [model]="selectedDateCustomFormat()" [format]="'${this.selectedFormat()}'" [showTime]="true" (dateSelect)="selectedDateCustomFormat.set($event)"></ngt-datepicker>`,
      withStringInput: `<ngt-datepicker [model]="'2024-03-15T10:30:00'" (dateSelect)="onDateSelect($event)"></ngt-datepicker>`,
      withDateInput: `<ngt-datepicker [model]="new Date()" (dateSelect)="onDateSelect($event)"></ngt-datepicker>`
    };
  }

  onDateSelect(date: string): void {
    console.log('Date selected:', date);
  }

  onFormatChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedFormat.set(target.value as 'iso' | 'iso-local' | 'date' | 'datetime');
  }
}
