import { Component, signal, inject } from '@angular/core';
import { NgtButton, NgtModal, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService } from '@ngtailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.modal',
  imports: [NgtButton, NgtModal, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet],
  templateUrl: './modal.page.html'
})
export class ModalPage {
  private toastService = inject(NgtToastService);
  showModal = signal(false);
  showModalWithFooter = signal(false);

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      basic: 'showcase',
      withFooter: 'showcase'
    },
    {
      basic: 'html',
      withFooter: 'html'
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
  codeSnippets = {
    basic: {
      html: `<ngt-button variant="primary" (click)="showModal.set(true)">Open Modal</ngt-button>
@if (showModal()) {
  <ngt-modal [isOpen]="showModal()" (closed)="showModal.set(false)" title="Example Modal">
    <p class="text-gray-600 dark:text-gray-300 mb-4">This is a modal dialog built with Angular CDK Overlay.</p>
    <div class="flex justify-end gap-2">
      <ngt-button variant="outline" (click)="showModal.set(false)">Cancel</ngt-button>
      <ngt-button variant="primary" (click)="showModal.set(false)">Confirm</ngt-button>
    </div>
  </ngt-modal>
}`,
      ts: `import { signal } from '@angular/core';

export class ModalPage {
  showModal = signal(false);
}`
    },
    withFooter: {
      html: `<ngt-button variant="primary" (click)="showModalWithFooter.set(true)">Open Modal with Footer</ngt-button>
@if (showModalWithFooter()) {
  <ngt-modal [isOpen]="showModalWithFooter()" [showFooter]="true" (closed)="showModalWithFooter.set(false)" title="Modal with Footer">
    <p class="text-gray-600 dark:text-gray-300 mb-4">This modal has a dedicated footer section.</p>
    <div footer>
      <ngt-button variant="outline" (click)="showModalWithFooter.set(false)">Cancel</ngt-button>
      <ngt-button variant="primary" (click)="showModalWithFooter.set(false)">Confirm</ngt-button>
    </div>
  </ngt-modal>
}`,
      ts: `import { signal } from '@angular/core';

export class ModalPage {
  showModalWithFooter = signal(false);
}`
    }
  };

  // Helper to get code snippet for a specific tab
  getCodeSnippet(demoKey: string, fileType: 'html' | 'ts'): string {
    return this.codeViewUtil.getCodeSnippet(this.codeSnippets, demoKey, fileType);
  }

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      basic: {
        html: 'modal-basic.html',
        ts: 'modal-basic.ts'
      },
      withFooter: {
        html: 'modal-with-footer.html',
        ts: 'modal-with-footer.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('modal', demoKey, fileType, fileNames);
  }
}
