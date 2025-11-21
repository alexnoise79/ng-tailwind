import { Component, signal, inject } from '@angular/core';
import { NgtDropdown, NgtDropdownTrigger, NgtDropdownContent, NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';

@Component({
  selector: 'section.dropdown',
  imports: [NgtDropdown, NgtDropdownTrigger, NgtDropdownContent, NgtNav, NgtNavItem],
  templateUrl: './dropdown.page.html'
})
export class DropdownPage {
  private toastService = inject(NgtToastService);
  dropdownOpen1 = signal(false);
  dropdownOpen2 = signal(false);

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
    basic: `<ngt-dropdown [align]="'left'" [isOpen]="dropdownOpen">
  <button ngt-dropdown-trigger class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Open Dropdown</button>
  <div ngt-dropdown-content class="mt-2 w-48 bg-white rounded-md shadow-lg">
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
  </div>
</ngt-dropdown>`,
    rightAligned: `<ngt-dropdown [align]="'right'" [isOpen]="dropdownOpen">
  <button ngt-dropdown-trigger class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Right Aligned Dropdown</button>
  <div ngt-dropdown-content class="mt-2 w-48 bg-white rounded-md shadow-lg">
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
  </div>
</ngt-dropdown>`
  };
}

