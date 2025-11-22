import { Component, signal, inject } from '@angular/core';
import { NgtTimepicker, NgtTimeStruct, NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

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
  selectedTimeSmall = signal<NgtTimeStruct | null>(null);
  selectedTimeLarge = signal<NgtTimeStruct | null>(null);

  // Tab management
  activeTab = signal<DemoTab>('showcase');

  setActiveTab(tab: DemoTab): void {
    this.activeTab.set(tab);
  }

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      basic: 'showcase',
      withSeconds: 'showcase',
      withMeridian: 'showcase',
      withStringInput: 'showcase',
      withDateInput: 'showcase',
      disabled: 'showcase',
      small: 'showcase',
      large: 'showcase'
    },
    {
      basic: 'html',
      withSeconds: 'html',
      withMeridian: 'html',
      withStringInput: 'html',
      withDateInput: 'html',
      disabled: 'html',
      small: 'html',
      large: 'html'
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
      html: `<ngt-timepicker [model]="selectedTime()" (timeSelect)="selectedTime.set($event)"></ngt-timepicker>`,
      ts: `import { signal } from '@angular/core';
import { NgtTimeStruct } from '@ng-tailwind/ui-components';

export class TimepickerPage {
  selectedTime = signal<NgtTimeStruct | null>(null);
}`
    },
    withSeconds: {
      html: `<ngt-timepicker [model]="selectedTimeWithSeconds()" [showSeconds]="true" (timeSelect)="selectedTimeWithSeconds.set($event)"></ngt-timepicker>`,
      ts: `import { signal } from '@angular/core';
import { NgtTimeStruct } from '@ng-tailwind/ui-components';

export class TimepickerPage {
  selectedTimeWithSeconds = signal<NgtTimeStruct | null>(null);
}`
    },
    withMeridian: {
      html: `<ngt-timepicker [model]="selectedTimeMeridian()" [meridian]="true" (timeSelect)="selectedTimeMeridian.set($event)"></ngt-timepicker>`,
      ts: `import { signal } from '@angular/core';
import { NgtTimeStruct } from '@ng-tailwind/ui-components';

export class TimepickerPage {
  selectedTimeMeridian = signal<NgtTimeStruct | null>(null);
}`
    },
    withStringInput: {
      html: `<ngt-timepicker [model]="'14:30:00'" [showSeconds]="true" (timeSelect)="onTimeSelect($event)"></ngt-timepicker>`,
      ts: `import { NgtTimeStruct } from '@ng-tailwind/ui-components';

export class TimepickerPage {
  onTimeSelect(time: NgtTimeStruct): void {
    console.log('Time selected:', time);
  }
}`
    },
    withDateInput: {
      html: `<ngt-timepicker [model]="new Date()" (timeSelect)="onTimeSelect($event)"></ngt-timepicker>`,
      ts: `import { NgtTimeStruct } from '@ng-tailwind/ui-components';

export class TimepickerPage {
  onTimeSelect(time: NgtTimeStruct): void {
    console.log('Time selected:', time);
  }
}`
    },
    disabled: {
      html: `<ngt-timepicker [model]="selectedTime()" [disabled]="true" (timeSelect)="selectedTime.set($event)"></ngt-timepicker>`,
      ts: `import { signal } from '@angular/core';
import { NgtTimeStruct } from '@ng-tailwind/ui-components';

export class TimepickerPage {
  selectedTime = signal<NgtTimeStruct | null>(null);
}`
    },
    small: {
      html: `<ngt-timepicker [model]="selectedTimeSmall()" [size]="'sm'" (timeSelect)="selectedTimeSmall.set($event)"></ngt-timepicker>`,
      ts: `import { signal } from '@angular/core';
import { NgtTimeStruct } from '@ng-tailwind/ui-components';

export class TimepickerPage {
  selectedTimeSmall = signal<NgtTimeStruct | null>(null);
}`
    },
    large: {
      html: `<ngt-timepicker [model]="selectedTimeLarge()" [size]="'lg'" (timeSelect)="selectedTimeLarge.set($event)"></ngt-timepicker>`,
      ts: `import { signal } from '@angular/core';
import { NgtTimeStruct } from '@ng-tailwind/ui-components';

export class TimepickerPage {
  selectedTimeLarge = signal<NgtTimeStruct | null>(null);
}`
    }
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

  // Helper to get code snippet for a specific tab
  getCodeSnippet(demoKey: string, fileType: 'html' | 'ts'): string {
    return this.codeViewUtil.getCodeSnippet(this.codeSnippets, demoKey, fileType);
  }

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      basic: {
        html: 'timepicker-basic.html',
        ts: 'timepicker-basic.ts'
      },
      withSeconds: {
        html: 'timepicker-with-seconds.html',
        ts: 'timepicker-with-seconds.ts'
      },
      withMeridian: {
        html: 'timepicker-with-meridian.html',
        ts: 'timepicker-with-meridian.ts'
      },
      withStringInput: {
        html: 'timepicker-with-string-input.html',
        ts: 'timepicker-with-string-input.ts'
      },
      withDateInput: {
        html: 'timepicker-with-date-input.html',
        ts: 'timepicker-with-date-input.ts'
      },
      disabled: {
        html: 'timepicker-disabled.html',
        ts: 'timepicker-disabled.ts'
      },
      small: {
        html: 'timepicker-small.html',
        ts: 'timepicker-small.ts'
      },
      large: {
        html: 'timepicker-large.html',
        ts: 'timepicker-large.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('timepicker', demoKey, fileType, fileNames);
  }
}

