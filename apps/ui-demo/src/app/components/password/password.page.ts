import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgtPassword, NgtButton, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.password',
  imports: [FormsModule, NgtPassword, NgtButton, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet],
  templateUrl: './password.page.html'
})
export class PasswordPage {
  private toastService = inject(NgtToastService);

  // Basic
  passwordValue1 = signal<string>('');

  // Sizes
  passwordValue2 = signal<string>('');
  passwordValue3 = signal<string>('');
  passwordValue4 = signal<string>('');

  // With strength
  passwordValue5 = signal<string>('');
  showStrength1 = signal<boolean>(true);

  // Disabled
  disabledPassword = signal<string>('MyPassword123!');

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      basic: 'showcase',
      sizes: 'showcase',
      strength: 'showcase',
      disabled: 'showcase',
      forms: 'showcase'
    },
    {
      basic: 'html',
      sizes: 'html',
      strength: 'html',
      disabled: 'html',
      forms: 'html'
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
      html: `<ngt-password
  [(ngModel)]="passwordValue1"
  placeholder="Enter password"
  class="w-full md:w-64"
/>`,
      ts: `import { signal } from '@angular/core';

export class PasswordPage {
  passwordValue1 = signal<string>('');
}`
    },
    sizes: {
      html: `<ngt-password
  [(ngModel)]="passwordValue2"
  size="sm"
  placeholder="Small password"
  class="w-full md:w-64"
/>

<ngt-password
  [(ngModel)]="passwordValue3"
  size="md"
  placeholder="Medium password (default)"
  class="w-full md:w-64"
/>

<ngt-password
  [(ngModel)]="passwordValue4"
  size="lg"
  placeholder="Large password"
  class="w-full md:w-64"
/>`,
      ts: `import { signal } from '@angular/core';

export class PasswordPage {
  passwordValue2 = signal<string>('');
  passwordValue3 = signal<string>('');
  passwordValue4 = signal<string>('');
}`
    },
    strength: {
      html: `<ngt-password
  [(ngModel)]="passwordValue5"
  [showStrength]="true"
  placeholder="Enter password with strength indicator"
  class="w-full md:w-64"
/>`,
      ts: `import { signal } from '@angular/core';

export class PasswordPage {
  passwordValue5 = signal<string>('');
}`
    },
    disabled: {
      html: `<ngt-password
  [(ngModel)]="disabledPassword"
  [disabled]="true"
  class="w-full md:w-64"
/>`,
      ts: `import { signal } from '@angular/core';

export class PasswordPage {
  disabledPassword = signal<string>('MyPassword123!');
}`
    },
    forms: {
      html: `<form #exampleForm="ngForm" (ngSubmit)="onSubmit()">
  <div class="flex flex-col gap-1 mb-4">
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
    <ngt-password
      #password="ngModel"
      [(ngModel)]="passwordValue1"
      name="password"
      placeholder="Enter password"
      [showStrength]="true"
      class="w-full md:w-64"
      required
    />
    @if (password.invalid && (password.touched || formSubmitted())) {
      <p class="text-sm text-red-600">Password is required.</p>
    }
  </div>
  <ngt-button type="submit" variant="primary">Submit</ngt-button>
</form>`,
      ts: `import { signal } from '@angular/core';

export class PasswordPage {
  passwordValue1 = signal<string>('');
  formSubmitted = signal(false);

  onSubmit() {
    this.formSubmitted.set(true);
    console.log('Form submitted');
  }
}`
    }
  };

  formSubmitted = signal(false);

  onSubmit() {
    this.formSubmitted.set(true);
    console.log('Form submitted');
  }

  // Helper to get code snippet for a specific tab
  getCodeSnippet(demoKey: string, fileType: 'html' | 'ts'): string {
    return this.codeViewUtil.getCodeSnippet(this.codeSnippets, demoKey, fileType);
  }

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      basic: {
        html: 'password-basic.html',
        ts: 'password-basic.ts'
      },
      sizes: {
        html: 'password-sizes.html',
        ts: 'password-sizes.ts'
      },
      strength: {
        html: 'password-strength.html',
        ts: 'password-strength.ts'
      },
      disabled: {
        html: 'password-disabled.html',
        ts: 'password-disabled.ts'
      },
      forms: {
        html: 'password-forms.html',
        ts: 'password-forms.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('password', demoKey, fileType, fileNames);
  }
}
