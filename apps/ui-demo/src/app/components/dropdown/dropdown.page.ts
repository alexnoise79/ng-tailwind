import { Component, signal, inject } from '@angular/core';
import { NgtDropdown, NgtDropdownTrigger, NgtDropdownContent, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.dropdown',
  imports: [NgtDropdown, NgtDropdownTrigger, NgtDropdownContent, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet],
  templateUrl: './dropdown.page.html'
})
export class DropdownPage {
  private toastService = inject(NgtToastService);
  basicDropdownOpen = signal(false);
  placementBottomStartOpen = signal(false);
  placementBottomEndOpen = signal(false);
  placementTopStartOpen = signal(false);
  placementTopEndOpen = signal(false);

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      basic: 'showcase',
      placement: 'showcase'
    },
    {
      basic: 'html',
      placement: 'html'
    }
  );

  // Expose utility methods for template
  toggleDemoView = (demoKey: string) => this.codeViewUtil.toggleDemoView(demoKey);
  setActiveCodeTab = (demoKey: string, tab: 'html' | 'ts') => this.codeViewUtil.setActiveCodeTab(demoKey, tab);
  isShowingCode = (demoKey: string) => this.codeViewUtil.isShowingCode(demoKey);
  getActiveCodeTab = (demoKey: string) => this.codeViewUtil.getActiveCodeTab(demoKey, 'html');

  // Copy to clipboard functionality
  copyToClipboard(code: string) {
    copyToClipboard(code, this.toastService);
  }

  // Code snippets for each demo
  codeSnippets = {
    basic: {
      html: `<ngt-dropdown [placement]="'bottom-start'" [isOpen]="basicDropdownOpen">
  <button ngt-dropdown-trigger class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Open Dropdown</button>
  <div ngt-dropdown-content class="w-48 bg-white rounded-md shadow-lg border border-gray-200">
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
  </div>
</ngt-dropdown>`,
      ts: `import { signal } from '@angular/core';

export class DropdownPage {
  basicDropdownOpen = signal(false);
}`
    },
    placement: {
      html: `<!-- Bottom Start -->
<ngt-dropdown [placement]="'bottom-start'" [isOpen]="placementBottomStartOpen">
  <button ngt-dropdown-trigger class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Bottom Start</button>
  <div ngt-dropdown-content class="w-48 bg-white rounded-md shadow-lg border border-gray-200">
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
  </div>
</ngt-dropdown>

<!-- Bottom End -->
<ngt-dropdown [placement]="'bottom-end'" [isOpen]="placementBottomEndOpen">
  <button ngt-dropdown-trigger class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Bottom End</button>
  <div ngt-dropdown-content class="w-48 bg-white rounded-md shadow-lg border border-gray-200">
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
  </div>
</ngt-dropdown>

<!-- Top Start -->
<ngt-dropdown [placement]="'top-start'" [isOpen]="placementTopStartOpen">
  <button ngt-dropdown-trigger class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Top Start</button>
  <div ngt-dropdown-content class="w-48 bg-white rounded-md shadow-lg border border-gray-200">
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
  </div>
</ngt-dropdown>

<!-- Top End -->
<ngt-dropdown [placement]="'top-end'" [isOpen]="placementTopEndOpen">
  <button ngt-dropdown-trigger class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Top End</button>
  <div ngt-dropdown-content class="w-48 bg-white rounded-md shadow-lg border border-gray-200">
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
  </div>
</ngt-dropdown>`,
      ts: `import { signal } from '@angular/core';

export class DropdownPage {
  placementBottomStartOpen = signal(false);
  placementBottomEndOpen = signal(false);
  placementTopStartOpen = signal(false);
  placementTopEndOpen = signal(false);
}`
    }
  };

  // Helper to get code snippet for a specific tab
  getCodeSnippet(demoKey: string, fileType: 'html' | 'ts'): string {
    return this.codeViewUtil.getCodeSnippet(this.codeSnippets, demoKey, fileType);
  }

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      basic: {
        html: 'dropdown-basic.html',
        ts: 'dropdown-basic.ts'
      },
      placement: {
        html: 'dropdown-placement.html',
        ts: 'dropdown-placement.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('dropdown', demoKey, fileType, fileNames);
  }
}
