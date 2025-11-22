import { Component, signal, inject } from '@angular/core';
import { NgtDropdown, NgtDropdownTrigger, NgtDropdownContent, NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.dropdown',
  imports: [NgtDropdown, NgtDropdownTrigger, NgtDropdownContent, NgtNav, NgtNavItem],
  templateUrl: './dropdown.page.html'
})
export class DropdownPage {
  private toastService = inject(NgtToastService);
  basicDropdownOpen = signal(false);
  rightAlignedDropdownOpen = signal(false);

  // Tab management
  activeTab = signal<DemoTab>('showcase');

  setActiveTab(tab: DemoTab): void {
    this.activeTab.set(tab);
  }

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      basic: 'showcase',
      rightAligned: 'showcase'
    },
    {
      basic: 'html',
      rightAligned: 'html'
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
    basic: {
      html: `<ngt-dropdown [align]="'left'" [isOpen]="basicDropdownOpen">
  <button ngt-dropdown-trigger class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Open Dropdown</button>
  <div ngt-dropdown-content class="mt-2 w-48 bg-white rounded-md shadow-lg">
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
    rightAligned: {
      html: `<ngt-dropdown [align]="'right'" [isOpen]="rightAlignedDropdownOpen">
  <button ngt-dropdown-trigger class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Right Aligned Dropdown</button>
  <div ngt-dropdown-content class="mt-2 w-48 bg-white rounded-md shadow-lg">
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
  </div>
</ngt-dropdown>`,
      ts: `import { signal } from '@angular/core';

export class DropdownPage {
  rightAlignedDropdownOpen = signal(false);
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
      rightAligned: {
        html: 'dropdown-right-aligned.html',
        ts: 'dropdown-right-aligned.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('dropdown', demoKey, fileType, fileNames);
  }
}
