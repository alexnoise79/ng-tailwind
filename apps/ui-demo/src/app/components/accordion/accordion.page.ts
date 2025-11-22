import { Component, signal, inject } from '@angular/core';
import { 
  NgtAccordion, 
  NgtAccordionItem, 
  NgtAccordionHeader,
  NgtAccordionButton,
  NgtAccordionCollapse,
  NgtAccordionBody,
  NgtNav, 
  NgtNavItem, 
  NgtToastService 
} from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';

@Component({
  selector: 'section.accordion',
  imports: [
    NgtAccordion, 
    NgtAccordionItem, 
    NgtAccordionHeader,
    NgtAccordionButton,
    NgtAccordionCollapse,
    NgtAccordionBody,
    NgtNav, 
    NgtNavItem
  ],
  templateUrl: './accordion.page.html'
})
export class AccordionPage {
  private toastService = inject(NgtToastService);

  // Tab management
  activeTab = signal<DemoTab>('showcase');

  setActiveTab(tab: DemoTab): void {
    this.activeTab.set(tab);
  }

  // View mode for each demo section (showcase or code)
  demoViewMode = signal<Record<string, 'showcase' | 'code'>>({
    singleOpen: 'showcase',
    multipleOpen: 'showcase',
    disabled: 'showcase'
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
    singleOpen: 'html',
    multipleOpen: 'html',
    disabled: 'html'
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
    return fileNames[demoKey]?.[fileType] || `accordion-${demoKey}.${fileType}`;
  }
}
