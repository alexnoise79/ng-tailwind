import { Component, inject } from '@angular/core';
import { NgtToastService, NgtToastContainer, NgtButton } from '@ng-tailwind/ui-components';

@Component({
  selector: 'section.toast',
  imports: [NgtToastContainer, NgtButton],
  templateUrl: './toast.component.html'
})
export class ToastDemoComponent {
  private toastService = inject(NgtToastService);

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
}

