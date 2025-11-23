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
      positions: 'showcase',
      delays: 'showcase',
      customContent: 'showcase'
    },
    {
      positions: 'html',
      delays: 'html',
      customContent: 'html'
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
    positions: `<button ngtTooltip="This is a tooltip on top" class="px-4 py-2 bg-primary-600 text-white rounded-md">Top Tooltip</button>
<button ngtTooltip="This is a tooltip on bottom" tooltipPosition="bottom" class="px-4 py-2 bg-secondary-600 text-white rounded-md">Bottom Tooltip</button>
<button ngtTooltip="This is a tooltip on left" tooltipPosition="left" class="px-4 py-2 bg-primary-600 text-white rounded-md">Left Tooltip</button>
<button ngtTooltip="This is a tooltip on right" tooltipPosition="right" class="px-4 py-2 bg-secondary-600 text-white rounded-md">Right Tooltip</button>`,
    delays: `<button ngtTooltip="Default delay (200ms)" [delay]="200" class="px-4 py-2 bg-primary-600 text-white rounded-md">Default Delay</button>
<button ngtTooltip="Fast show delay (100ms)" [showDelay]="100" [hideDelay]="200" class="px-4 py-2 bg-secondary-600 text-white rounded-md">Fast Show Delay</button>
<button ngtTooltip="Slow hide delay (500ms)" [showDelay]="200" [hideDelay]="500" class="px-4 py-2 bg-primary-600 text-white rounded-md">Slow Hide Delay</button>
<button ngtTooltip="Custom delays (show: 300ms, hide: 400ms)" [showDelay]="300" [hideDelay]="400" class="px-4 py-2 bg-secondary-600 text-white rounded-md">Custom Delays</button>`,
    customContent: `<!-- Define template -->
<ng-template #customTooltipTemplate>
  <span class="font-bold text-primary-400">Custom</span> HTML content with <span class="font-bold text-primary-400">primary color</span>
</ng-template>

<!-- Use in tooltip -->
<button 
  [content]="customTooltipTemplate"
  ngtTooltip=""
  class="px-4 py-2 bg-primary-600 text-white rounded-md">
  Hover for Custom Content
</button>`
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
      },
      delays: {
        html: 'tooltip-delays.html',
        ts: 'tooltip-delays.ts'
      },
      customContent: {
        html: 'tooltip-custom-content.html',
        ts: 'tooltip-custom-content.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('tooltip', demoKey, fileType, fileNames);
  }
}
