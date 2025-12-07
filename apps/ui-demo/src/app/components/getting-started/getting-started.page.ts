import { Component, inject } from '@angular/core';
import { NgtToastService } from '@ngtailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';

@Component({
  selector: 'section.getting-started',
  templateUrl: './getting-started.page.html'
})
export class GettingStartedPage {
  private toastService = inject(NgtToastService);

  // Code snippets for copy functionality
  readonly installNpm = 'npm install @ngtailwind/ngtailwind';
  readonly installYarn = `# Using yarn
yarn add @ngtailwind/ngtailwind

# Using pnpm
pnpm add @ngtailwind/ngtailwind`;
  readonly installTailwind = 'npm install -D tailwindcss@^4.1.17 postcss autoprefixer';
  readonly tailwindDirectives = `@import 'tailwindcss';
@source '../node_modules/@ngtailwind/ngtailwind/esm2022/**/*.{html,js}';`;
  readonly postcssConfig = `{
  "plugins": {
    "@tailwindcss/postcss": {},
    "autoprefixer": {}
  }
}`;
  readonly usageExample = `import { Component, signal } from '@angular/core';
import { NgtButton, NgtModal, NgtAlert } from '@ngtailwind/ui-components';

@Component({
  selector: 'app-example',
  imports: [NgtButton, NgtModal, NgtAlert],
  template: \`
    <div class="p-6 space-y-4">
      <!-- Alert Component -->
      <ngt-alert 
        variant="info" 
        [dismissible]="true"
        (dismiss)="onAlertDismiss()"
      >
        Welcome to ngtailwind UI Components!
      </ngt-alert>

      <!-- Button Component -->
      <div class="flex gap-2">
        <ngt-button variant="primary" (click)="showModal.set(true)">
          Open Modal
        </ngt-button>
        <ngt-button variant="outline" size="lg">
          Outline Button
        </ngt-button>
        <ngt-button variant="ghost" [loading]="isLoading()">
          Loading State
        </ngt-button>
      </div>

      <!-- Modal Component -->
      @if (showModal()) {
        <ngt-modal
          [isOpen]="showModal()"
          title="Example Modal"
          (close)="showModal.set(false)"
        >
          <p class="text-gray-600 dark:text-gray-400">
            This is an example modal dialog. You can add any content here.
          </p>
          <div footer class="flex justify-end gap-2">
            <ngt-button variant="outline" (click)="showModal.set(false)">
              Cancel
            </ngt-button>
            <ngt-button variant="primary" (click)="handleConfirm()">
              Confirm
            </ngt-button>
          </div>
        </ngt-modal>
      }
    </div>
  \`,
})
export class ExampleComponent {
  showModal = signal(false);
  isLoading = signal(false);

  onAlertDismiss() {
    console.log('Alert dismissed');
  }

  handleConfirm() {
    console.log('Action confirmed');
    this.showModal.set(false);
  }
}`;

  copyToClipboard(code: string) {
    copyToClipboard(code, this.toastService);
  }
}
