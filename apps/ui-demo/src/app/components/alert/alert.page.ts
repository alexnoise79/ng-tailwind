import { Component, signal, inject } from '@angular/core';
import { NgtAlert, NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';

@Component({
  selector: 'section.alert',
  imports: [NgtAlert, NgtNav, NgtNavItem],
  templateUrl: './alert.page.html'
})
export class AlertPage {
  private toastService = inject(NgtToastService);
  
  // Tab management
  activeTab = signal<DemoTab>('showcase');

  setActiveTab(tab: DemoTab): void {
    this.activeTab.set(tab);
  }

  // View mode for each demo section (showcase or code)
  demoViewMode = signal<Record<string, 'showcase' | 'code'>>({
    allVariants: 'showcase',
    dismissible: 'showcase',
    notDismissible: 'showcase'
  });

  toggleDemoView(demoKey: string): void {
    const current = this.demoViewMode();
    this.demoViewMode.set({
      ...current,
      [demoKey]: current[demoKey] === 'showcase' ? 'code' : 'showcase'
    });
  }

  // Active code tab for each demo (html or ts)
  activeCodeTab = signal<Record<string, 'html' | 'ts'>>({
    allVariants: 'html',
    dismissible: 'html',
    notDismissible: 'html'
  });

  setActiveCodeTab(demoKey: string, tab: 'html' | 'ts'): void {
    const current = this.activeCodeTab();
    this.activeCodeTab.set({
      ...current,
      [demoKey]: tab
    });
  }

  // Copy to clipboard functionality
  copyToClipboard(code: string): void {
    copyToClipboard(code, this.toastService);
  }

  // Alert visibility management
  visibleAlerts = signal<Record<string, boolean>>({
    success: true,
    info: true,
    warning: true,
    danger: true,
    primary: true,
    secondary: true,
    light: true,
    dark: true,
    notDismissible: true
  });

  onAlertClose(variant: string): void {
    this.visibleAlerts.update(alerts => ({
      ...alerts,
      [variant]: false
    }));
  }

  // Code snippets for each demo
  codeSnippets = {
    allVariants: `<ngt-alert variant="success" [dismissible]="false">Success alert</ngt-alert>
<ngt-alert variant="info" [dismissible]="false">Info alert</ngt-alert>
<ngt-alert variant="warning" [dismissible]="false">Warning alert</ngt-alert>
<ngt-alert variant="danger" [dismissible]="false">Danger alert</ngt-alert>
<ngt-alert variant="primary" [dismissible]="false">Primary alert</ngt-alert>
<ngt-alert variant="secondary" [dismissible]="false">Secondary alert</ngt-alert>
<ngt-alert variant="light" [dismissible]="false">Light alert</ngt-alert>
<ngt-alert variant="dark" [dismissible]="false">Dark alert</ngt-alert>`,
    dismissible: `<ngt-alert variant="info" [dismissible]="true" (close)="onClose()">
  This alert can be dismissed by clicking the close button.
</ngt-alert>`,
    notDismissible: `<ngt-alert variant="info" [dismissible]="false">
  This alert cannot be dismissed.
</ngt-alert>`
  };

  // Helper to check if demo is showing code
  isShowingCode(demoKey: string): boolean {
    return this.demoViewMode()[demoKey] === 'code';
  }

  // Helper to get active code tab for a demo
  getActiveCodeTab(demoKey: string): 'html' | 'ts' {
    return this.activeCodeTab()[demoKey] || 'html';
  }

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      allVariants: {
        html: 'alert-variants.html',
        ts: 'alert-variants.ts'
      },
      dismissible: {
        html: 'alert-dismissible.html',
        ts: 'alert-dismissible.ts'
      },
      notDismissible: {
        html: 'alert-not-dismissible.html',
        ts: 'alert-not-dismissible.ts'
      }
    };
    return fileNames[demoKey]?.[fileType] || `alert-${demoKey}.${fileType}`;
  }
}

