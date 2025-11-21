import { Component, signal, inject } from '@angular/core';
import { NgtTooltip, NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';

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

  // Copy to clipboard functionality
  copyToClipboard(code: string): void {
    copyToClipboard(code, this.toastService);
  }

  // Code snippets for each demo
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
}
