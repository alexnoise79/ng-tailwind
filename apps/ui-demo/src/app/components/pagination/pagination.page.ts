import { Component, signal, inject } from '@angular/core';
import { NgtPagination, NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';

@Component({
  selector: 'section.pagination',
  imports: [NgtPagination, NgtNav, NgtNavItem],
  templateUrl: './pagination.page.html'
})
export class PaginationPage {
  private toastService = inject(NgtToastService);
  currentPage1 = signal(1);
  currentPage2 = signal(1);
  currentPage3 = signal(5);
  currentPage4 = signal(1);
  currentPage5 = signal(50);
  currentPage6 = signal(1);
  currentPage7 = signal(1);
  currentPage8 = signal(1);

  Math = Math;

  // Tab management
  activeTab = signal<DemoTab>('showcase');

  setActiveTab(tab: DemoTab): void {
    this.activeTab.set(tab);
  }

  // Copy to clipboard functionality
  copyToClipboard(code: string): void {
    copyToClipboard(code, this.toastService);
  }

  onPageChange(page: number, signalName: string): void {
    console.log(`${signalName} changed to page:`, page);
  }

  // Code snippets for each demo
  codeSnippets = {
    basic: `<ngt-pagination [currentPage]="currentPage()" [totalPages]="10" (pageChanged)="currentPage.set($event)"></ngt-pagination>`,
    withTotalItems: `<ngt-pagination [currentPage]="currentPage()" [totalItems]="100" [pageSize]="10" (pageChanged)="currentPage.set($event)"></ngt-pagination>`,
    sizes: `<ngt-pagination [currentPage]="currentPage()" [totalPages]="20" [size]="'sm'"></ngt-pagination>
<ngt-pagination [currentPage]="currentPage()" [totalPages]="20" [size]="'md'"></ngt-pagination>
<ngt-pagination [currentPage]="currentPage()" [totalPages]="20" [size]="'lg'"></ngt-pagination>`,
    ellipsis: `<ngt-pagination [currentPage]="currentPage()" [totalPages]="100" [maxVisiblePages]="7" (pageChanged)="currentPage.set($event)"></ngt-pagination>`
  };
}
