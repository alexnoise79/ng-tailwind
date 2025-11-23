import { Component, inject } from '@angular/core';
import { NgtCard, NgtButton, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.card',
  imports: [NgtCard, NgtButton, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet],
  templateUrl: './card.page.html'
})
export class CardPage {
  private toastService = inject(NgtToastService);

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      basic: 'showcase',
      withHeader: 'showcase',
      withFooter: 'showcase',
      complete: 'showcase',
      withImage: 'showcase',
      variants: 'showcase'
    },
    {
      basic: 'html',
      withHeader: 'html',
      withFooter: 'html',
      complete: 'html',
      withImage: 'html',
      variants: 'html'
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
    basic: `<ngt-card>
  <p>This is a basic card with just content.</p>
</ngt-card>`,
    withHeader: `<ngt-card>
  <div header class="p-6 border-b border-gray-200 dark:border-gray-700">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Card Header</h3>
  </div>
  <p class="p-6">Card content goes here.</p>
</ngt-card>`,
    withFooter: `<ngt-card>
  <p class="p-6">Card content goes here.</p>
  <div footer class="p-6 border-t border-gray-200 dark:border-gray-700">
    <ngt-button variant="primary">Action</ngt-button>
  </div>
</ngt-card>`,
    complete: `<ngt-card>
  <div header class="p-6 border-b border-gray-200 dark:border-gray-700">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Card Title</h3>
  </div>
  <h2 title class="p-6 pb-2 text-xl font-bold text-gray-900 dark:text-white">Main Title</h2>
  <p subtitle class="p-6 pt-0 pb-4 text-sm text-gray-600 dark:text-gray-400">This is a subtitle</p>
  <p class="px-6 pb-6 text-gray-700 dark:text-gray-300">Card content goes here. You can add any content you want.</p>
  <div footer class="p-6 border-t border-gray-200 dark:border-gray-700">
    <ngt-button variant="outline">Cancel</ngt-button>
    <ngt-button variant="primary">Save</ngt-button>
  </div>
</ngt-card>`,
    withImage: `<ngt-card>
  <div header class="overflow-hidden">
    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=400&fit=crop" alt="Card image" class="w-full h-48 object-cover" />
  </div>
  <h2 title class="p-6 pb-2 text-xl font-bold text-gray-900 dark:text-white">Card with Image</h2>
  <p subtitle class="p-6 pt-0 pb-4 text-sm text-gray-600 dark:text-gray-400">A beautiful card example with an image header</p>
  <p class="px-6 pb-6 text-gray-700 dark:text-gray-300">
    This card demonstrates all the features: image header, title, subtitle, content, and action buttons in the footer.
  </p>
  <div footer class="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-2 justify-end">
    <ngt-button variant="outline">Learn More</ngt-button>
    <ngt-button variant="primary">Get Started</ngt-button>
  </div>
</ngt-card>`,
    variants: `<ngt-card variant="default">
  <p class="p-6">Default card with shadow-sm</p>
</ngt-card>

<ngt-card variant="bordered">
  <p class="p-6">Bordered card with border</p>
</ngt-card>

<ngt-card variant="elevated">
  <p class="p-6">Elevated card with shadow-lg</p>
</ngt-card>`
  };

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      basic: {
        html: 'card-basic.html',
        ts: 'card-basic.ts'
      },
      withHeader: {
        html: 'card-with-header.html',
        ts: 'card-with-header.ts'
      },
      withFooter: {
        html: 'card-with-footer.html',
        ts: 'card-with-footer.ts'
      },
      complete: {
        html: 'card-complete.html',
        ts: 'card-complete.ts'
      },
      withImage: {
        html: 'card-with-image.html',
        ts: 'card-with-image.ts'
      },
      variants: {
        html: 'card-variants.html',
        ts: 'card-variants.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('card', demoKey, fileType, fileNames);
  }
}

