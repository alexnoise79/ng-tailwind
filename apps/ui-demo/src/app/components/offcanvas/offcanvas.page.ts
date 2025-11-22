import { Component, signal, inject } from '@angular/core';
import { NgtButton, NgtOffCanvas, NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';

@Component({
  selector: 'section.offcanvas',
  imports: [NgtButton, NgtOffCanvas, NgtNav, NgtNavItem],
  templateUrl: './offcanvas.page.html'
})
export class OffcanvasPage {
  private toastService = inject(NgtToastService);
  showStart = signal(false);
  showEnd = signal(false);
  showTop = signal(false);
  showBottom = signal(false);
  showWithBackdrop = signal(false);
  showWithoutBackdrop = signal(false);
  showWithTitle = signal(false);

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
    basic: `<ngt-button (click)="showOffcanvas.set(true)" variant="primary">Open Offcanvas</ngt-button>
@if (showOffcanvas()) {
  <ngt-offcanvas [isOpen]="showOffcanvas()" [position]="'end'" (closed)="showOffcanvas.set(false)" title="Example Offcanvas">
    <p>Content goes here</p>
  </ngt-offcanvas>
}`,
    positions: `<ngt-offcanvas [isOpen]="showStart()" [position]="'start'" (closed)="showStart.set(false)">...</ngt-offcanvas>
<ngt-offcanvas [isOpen]="showEnd()" [position]="'end'" (closed)="showEnd.set(false)">...</ngt-offcanvas>
<ngt-offcanvas [isOpen]="showTop()" [position]="'top'" (closed)="showTop.set(false)">...</ngt-offcanvas>
<ngt-offcanvas [isOpen]="showBottom()" [position]="'bottom'" (closed)="showBottom.set(false)">...</ngt-offcanvas>`,
    backdrop: `<ngt-offcanvas [isOpen]="showWithBackdrop()" [backdrop]="true" (closed)="showWithBackdrop.set(false)">...</ngt-offcanvas>
<ngt-offcanvas [isOpen]="showWithoutBackdrop()" [backdrop]="false" (closed)="showWithoutBackdrop.set(false)">...</ngt-offcanvas>`
  };
}
