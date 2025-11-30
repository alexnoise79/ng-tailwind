import { Component, signal, inject } from '@angular/core';
import { NgtDatepicker, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService } from '@ngtailwind/ui-components';
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
      withIcon: 'showcase',
      withPosition: 'showcase',
      withSize: 'showcase',
      withStringInput: 'showcase'
    },
    {
      basic: 'html',
      withTime: 'html',
      withFormat: 'html',
      withIcon: 'html',
      withPosition: 'html',
      withSize: 'html',
      withStringInput: 'html'
    }
  );

  // Expose utility methods for template
  toggleDemoView = (demoKey: string) => this.codeViewUtil.toggleDemoView(demoKey);
  setActiveCodeTab = (demoKey: string, tab: 'html' | 'ts') => this.codeViewUtil.setActiveCodeTab(demoKey, tab);
  isShowingCode = (demoKey: string) => this.codeViewUtil.isShowingCode(demoKey);
  getActiveCodeTab = (demoKey: string) => this.codeViewUtil.getActiveCodeTab(demoKey, 'html');

  // Copy to clipboard functionality
  copyToClipboard(code: string) {
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

  onFormatChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedFormat.set(target.value as 'iso' | 'iso-local' | 'date' | 'datetime');
  }
}`
      },
      withIcon: {
        html: `<ngt-datepicker [model]="selectedDate()" [showIcon]="true" (dateSelect)="selectedDate.set($event)"></ngt-datepicker>`,
        ts: `import { signal } from '@angular/core';

export class DatepickerPage {
  selectedDate = signal<string | null>(null);
}`
      },
      withPosition: {
        html: `<ngt-datepicker [model]="selectedDate()" [position]="'bottom'" (dateSelect)="selectedDate.set($event)"></ngt-datepicker>
<ngt-datepicker [model]="selectedDate()" [position]="'top'" (dateSelect)="selectedDate.set($event)"></ngt-datepicker>`,
        ts: `import { signal } from '@angular/core';

export class DatepickerPage {
  selectedDate = signal<string | null>(null);
}`
      },
      withSize: {
        html: `<ngt-datepicker [model]="selectedDateWithTime()" [showTime]="true" [size]="'sm'" (dateSelect)="selectedDateWithTime.set($event)"></ngt-datepicker>
<ngt-datepicker [model]="selectedDateWithTime()" [showTime]="true" [size]="'md'" (dateSelect)="selectedDateWithTime.set($event)"></ngt-datepicker>
<ngt-datepicker [model]="selectedDateWithTime()" [showTime]="true" [size]="'lg'" (dateSelect)="selectedDateWithTime.set($event)"></ngt-datepicker>`,
        ts: `import { signal } from '@angular/core';

export class DatepickerPage {
  selectedDateWithTime = signal<string | null>(null);
}`
      },
      withStringInput: {
        html: `<ngt-datepicker [model]="'2024-03-15T10:30:00'" [showTime]="true" (dateSelect)="onDateSelect($event)"></ngt-datepicker>`,
        ts: `export class DatepickerPage {
  onDateSelect(date: string) {
    console.log('Date selected:', date);
  }
}`
      }
    };
  }

  onDateSelect(date: string) {
    console.log('Date selected:', date);
  }

  onFormatChange(event: Event) {
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
      withIcon: {
        html: 'datepicker-with-icon.html',
        ts: 'datepicker-with-icon.ts'
      },
      withPosition: {
        html: 'datepicker-with-position.html',
        ts: 'datepicker-with-position.ts'
      },
      withSize: {
        html: 'datepicker-with-size.html',
        ts: 'datepicker-with-size.ts'
      },
      withStringInput: {
        html: 'datepicker-with-string-input.html',
        ts: 'datepicker-with-string-input.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('datepicker', demoKey, fileType, fileNames);
  }
}
