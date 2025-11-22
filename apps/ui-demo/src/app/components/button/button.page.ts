import { Component, signal, inject } from '@angular/core';
import { NgtButton, NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.button',
  imports: [NgtButton, NgtNav, NgtNavItem],
  templateUrl: './button.page.html'
})
export class ButtonPage {
  private toastService = inject(NgtToastService);
  loading = signal(false);

  // Tab management
  activeTab = signal<DemoTab>('showcase');

  setActiveTab(tab: DemoTab): void {
    this.activeTab.set(tab);
  }

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      variants: 'showcase',
      sizes: 'showcase',
      states: 'showcase'
    },
    {
      variants: 'html',
      sizes: 'html',
      states: 'html'
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
    variants: `<ngt-button variant="primary">Primary</ngt-button>
<ngt-button variant="outline">Outline</ngt-button>
<ngt-button variant="ghost">Ghost</ngt-button>`,
    sizes: `<ngt-button variant="primary" size="sm">Small</ngt-button>
<ngt-button variant="primary" size="md">Medium</ngt-button>
<ngt-button variant="primary" size="lg">Large</ngt-button>`,
    states: `<ngt-button variant="primary" [loading]="true">Loading</ngt-button>
<ngt-button variant="primary" [disabled]="true">Disabled</ngt-button>`
  };

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      variants: {
        html: 'button-variants.html',
        ts: 'button-variants.ts'
      },
      sizes: {
        html: 'button-sizes.html',
        ts: 'button-sizes.ts'
      },
      states: {
        html: 'button-states.html',
        ts: 'button-states.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('button', demoKey, fileType, fileNames);
  }
}
