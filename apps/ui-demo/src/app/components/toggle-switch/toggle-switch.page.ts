import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgtToggleSwitch, NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';

@Component({
  selector: 'section.toggle-switch',
  imports: [NgtToggleSwitch, FormsModule, NgtNav, NgtNavItem],
  templateUrl: './toggle-switch.page.html'
})
export class ToggleSwitchPage {
  private toastService = inject(NgtToastService);
  basicToggle = false;
  emailNotifications = true;
  pushNotifications = false;
  smsNotifications = true;
  disabledToggle = true;

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
    basic: `<ngt-toggle-switch></ngt-toggle-switch>
<ngt-toggle-switch label="Enable notifications"></ngt-toggle-switch>`,
    sizes: `<ngt-toggle-switch size="sm" label="Small toggle"></ngt-toggle-switch>
<ngt-toggle-switch size="md" label="Medium toggle"></ngt-toggle-switch>
<ngt-toggle-switch size="lg" label="Large toggle"></ngt-toggle-switch>`,
    ngModel: `<ngt-toggle-switch [(ngModel)]="basicToggle" label="Basic toggle"></ngt-toggle-switch>`
  };
}
