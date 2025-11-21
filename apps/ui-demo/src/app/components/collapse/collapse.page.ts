import { Component, signal, inject } from '@angular/core';
import { NgtButton, NgtCollapse, NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';

@Component({
  selector: 'section.collapse-demo',
  imports: [NgtButton, NgtCollapse, NgtNav, NgtNavItem],
  templateUrl: './collapse.page.html'
})
export class CollapsePage {
  private toastService = inject(NgtToastService);
  collapseOpen = signal(false);
  horizontalCollapseOpen = signal(false);

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
    vertical: `<ngt-button variant="primary" (click)="collapseOpen.set(!collapseOpen())">
  {{ collapseOpen() ? 'Hide' : 'Show' }} Content
</ngt-button>
<ngt-collapse [isOpen]="collapseOpen()" [horizontal]="false">
  <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 mt-2">
    <p class="text-gray-700 dark:text-gray-300">This is collapsible content with smooth animations.</p>
  </div>
</ngt-collapse>`,
    horizontal: `<ngt-button variant="outline" (click)="horizontalCollapseOpen.set(!horizontalCollapseOpen())">
  {{ horizontalCollapseOpen() ? 'Hide' : 'Show' }} Horizontal
</ngt-button>
<div class="flex items-center gap-2 mt-2">
  <ngt-collapse [isOpen]="horizontalCollapseOpen()" [horizontal]="true">
    <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 whitespace-nowrap">
      <p class="text-gray-700 dark:text-gray-300">Horizontal collapse content</p>
    </div>
  </ngt-collapse>
  <span class="text-gray-500 dark:text-gray-400">After collapse</span>
</div>`
  };
}

