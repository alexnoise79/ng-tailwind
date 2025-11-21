import { Component, signal, inject } from '@angular/core';
import { NgtNav, NgtNavItem, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoTab } from '../../models/demo.models';

@Component({
  selector: 'section.nav',
  imports: [NgtNav, NgtNavItem],
  templateUrl: './nav.page.html'
})
export class NavPage {
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
    default: `<ngt-nav>
  <ngt-nav-item label="Home" [itemId]="'nav-home'"></ngt-nav-item>
  <ngt-nav-item label="About" [itemId]="'nav-about'"></ngt-nav-item>
  <ngt-nav-item label="Contact" [itemId]="'nav-contact'"></ngt-nav-item>
</ngt-nav>`,
    pills: `<ngt-nav [style]="'pills'">
  <ngt-nav-item label="Home" [itemId]="'nav-pills-home'"></ngt-nav-item>
  <ngt-nav-item label="About" [itemId]="'nav-pills-about'"></ngt-nav-item>
  <ngt-nav-item label="Contact" [itemId]="'nav-pills-contact'"></ngt-nav-item>
</ngt-nav>`,
    underline: `<ngt-nav [style]="'underline'">
  <ngt-nav-item label="Home" [itemId]="'nav-underline-home'"></ngt-nav-item>
  <ngt-nav-item label="About" [itemId]="'nav-underline-about'"></ngt-nav-item>
  <ngt-nav-item label="Contact" [itemId]="'nav-underline-contact'"></ngt-nav-item>
</ngt-nav>`,
    center: `<ngt-nav [align]="'center'">
  <ngt-nav-item label="Home" [itemId]="'nav-center-home'"></ngt-nav-item>
  <ngt-nav-item label="About" [itemId]="'nav-center-about'"></ngt-nav-item>
  <ngt-nav-item label="Contact" [itemId]="'nav-center-contact'"></ngt-nav-item>
</ngt-nav>`,
    justified: `<ngt-nav [align]="'justified'">
  <ngt-nav-item label="Home" [itemId]="'nav-justified-home'"></ngt-nav-item>
  <ngt-nav-item label="About" [itemId]="'nav-justified-about'"></ngt-nav-item>
  <ngt-nav-item label="Contact" [itemId]="'nav-justified-contact'"></ngt-nav-item>
</ngt-nav>`,
    disabled: `<ngt-nav>
  <ngt-nav-item label="Home" [itemId]="'nav-disabled-home'"></ngt-nav-item>
  <ngt-nav-item label="About" [itemId]="'nav-disabled-about'"></ngt-nav-item>
  <ngt-nav-item label="Disabled" [itemId]="'nav-disabled-disabled'" [disabled]="true"></ngt-nav-item>
  <ngt-nav-item label="Contact" [itemId]="'nav-disabled-contact'"></ngt-nav-item>
</ngt-nav>`,
    vertical: `<ngt-nav [orientation]="'vertical'">
  <ngt-nav-item label="Home" [itemId]="'nav-vertical-home'"></ngt-nav-item>
  <ngt-nav-item label="About" [itemId]="'nav-vertical-about'"></ngt-nav-item>
  <ngt-nav-item label="Contact" [itemId]="'nav-vertical-contact'"></ngt-nav-item>
</ngt-nav>`
  };
}
