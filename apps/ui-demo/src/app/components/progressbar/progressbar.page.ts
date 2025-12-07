import { Component, signal, inject } from '@angular/core';
import { NgtProgressbar, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService } from '@ngtailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.progressbar',
  imports: [NgtProgressbar, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet],
  templateUrl: './progressbar.page.html'
})
export class ProgressbarPage {
  private toastService = inject(NgtToastService);

  // Progress values for demos
  progressValue = signal(45);
  animatedProgress = signal(0);

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      basic: 'showcase',
      variants: 'showcase',
      withValue: 'showcase',
      striped: 'showcase',
      animated: 'showcase',
      customHeight: 'showcase'
    },
    {
      basic: 'html',
      variants: 'html',
      withValue: 'html',
      striped: 'html',
      animated: 'html',
      customHeight: 'html'
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
    basic: `<ngt-progressbar [value]="45"></ngt-progressbar>`,
    variants: `<ngt-progressbar [value]="25" type="primary"></ngt-progressbar>
<ngt-progressbar [value]="50" type="success"></ngt-progressbar>
<ngt-progressbar [value]="75" type="info"></ngt-progressbar>
<ngt-progressbar [value]="40" type="warning"></ngt-progressbar>
<ngt-progressbar [value]="60" type="danger"></ngt-progressbar>
<ngt-progressbar [value]="80" type="secondary"></ngt-progressbar>`,
    withValue: `<ngt-progressbar [value]="45" [showValue]="true"></ngt-progressbar>`,
    striped: `<ngt-progressbar [value]="45" [striped]="true"></ngt-progressbar>`,
    animated: `<ngt-progressbar [value]="45" [striped]="true" [animated]="true"></ngt-progressbar>`,
    customHeight: `<ngt-progressbar [value]="45" height="1rem"></ngt-progressbar>
<ngt-progressbar [value]="45" height="1.5rem"></ngt-progressbar>
<ngt-progressbar [value]="45" height="2rem"></ngt-progressbar>`
  };

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      basic: {
        html: 'progressbar-basic.html',
        ts: 'progressbar-basic.ts'
      },
      variants: {
        html: 'progressbar-variants.html',
        ts: 'progressbar-variants.ts'
      },
      withValue: {
        html: 'progressbar-with-value.html',
        ts: 'progressbar-with-value.ts'
      },
      striped: {
        html: 'progressbar-striped.html',
        ts: 'progressbar-striped.ts'
      },
      animated: {
        html: 'progressbar-animated.html',
        ts: 'progressbar-animated.ts'
      },
      customHeight: {
        html: 'progressbar-custom-height.html',
        ts: 'progressbar-custom-height.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('progressbar', demoKey, fileType, fileNames);
  }

  // Simulate progress for animated demo
  startAnimatedProgress() {
    this.animatedProgress.set(0);
    const interval = setInterval(() => {
      this.animatedProgress.update(val => {
        if (val >= 100) {
          clearInterval(interval);
          return 100;
        }
        return val + 2;
      });
    }, 50);
  }
}

