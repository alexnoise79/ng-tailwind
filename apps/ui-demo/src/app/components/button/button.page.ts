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
}
