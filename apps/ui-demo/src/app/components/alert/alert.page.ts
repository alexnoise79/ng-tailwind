import { Component, signal, inject } from '@angular/core';
import { NgtAlert, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService } from '@ngtailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.alert',
  imports: [NgtAlert, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet],
  templateUrl: './alert.page.html'
})
export class AlertPage {
  private toastService = inject(NgtToastService);

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      allVariants: 'showcase',
      dismissible: 'showcase',
      notDismissible: 'showcase'
    },
    {
      allVariants: 'html',
      dismissible: 'html',
      notDismissible: 'html'
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

  onAlertClose(variant: string) {
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
    dismissible: `<ngt-alert variant="info" [dismissible]="true" (closed)="onClose()">
  This alert can be dismissed by clicking the close button.
</ngt-alert>`,
    notDismissible: `<ngt-alert variant="info" [dismissible]="false">
  This alert cannot be dismissed.
</ngt-alert>`
  };

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
    return this.codeViewUtil.getTabFileName('alert', demoKey, fileType, fileNames);
  }
}
