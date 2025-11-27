import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MobilePrefixComponent, IPrefix, IMobilePrefix, NgtButton, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService } from '@ng-tailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.mobile-prefix',
  imports: [FormsModule, MobilePrefixComponent, NgtButton, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet],
  templateUrl: './mobile-prefix.page.html'
})
export class MobilePrefixPage {
  private toastService = inject(NgtToastService);

  // Sample country prefixes
  prefixes: Array<IPrefix> = [
    { id: 1, name: 'United States', prefix: '1', code: 'US' },
    { id: 2, name: 'United Kingdom', prefix: '44', code: 'GB' },
    { id: 3, name: 'Canada', prefix: '1', code: 'CA' },
    { id: 4, name: 'Germany', prefix: '49', code: 'DE' },
    { id: 5, name: 'France', prefix: '33', code: 'FR' },
    { id: 6, name: 'Italy', prefix: '39', code: 'IT' },
    { id: 7, name: 'Spain', prefix: '34', code: 'ES' },
    { id: 8, name: 'Australia', prefix: '61', code: 'AU' },
    { id: 9, name: 'Japan', prefix: '81', code: 'JP' },
    { id: 10, name: 'China', prefix: '86', code: 'CN' }
  ];

  // Basic usage
  mobileValue1 = signal<IMobilePrefix | null>(null);

  // With placeholder
  mobileValue2 = signal<IMobilePrefix | null>(null);
  placeholder = signal<string>('Enter phone number');

  // Disabled
  mobileValue3 = signal<IMobilePrefix | null>(null);

  // Readonly
  mobileValue4 = signal<IMobilePrefix | null>(null);

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      basic: 'showcase',
      placeholder: 'showcase',
      disabled: 'showcase',
      readonly: 'showcase',
      forms: 'showcase'
    },
    {
      basic: 'html',
      placeholder: 'html',
      disabled: 'html',
      readonly: 'html',
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
      html: `<mobile-prefix
  [(ngModel)]="mobileValue1"
  [values]="prefixes"
  class="w-full md:w-96"
/>`,
      ts: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MobilePrefixComponent, IPrefix, IMobilePrefix } from '@ng-tailwind/ui-components';

@Component({
  selector: 'app-mobile-prefix',
  imports: [FormsModule, MobilePrefixComponent],
  template: \`<!-- template here -->\`
})
export class MobilePrefixPage {
  prefixes: Array<IPrefix> = [
    { id: 1, name: 'United States', prefix: '1', code: 'US' },
    { id: 2, name: 'United Kingdom', prefix: '44', code: 'GB' },
    // ... more prefixes
  ];

  mobileValue1 = signal<IMobilePrefix | null>(null);
}`
    },
    placeholder: {
      html: `<mobile-prefix
  [(ngModel)]="mobileValue2"
  [values]="prefixes"
  [placeholder]="'Enter phone number'"
  class="w-full md:w-96"
/>`,
      ts: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MobilePrefixComponent, IPrefix, IMobilePrefix } from '@ng-tailwind/ui-components';

@Component({
  selector: 'app-mobile-prefix',
  imports: [FormsModule, MobilePrefixComponent],
  template: \`<!-- template here -->\`
})
export class MobilePrefixPage {
  prefixes: Array<IPrefix> = [
    { id: 1, name: 'United States', prefix: '1', code: 'US' },
    // ... more prefixes
  ];

  mobileValue2 = signal<IMobilePrefix | null>(null);
  placeholder = signal<string>('Enter phone number');
}`
    },
    disabled: {
      html: `<mobile-prefix
  [(ngModel)]="mobileValue3"
  [values]="prefixes"
  [disabled]="true"
  class="w-full md:w-96"
/>`,
      ts: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MobilePrefixComponent, IPrefix, IMobilePrefix } from '@ng-tailwind/ui-components';

@Component({
  selector: 'app-mobile-prefix',
  imports: [FormsModule, MobilePrefixComponent],
  template: \`<!-- template here -->\`
})
export class MobilePrefixPage {
  prefixes: Array<IPrefix> = [
    { id: 1, name: 'United States', prefix: '1', code: 'US' },
    // ... more prefixes
  ];

  mobileValue3 = signal<IMobilePrefix | null>(null);
}`
    },
    readonly: {
      html: `<mobile-prefix
  [(ngModel)]="mobileValue4"
  [values]="prefixes"
  [readonly]="true"
  class="w-full md:w-96"
/>`,
      ts: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MobilePrefixComponent, IPrefix, IMobilePrefix } from '@ng-tailwind/ui-components';

@Component({
  selector: 'app-mobile-prefix',
  imports: [FormsModule, MobilePrefixComponent],
  template: \`<!-- template here -->\`
})
export class MobilePrefixPage {
  prefixes: Array<IPrefix> = [
    { id: 1, name: 'United States', prefix: '1', code: 'US' },
    // ... more prefixes
  ];

  mobileValue4 = signal<IMobilePrefix | null>(null);
}`
    },
    forms: {
      html: `<form #exampleForm="ngForm" (ngSubmit)="onSubmit()">
  <div class="flex flex-col gap-1 mb-4">
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
    <mobile-prefix
      #phone="ngModel"
      [(ngModel)]="mobileValue1"
      [values]="prefixes"
      name="phone"
      placeholder="Enter phone number"
      class="w-full md:w-96"
      required
    />
    @if (phone.invalid && (phone.touched || formSubmitted())) {
      <p class="text-sm text-red-600 dark:text-red-400">Phone number is required.</p>
    }
  </div>
  <ngt-button type="submit" variant="primary">Submit</ngt-button>
</form>`,
      ts: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MobilePrefixComponent, NgtButton, IPrefix, IMobilePrefix } from '@ng-tailwind/ui-components';

@Component({
  selector: 'app-mobile-prefix',
  imports: [FormsModule, MobilePrefixComponent, NgtButton],
  template: \`<!-- template here -->\`
})
export class MobilePrefixPage {
  prefixes: Array<IPrefix> = [
    { id: 1, name: 'United States', prefix: '1', code: 'US' },
    // ... more prefixes
  ];

  mobileValue1 = signal<IMobilePrefix | null>(null);
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
    console.log('Form submitted', this.mobileValue1());
  }

  // Helper to get code snippet for a specific tab
  getCodeSnippet(demoKey: string, fileType: 'html' | 'ts'): string {
    return this.codeViewUtil.getCodeSnippet(this.codeSnippets, demoKey, fileType);
  }

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      basic: {
        html: 'mobile-prefix-basic.html',
        ts: 'mobile-prefix-basic.ts'
      },
      placeholder: {
        html: 'mobile-prefix-placeholder.html',
        ts: 'mobile-prefix-placeholder.ts'
      },
      disabled: {
        html: 'mobile-prefix-disabled.html',
        ts: 'mobile-prefix-disabled.ts'
      },
      readonly: {
        html: 'mobile-prefix-readonly.html',
        ts: 'mobile-prefix-readonly.ts'
      },
      forms: {
        html: 'mobile-prefix-forms.html',
        ts: 'mobile-prefix-forms.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('mobile-prefix', demoKey, fileType, fileNames);
  }
}

