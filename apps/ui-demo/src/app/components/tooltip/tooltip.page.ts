import { Component, signal, inject } from '@angular/core';
import { NgtTooltip, NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.tooltip',
  imports: [NgtTooltip, NgtNav, NgtNavItem],
  templateUrl: './tooltip.page.html'
})
export class TooltipPage {
  private toastService = inject(NgtToastService);

  // Tab management
  activeTab = signal<DemoTab>('showcase');

  setActiveTab(tab: DemoTab): void {
    this.activeTab.set(tab);
  }

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      positions: 'showcase'
    },
    {
      positions: 'html'
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

  // Code snippets for each demo (HTML only)
  codeSnippets = {
    positions: `<ngt-tooltip text="This is a tooltip on top">
  <button class="px-4 py-2 bg-primary-600 text-white rounded-md">Top Tooltip</button>
</ngt-tooltip>
<ngt-tooltip text="This is a tooltip on bottom" position="bottom">
  <button class="px-4 py-2 bg-secondary-600 text-white rounded-md">Bottom Tooltip</button>
</ngt-tooltip>
<ngt-tooltip text="This is a tooltip on left" position="left">
  <button class="px-4 py-2 bg-primary-600 text-white rounded-md">Left Tooltip</button>
</ngt-tooltip>
<ngt-tooltip text="This is a tooltip on right" position="right">
  <button class="px-4 py-2 bg-secondary-600 text-white rounded-md">Right Tooltip</button>
</ngt-tooltip>`
  };

  // Helper to get code snippet for a specific tab
  getCodeSnippet(demoKey: string, fileType: 'html' | 'ts'): string {
    return this.codeViewUtil.getCodeSnippet(this.codeSnippets, demoKey, fileType);
  }

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      positions: {
        html: 'tooltip-positions.html',
        ts: 'tooltip-positions.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('tooltip', demoKey, fileType, fileNames);
  }
}
