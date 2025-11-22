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
    variants: `<ngt-alert variant="success" [dismissible]="false">
  <strong>Success!</strong> Operation completed successfully.
</ngt-alert>
<ngt-alert variant="info" [dismissible]="false">
  <strong>Info:</strong> This is an informational message.
</ngt-alert>
<ngt-alert variant="warning" [dismissible]="false">
  <strong>Warning:</strong> Please review this action carefully.
</ngt-alert>
<ngt-alert variant="danger" [dismissible]="false">
  <strong>Error:</strong> An error has occurred.
</ngt-alert>`,
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
}

