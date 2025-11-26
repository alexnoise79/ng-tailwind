import { Component, signal, inject } from '@angular/core';
import { NgtButton, NgtOffCanvas, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.offcanvas',
  imports: [NgtButton, NgtOffCanvas, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet],
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

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      positions: 'showcase',
      backdrop: 'showcase'
    },
    {
      positions: 'html',
      backdrop: 'html'
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
    positions: {
      html: `<ngt-offcanvas [isOpen]="showStart()" [position]="'start'" (closed)="showStart.set(false)">...</ngt-offcanvas>
<ngt-offcanvas [isOpen]="showEnd()" [position]="'end'" (closed)="showEnd.set(false)">...</ngt-offcanvas>
<ngt-offcanvas [isOpen]="showTop()" [position]="'top'" (closed)="showTop.set(false)">...</ngt-offcanvas>
<ngt-offcanvas [isOpen]="showBottom()" [position]="'bottom'" (closed)="showBottom.set(false)">...</ngt-offcanvas>`,
      ts: `import { signal } from '@angular/core';

export class OffcanvasPage {
  showStart = signal(false);
  showEnd = signal(false);
  showTop = signal(false);
  showBottom = signal(false);
}`
    },
    backdrop: {
      html: `<ngt-offcanvas [isOpen]="showWithBackdrop()" [backdrop]="true" (closed)="showWithBackdrop.set(false)">...</ngt-offcanvas>
<ngt-offcanvas [isOpen]="showWithoutBackdrop()" [backdrop]="false" (closed)="showWithoutBackdrop.set(false)">...</ngt-offcanvas>`,
      ts: `import { signal } from '@angular/core';

export class OffcanvasPage {
  showWithBackdrop = signal(false);
  showWithoutBackdrop = signal(false);
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
      positions: {
        html: 'offcanvas-positions.html',
        ts: 'offcanvas-positions.ts'
      },
      backdrop: {
        html: 'offcanvas-backdrop.html',
        ts: 'offcanvas-backdrop.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('offcanvas', demoKey, fileType, fileNames);
  }
}
