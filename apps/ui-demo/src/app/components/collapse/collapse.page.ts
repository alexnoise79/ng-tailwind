import { Component, signal, inject } from '@angular/core';
import { NgtButton, NgtCollapse, NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

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

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      vertical: 'showcase',
      horizontal: 'showcase'
    },
    {
      vertical: 'html',
      horizontal: 'html'
    }
  );

  // Expose utility methods for template
  toggleDemoView = (demoKey: string) => this.codeViewUtil.toggleDemoView(demoKey);
  setActiveCodeTab = (demoKey: string, tab: 'html' | 'ts') => this.codeViewUtil.setActiveCodeTab(demoKey, tab);
  isShowingCode = (demoKey: string) => this.codeViewUtil.isShowingCode(demoKey);
  getActiveCodeTab = (demoKey: string) => this.codeViewUtil.getActiveCodeTab(demoKey, 'html');

  // Copy to clipboard functionality
  copyToClipboard(code: string): void {
    copyToClipboard(code, this.toastService);
  }

  // Code snippets for each demo
  codeSnippets = {
    vertical: {
      html: `<ngt-button variant="primary" (click)="collapseOpen.set(!collapseOpen())">
  {{ collapseOpen() ? 'Hide' : 'Show' }} Content
</ngt-button>
<ngt-collapse [isOpen]="collapseOpen()" [horizontal]="false">
  <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 mt-2">
    <p class="text-gray-700 dark:text-gray-300">This is collapsible content with smooth animations.</p>
  </div>
</ngt-collapse>`,
      ts: `import { signal } from '@angular/core';

export class CollapsePage {
  collapseOpen = signal(false);
}`
    },
    horizontal: {
      html: `<ngt-button variant="outline" (click)="horizontalCollapseOpen.set(!horizontalCollapseOpen())">
  {{ horizontalCollapseOpen() ? 'Hide' : 'Show' }} Horizontal
</ngt-button>
<div class="flex items-center gap-2 mt-2">
  <ngt-collapse [isOpen]="horizontalCollapseOpen()" [horizontal]="true">
    <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 whitespace-nowrap">
      <p class="text-gray-700 dark:text-gray-300">Horizontal collapse content</p>
    </div>
  </ngt-collapse>
  <span class="text-gray-500 dark:text-gray-400">After collapse</span>
</div>`,
      ts: `import { signal } from '@angular/core';

export class CollapsePage {
  horizontalCollapseOpen = signal(false);
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
      vertical: {
        html: 'collapse-vertical.html',
        ts: 'collapse-vertical.ts'
      },
      horizontal: {
        html: 'collapse-horizontal.html',
        ts: 'collapse-horizontal.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('collapse', demoKey, fileType, fileNames);
  }
}
