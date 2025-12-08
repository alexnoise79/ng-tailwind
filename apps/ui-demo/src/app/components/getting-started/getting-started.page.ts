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
  readonly minimalTheme = `@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Primary Colors */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
  --color-primary-950: #172554;
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
