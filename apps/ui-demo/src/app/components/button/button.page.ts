import { Component, signal, inject } from '@angular/core';
import { NgtButton, NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';

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

  // View mode for each demo section (showcase or code)
  demoViewMode = signal<Record<string, 'showcase' | 'code'>>({
    variants: 'showcase',
    sizes: 'showcase',
    states: 'showcase'
  });

  toggleDemoView(demoKey: string): void {
    const current = this.demoViewMode();
    this.demoViewMode.set({
      ...current,
      [demoKey]: current[demoKey] === 'showcase' ? 'code' : 'showcase'
    });
  }

  // Active code tab for each demo (html or ts)
  activeCodeTab = signal<Record<string, 'html' | 'ts'>>({
    variants: 'html',
    sizes: 'html',
    states: 'html'
  });

  setActiveCodeTab(demoKey: string, tab: 'html' | 'ts'): void {
    const current = this.activeCodeTab();
    this.activeCodeTab.set({
      ...current,
      [demoKey]: tab
    });
  }

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

  // Helper to check if demo is showing code
  isShowingCode(demoKey: string): boolean {
    return this.demoViewMode()[demoKey] === 'code';
  }

  // Helper to get active code tab for a demo
  getActiveCodeTab(demoKey: string): 'html' | 'ts' {
    return this.activeCodeTab()[demoKey] || 'html';
  }

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
    return fileNames[demoKey]?.[fileType] || `button-${demoKey}.${fileType}`;
  }
}
