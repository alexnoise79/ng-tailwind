import { Component, signal, inject } from '@angular/core';
import { NgtButton, NgtModal, NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';

@Component({
  selector: 'section.modal',
  imports: [NgtButton, NgtModal, NgtNav, NgtNavItem],
  templateUrl: './modal.page.html'
})
export class ModalPage {
  private toastService = inject(NgtToastService);
  showModal = signal(false);
  showModalWithFooter = signal(false);

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
    basic: `<ngt-button variant="primary" (click)="showModal.set(true)">Open Modal</ngt-button>
@if (showModal()) {
  <ngt-modal [isOpen]="showModal()" (closed)="showModal.set(false)" title="Example Modal">
    <p class="text-gray-600 dark:text-gray-300 mb-4">This is a modal dialog built with Angular CDK Overlay.</p>
    <div class="flex justify-end gap-2">
      <ngt-button variant="outline" (click)="showModal.set(false)">Cancel</ngt-button>
      <ngt-button variant="primary" (click)="showModal.set(false)">Confirm</ngt-button>
    </div>
  </ngt-modal>
}`,
    withFooter: `<ngt-modal [isOpen]="showModal()" [showFooter]="true" title="Modal with Footer" (closed)="showModal.set(false)">
  <p>Modal content goes here</p>
  <div footer>
    <ngt-button variant="outline" (click)="showModal.set(false)">Cancel</ngt-button>
    <ngt-button variant="primary" (click)="showModal.set(false)">Confirm</ngt-button>
  </div>
</ngt-modal>`
  };
}
