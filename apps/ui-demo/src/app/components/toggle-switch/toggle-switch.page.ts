import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgtToggleSwitch, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService } from '@ngtailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.toggle-switch',
  imports: [NgtToggleSwitch, FormsModule, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet],
  templateUrl: './toggle-switch.page.html'
})
export class ToggleSwitchPage {
  private toastService = inject(NgtToastService);
  basicToggle = false;
  emailNotifications = true;
  pushNotifications = false;
  smsNotifications = true;
  disabledToggle = true;

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      basic: 'showcase',
      sizes: 'showcase',
      ngModel: 'showcase'
    },
    {
      basic: 'html',
      sizes: 'html',
      ngModel: 'html'
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

  // Code snippets for each demo (HTML only)
  codeSnippets = {
    basic: `<ngt-toggle-switch></ngt-toggle-switch>
<ngt-toggle-switch label="Enable notifications"></ngt-toggle-switch>`,
    sizes: `<ngt-toggle-switch size="sm" label="Small toggle"></ngt-toggle-switch>
<ngt-toggle-switch size="md" label="Medium toggle"></ngt-toggle-switch>
<ngt-toggle-switch size="lg" label="Large toggle"></ngt-toggle-switch>`,
    ngModel: `<ngt-toggle-switch [(ngModel)]="basicToggle" label="Basic toggle"></ngt-toggle-switch>`
  };

  // Helper to get code snippet for a specific tab
  getCodeSnippet(demoKey: string, fileType: 'html' | 'ts'): string {
    return this.codeViewUtil.getCodeSnippet(this.codeSnippets, demoKey, fileType);
  }

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      basic: {
        html: 'toggle-switch-basic.html',
        ts: 'toggle-switch-basic.ts'
      },
      sizes: {
        html: 'toggle-switch-sizes.html',
        ts: 'toggle-switch-sizes.ts'
      },
      ngModel: {
        html: 'toggle-switch-ngmodel.html',
        ts: 'toggle-switch-ngmodel.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('toggle-switch', demoKey, fileType, fileNames);
  }
}
