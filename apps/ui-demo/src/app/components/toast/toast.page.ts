import { Component, inject, signal } from '@angular/core';
import { NgtToastService, NgtButton, NgtNav, NgtNavItem } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';

@Component({
  selector: 'section.toast',
  imports: [NgtButton, NgtNav, NgtNavItem],
  templateUrl: './toast.page.html'
})
export class ToastPage {
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

  showSuccess(): void {
    this.toastService.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Operation completed successfully'
    });
  }

  showInfo(): void {
    this.toastService.show({
      severity: 'info',
      summary: 'Information',
      detail: 'This is an informational message'
    });
  }

  showWarning(): void {
    this.toastService.show({
      severity: 'warning',
      summary: 'Warning',
      detail: 'Please review this action'
    });
  }

  showDanger(): void {
    this.toastService.show({
      severity: 'danger',
      summary: 'Error',
      detail: 'An error occurred while processing your request'
    });
  }

  showWithSummary(): void {
    this.toastService.show({
      severity: 'info',
      summary: 'Update Available',
      detail: 'A new version of the application is available. Please refresh to update.'
    });
  }

  showTextOnly(): void {
    this.toastService.show({
      severity: 'info',
      text: 'Simple toast message without summary or detail'
    });
  }

  showSticky(): void {
    this.toastService.show({
      severity: 'warning',
      summary: 'Sticky Toast',
      detail: 'This toast will not auto-close. You must close it manually.',
      sticky: true
    });
  }

  showNotClosable(): void {
    this.toastService.show({
      severity: 'info',
      summary: 'Processing',
      detail: 'This toast cannot be closed manually and will auto-close in 5 seconds',
      closable: false,
      delay: 5000
    });
  }

  showCustomDelay(): void {
    this.toastService.show({
      severity: 'success',
      summary: 'Custom Delay',
      detail: 'This toast will auto-close in 10 seconds',
      delay: 10000
    });
  }

  showWithIcon(): void {
    this.toastService.show({
      severity: 'info',
      summary: 'Custom Icon',
      detail: 'This toast uses a custom icon',
      icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6'
    });
  }

  clearAll(): void {
    this.toastService.clear();
  }

  // Code snippets for each demo
  codeSnippets = {
    basic: `// In your component
private toastService = inject(NgtToastService);

showSuccess(): void {
  this.toastService.show({
    severity: 'success',
    summary: 'Success',
    detail: 'Operation completed successfully'
  });
}

// In your template
<ngt-button (click)="showSuccess()" variant="primary">Success Toast</ngt-button>`,
    withSummary: `this.toastService.show({
  severity: 'info',
  summary: 'Update Available',
  detail: 'A new version of the application is available.'
});`,
    textOnly: `this.toastService.show({
  severity: 'info',
  text: 'Simple toast message without summary or detail'
});`,
    sticky: `this.toastService.show({
  severity: 'warning',
  summary: 'Sticky Toast',
  detail: 'This toast will not auto-close.',
  sticky: true
});`
  };
}
