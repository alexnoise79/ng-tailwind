import { Component, signal, inject } from '@angular/core';
import { NgtDatepicker, NgtDateStruct, NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';

@Component({
  selector: 'section.datepicker',
  imports: [NgtDatepicker, NgtNav, NgtNavItem],
  templateUrl: './datepicker.page.html'
})
export class DatepickerPage {
  private toastService = inject(NgtToastService);
  selectedDate = signal<NgtDateStruct | null>(null);

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
    basic: `<ngt-datepicker [model]="selectedDate()" (dateSelect)="selectedDate.set($event)"></ngt-datepicker>`
  };
}
