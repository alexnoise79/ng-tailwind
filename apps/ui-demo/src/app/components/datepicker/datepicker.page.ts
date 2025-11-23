import { Component, signal, inject } from '@angular/core';
import { NgtDatepicker, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.datepicker',
  imports: [NgtDatepicker, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet],
  templateUrl: './datepicker.page.html'
})
export class DatepickerPage {
  private toastService = inject(NgtToastService);
  selectedDate = signal<string | null>(null);
  selectedDateWithTime = signal<string | null>(null);
  selectedDateCustomFormat = signal<string | null>(null);
  selectedFormat = signal<'iso' | 'iso-local' | 'date' | 'datetime'>('datetime');


  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      basic: 'showcase',
      withTime: 'showcase',
      withFormat: 'showcase',
      withStringInput: 'showcase'
    },
    {
      basic: 'html',
      withTime: 'html',
      withFormat: 'html',
      withStringInput: 'html'
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
  get codeSnippets() {
    return {
      basic: {
        html: `<ngt-datepicker [model]="selectedDate()" (dateSelect)="selectedDate.set($event)"></ngt-datepicker>`,
        ts: `import { signal } from '@angular/core';

export class DatepickerPage {
  selectedDate = signal<string | null>(null);
}`
      },
      withTime: {
        html: `<ngt-datepicker [model]="selectedDateWithTime()" [showTime]="true" (dateSelect)="selectedDateWithTime.set($event)"></ngt-datepicker>`,
        ts: `import { signal } from '@angular/core';

export class DatepickerPage {
  selectedDateWithTime = signal<string | null>(null);
}`
      },
      withFormat: {
        html: `<ngt-datepicker [model]="selectedDateCustomFormat()" [format]="selectedFormat()" [showTime]="true" (dateSelect)="selectedDateCustomFormat.set($event)"></ngt-datepicker>`,
        ts: `import { signal } from '@angular/core';

export class DatepickerPage {
  selectedDateCustomFormat = signal<string | null>(null);
  selectedFormat = signal<'iso' | 'iso-local' | 'date' | 'datetime'>('datetime');

  onFormatChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedFormat.set(target.value as 'iso' | 'iso-local' | 'date' | 'datetime');
  }
}`
      },
      withStringInput: {
        html: `<ngt-datepicker [model]="'2024-03-15T10:30:00'" [showTime]="true" (dateSelect)="onDateSelect($event)"></ngt-datepicker>`,
        ts: `export class DatepickerPage {
  onDateSelect(date: string): void {
    console.log('Date selected:', date);
  }
}`
      }
    };
  }

  onDateSelect(date: string): void {
    console.log('Date selected:', date);
  }

  onFormatChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedFormat.set(target.value as 'iso' | 'iso-local' | 'date' | 'datetime');
  }

  // Helper to get code snippet for a specific tab
  getCodeSnippet(demoKey: string, fileType: 'html' | 'ts'): string {
    return this.codeViewUtil.getCodeSnippet(this.codeSnippets, demoKey, fileType);
  }

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      basic: {
        html: 'datepicker-basic.html',
        ts: 'datepicker-basic.ts'
      },
      withTime: {
        html: 'datepicker-with-time.html',
        ts: 'datepicker-with-time.ts'
      },
      withFormat: {
        html: 'datepicker-with-format.html',
        ts: 'datepicker-with-format.ts'
      },
      withStringInput: {
        html: 'datepicker-with-string-input.html',
        ts: 'datepicker-with-string-input.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('datepicker', demoKey, fileType, fileNames);
  }
}
