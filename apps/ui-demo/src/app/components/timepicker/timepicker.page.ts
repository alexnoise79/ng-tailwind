import { Component, signal, inject } from '@angular/core';
import { NgtTimepicker, NgtTimeStruct, NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';

@Component({
  selector: 'section.timepicker',
  imports: [NgtTimepicker, NgtNav, NgtNavItem],
  templateUrl: './timepicker.page.html'
})
export class TimepickerPage {
  private toastService = inject(NgtToastService);
  selectedTime = signal<NgtTimeStruct | null>(null);
  selectedTimeWithSeconds = signal<NgtTimeStruct | null>(null);
  selectedTimeMeridian = signal<NgtTimeStruct | null>(null);

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
  codeSnippets = {
    basic: `<ngt-timepicker [model]="selectedTime()" (timeSelect)="selectedTime.set($event)"></ngt-timepicker>`,
    withSeconds: `<ngt-timepicker [model]="selectedTimeWithSeconds()" [showSeconds]="true" (timeSelect)="selectedTimeWithSeconds.set($event)"></ngt-timepicker>`,
    withMeridian: `<ngt-timepicker [model]="selectedTimeMeridian()" [meridian]="true" (timeSelect)="selectedTimeMeridian.set($event)"></ngt-timepicker>`,
    withStringInput: `<ngt-timepicker [model]="'14:30:00'" [showSeconds]="true" (timeSelect)="onTimeSelect($event)"></ngt-timepicker>`,
    withDateInput: `<ngt-timepicker [model]="new Date()" (timeSelect)="onTimeSelect($event)"></ngt-timepicker>`,
    disabled: `<ngt-timepicker [model]="selectedTime()" [disabled]="true" (timeSelect)="selectedTime.set($event)"></ngt-timepicker>`
  };

  onTimeSelect(time: NgtTimeStruct): void {
    console.log('Time selected:', time);
  }

  formatTime(time: NgtTimeStruct | null): string {
    if (!time) return 'No time selected';
    const hour = String(time.hour).padStart(2, '0');
    const minute = String(time.minute).padStart(2, '0');
    const second = time.second !== undefined ? `:${String(time.second).padStart(2, '0')}` : '';
    return `${hour}:${minute}${second}`;
  }
}

