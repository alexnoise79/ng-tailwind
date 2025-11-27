import { Component, signal, inject } from '@angular/core';
import { NgtPagination, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.pagination',
  imports: [NgtPagination, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet],
  templateUrl: './pagination.page.html'
})
export class PaginationPage {
  private toastService = inject(NgtToastService);
  currentPage1 = signal(1);
  currentPage2 = signal(1);
  currentPage3 = signal(5);
  currentPage4 = signal(1);
  currentPage5 = signal(1);
  currentPage6 = signal(1);
  currentPage7 = signal(1);
  currentPage8 = signal(1);

  Math = Math;

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      basic: 'showcase',
      withTotalItems: 'showcase',
      sizes: 'showcase',
      ellipsis: 'showcase'
    },
    {
      basic: 'html',
      withTotalItems: 'html',
      sizes: 'html',
      ellipsis: 'html'
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

  onPageChange(page: number, signalName: string) {
    console.log(`${signalName} changed to page:`, page);
  }

  // Code snippets for each demo
  codeSnippets = {
    basic: {
      html: `<ngt-pagination [currentPage]="currentPage1()" [totalPages]="10" (pageChanged)="currentPage1.set($event)"></ngt-pagination>`,
      ts: `import { signal } from '@angular/core';

export class PaginationPage {
  currentPage1 = signal(1);
}`
    },
    withTotalItems: {
      html: `<ngt-pagination [currentPage]="currentPage2()" [totalItems]="100" [pageSize]="10" (pageChanged)="currentPage2.set($event)"></ngt-pagination>`,
      ts: `import { signal } from '@angular/core';

export class PaginationPage {
  currentPage2 = signal(1);
}`
    },
    sizes: {
      html: `<ngt-pagination [currentPage]="currentPage3()" [totalPages]="20" [size]="'sm'"></ngt-pagination>
<ngt-pagination [currentPage]="currentPage4()" [totalPages]="20" [size]="'md'"></ngt-pagination>
<ngt-pagination [currentPage]="currentPage5()" [totalPages]="20" [size]="'lg'"></ngt-pagination>`,
      ts: `import { signal } from '@angular/core';

export class PaginationPage {
  currentPage3 = signal(1);
  currentPage4 = signal(1);
  currentPage5 = signal(1);
}`
    },
    ellipsis: {
      html: `<ngt-pagination [currentPage]="currentPage6()" [totalPages]="100" [maxVisiblePages]="7" (pageChanged)="currentPage6.set($event)"></ngt-pagination>`,
      ts: `import { signal } from '@angular/core';

export class PaginationPage {
  currentPage6 = signal(1);
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
        html: 'pagination-basic.html',
        ts: 'pagination-basic.ts'
      },
      withTotalItems: {
        html: 'pagination-with-total-items.html',
        ts: 'pagination-with-total-items.ts'
      },
      sizes: {
        html: 'pagination-sizes.html',
        ts: 'pagination-sizes.ts'
      },
      ellipsis: {
        html: 'pagination-ellipsis.html',
        ts: 'pagination-ellipsis.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('pagination', demoKey, fileType, fileNames);
  }
}
