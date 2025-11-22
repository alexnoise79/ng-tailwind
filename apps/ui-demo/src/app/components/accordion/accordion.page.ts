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
</div>`
  };
}
