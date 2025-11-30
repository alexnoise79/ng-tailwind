import { Component, inject } from '@angular/core';
import { NgtNav, NgtNavItem, NgtNavLink, NgtNavContent, NgtNavOutlet, NgtToastService } from '@ngtailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.nav',
  imports: [NgtNav, NgtNavItem, NgtNavLink, NgtNavContent, NgtNavOutlet],
  templateUrl: './nav.page.html'
})
export class NavPage {
  private toastService = inject(NgtToastService);

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      default: 'showcase',
      pills: 'showcase',
      underline: 'showcase',
      center: 'showcase',
      justified: 'showcase',
      disabled: 'showcase',
      vertical: 'showcase',
      routerlink: 'showcase'
    },
    {
      default: 'html',
      pills: 'html',
      underline: 'html',
      center: 'html',
      justified: 'html',
      disabled: 'html',
      vertical: 'html',
      routerlink: 'html'
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
    default: `<ngt-nav>
  <ngt-nav-item label="Home"></ngt-nav-item>
  <ngt-nav-item label="About"></ngt-nav-item>
  <ngt-nav-item label="Contact"></ngt-nav-item>
</ngt-nav>`,
    pills: `<ngt-nav [style]="'pills'">
  <ngt-nav-item label="Home"></ngt-nav-item>
  <ngt-nav-item label="About"></ngt-nav-item>
  <ngt-nav-item label="Contact"></ngt-nav-item>
</ngt-nav>`,
    underline: `<ngt-nav [style]="'underline'">
  <ngt-nav-item label="Home"></ngt-nav-item>
  <ngt-nav-item label="About"></ngt-nav-item>
  <ngt-nav-item label="Contact"></ngt-nav-item>
</ngt-nav>`,
    center: `<ngt-nav [align]="'center'">
  <ngt-nav-item label="Home"></ngt-nav-item>
  <ngt-nav-item label="About"></ngt-nav-item>
  <ngt-nav-item label="Contact"></ngt-nav-item>
</ngt-nav>`,
    justified: `<ngt-nav [align]="'justified'">
  <ngt-nav-item label="Home"></ngt-nav-item>
  <ngt-nav-item label="About"></ngt-nav-item>
  <ngt-nav-item label="Contact"></ngt-nav-item>
</ngt-nav>`,
    disabled: `<ngt-nav>
  <ngt-nav-item label="Home"></ngt-nav-item>
  <ngt-nav-item label="About"></ngt-nav-item>
  <ngt-nav-item label="Disabled" [disabled]="true"></ngt-nav-item>
  <ngt-nav-item label="Contact"></ngt-nav-item>
</ngt-nav>`,
    vertical: `<ngt-nav [orientation]="'vertical'">
  <ngt-nav-item label="Home"></ngt-nav-item>
  <ngt-nav-item label="About"></ngt-nav-item>
  <ngt-nav-item label="Contact"></ngt-nav-item>
</ngt-nav>`,
    routerlink: `<ngt-nav>
  <ngt-nav-item [routerLink]="'/getting-started'" label="Getting Started"></ngt-nav-item>
  <ngt-nav-item [routerLink]="'/button'" label="Button"></ngt-nav-item>
  <ngt-nav-item [routerLink]="'/modal'" label="Modal"></ngt-nav-item>
  <ngt-nav-item [routerLink]="'/table'" label="Table"></ngt-nav-item>
</ngt-nav>`
  };

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      default: {
        html: 'nav-default.html',
        ts: 'nav-default.ts'
      },
      pills: {
        html: 'nav-pills.html',
        ts: 'nav-pills.ts'
      },
      underline: {
        html: 'nav-underline.html',
        ts: 'nav-underline.ts'
      },
      center: {
        html: 'nav-center.html',
        ts: 'nav-center.ts'
      },
      justified: {
        html: 'nav-justified.html',
        ts: 'nav-justified.ts'
      },
      disabled: {
        html: 'nav-disabled.html',
        ts: 'nav-disabled.ts'
      },
      vertical: {
        html: 'nav-vertical.html',
        ts: 'nav-vertical.ts'
      },
      routerlink: {
        html: 'nav-routerlink.html',
        ts: 'nav-routerlink.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('nav', demoKey, fileType, fileNames);
  }
}
