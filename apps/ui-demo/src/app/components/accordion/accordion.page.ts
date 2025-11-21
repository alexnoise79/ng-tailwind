import { Component, signal, inject } from '@angular/core';
import { NgtAccordion, NgtAccordionItem, NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';

@Component({
  selector: 'section.accordion',
  imports: [NgtAccordion, NgtAccordionItem, NgtNav, NgtNavItem],
  templateUrl: './accordion.page.html'
})
export class AccordionPage {
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
    singleOpen: `<ngt-accordion [multiOpen]="false">
  <ngt-accordion-item title="First Item">
    <p class="text-gray-600">This is the content of the first accordion item.</p>
  </ngt-accordion-item>
  <ngt-accordion-item title="Second Item">
    <p class="text-gray-600">This is the content of the second accordion item.</p>
  </ngt-accordion-item>
  <ngt-accordion-item title="Third Item">
    <p class="text-gray-600">This is the content of the third accordion item.</p>
  </ngt-accordion-item>
</ngt-accordion>`,
    multipleOpen: `<ngt-accordion [multiOpen]="true">
  <ngt-accordion-item title="First Item">
    <p class="text-gray-600">This is the content of the first accordion item.</p>
  </ngt-accordion-item>
  <ngt-accordion-item title="Second Item">
    <p class="text-gray-600">This is the content of the second accordion item.</p>
  </ngt-accordion-item>
  <ngt-accordion-item title="Third Item">
    <p class="text-gray-600">This is the content of the third accordion item.</p>
  </ngt-accordion-item>
</ngt-accordion>`
  };
}
