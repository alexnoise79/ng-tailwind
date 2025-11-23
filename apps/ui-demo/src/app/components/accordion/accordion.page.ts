import { Component, inject } from '@angular/core';
import { NgtAccordion, NgtAccordionItem, NgtAccordionHeader, NgtAccordionButton, NgtAccordionCollapse, NgtAccordionBody, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.accordion',
  imports: [NgtAccordion, NgtAccordionItem, NgtAccordionHeader, NgtAccordionButton, NgtAccordionCollapse, NgtAccordionBody, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet],
  templateUrl: './accordion.page.html'
})
export class AccordionPage {
  private toastService = inject(NgtToastService);

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      singleOpen: 'showcase',
      multipleOpen: 'showcase',
      disabled: 'showcase'
    },
    {
      singleOpen: 'html',
      multipleOpen: 'html',
      disabled: 'html'
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
    singleOpen: `<div ngtAccordion [multiOpen]="false">
  <div ngtAccordionItem>
    <h2 ngtAccordionHeader>
      <button ngtAccordionButton>First Item</button>
    </h2>
    <div ngtAccordionCollapse>
      <div ngtAccordionBody>
        <p class="text-gray-600">This is the content of the first accordion item.</p>
      </div>
    </div>
  </div>
  <div ngtAccordionItem>
    <h2 ngtAccordionHeader>
      <button ngtAccordionButton>Second Item</button>
    </h2>
    <div ngtAccordionCollapse>
      <div ngtAccordionBody>
        <p class="text-gray-600">This is the content of the second accordion item.</p>
      </div>
    </div>
  </div>
  <div ngtAccordionItem>
    <h2 ngtAccordionHeader>
      <button ngtAccordionButton>Third Item</button>
    </h2>
    <div ngtAccordionCollapse>
      <div ngtAccordionBody>
        <p class="text-gray-600">This is the content of the third accordion item.</p>
      </div>
    </div>
  </div>
</div>`,
    multipleOpen: `<div ngtAccordion [multiOpen]="true">
  <div ngtAccordionItem>
    <h2 ngtAccordionHeader>
      <button ngtAccordionButton>First Item</button>
    </h2>
    <div ngtAccordionCollapse>
      <div ngtAccordionBody>
        <p class="text-gray-600">This is the content of the first accordion item.</p>
      </div>
    </div>
  </div>
  <div ngtAccordionItem>
    <h2 ngtAccordionHeader>
      <button ngtAccordionButton>Second Item</button>
    </h2>
    <div ngtAccordionCollapse>
      <div ngtAccordionBody>
        <p class="text-gray-600">This is the content of the second accordion item.</p>
      </div>
    </div>
  </div>
  <div ngtAccordionItem>
    <h2 ngtAccordionHeader>
      <button ngtAccordionButton>Third Item</button>
    </h2>
    <div ngtAccordionCollapse>
      <div ngtAccordionBody>
        <p class="text-gray-600">This is the content of the third accordion item.</p>
      </div>
    </div>
  </div>
</div>`,
    disabled: `<div ngtAccordion>
  <div ngtAccordionItem [disabled]="true">
    <h2 ngtAccordionHeader>
      <button ngtAccordionButton>Disabled Item</button>
    </h2>
    <div ngtAccordionCollapse>
      <div ngtAccordionBody>
        <p class="text-gray-600">This item is disabled and cannot be toggled.</p>
      </div>
    </div>
  </div>
  <div ngtAccordionItem>
    <h2 ngtAccordionHeader>
      <button ngtAccordionButton>Enabled Item</button>
    </h2>
    <div ngtAccordionCollapse>
      <div ngtAccordionBody>
        <p class="text-gray-600">This item is enabled and can be toggled.</p>
      </div>
    </div>
  </div>
</div>`
  };

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      singleOpen: {
        html: 'accordion-single-open.html',
        ts: 'accordion-single-open.ts'
      },
      multipleOpen: {
        html: 'accordion-multiple-open.html',
        ts: 'accordion-multiple-open.ts'
      },
      disabled: {
        html: 'accordion-disabled.html',
        ts: 'accordion-disabled.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('accordion', demoKey, fileType, fileNames);
  }
}
