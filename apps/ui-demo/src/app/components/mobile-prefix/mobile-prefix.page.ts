import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgtMobilePrefix, IPrefix, IMobilePrefix, NgtButton, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService } from '@ngtailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.mobile-prefix',
  imports: [FormsModule, NgtMobilePrefix, NgtButton, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet],
  templateUrl: './mobile-prefix.page.html'
})
export class MobilePrefixPage {
  private toastService = inject(NgtToastService);

  // Sample country prefixes
  prefixes: Array<IPrefix> = [
    { id: 1, name: 'United States', dialCode: '1', code: 'US' },
    { id: 2, name: 'United Kingdom', dialCode: '44', code: 'GB' },
    { id: 3, name: 'Canada', dialCode: '1', code: 'CA' },
    { id: 4, name: 'Germany', dialCode: '49', code: 'DE' },
    { id: 5, name: 'France', dialCode: '33', code: 'FR' },
    { id: 6, name: 'Italy', dialCode: '39', code: 'IT' },
    { id: 7, name: 'Spain', dialCode: '34', code: 'ES' },
    { id: 8, name: 'Australia', dialCode: '61', code: 'AU' },
    { id: 9, name: 'Japan', dialCode: '81', code: 'JP' },
    { id: 10, name: 'China', dialCode: '86', code: 'CN' },
    { id: 11, name: 'Kazakhstan', dialCode: '7', code: 'KZ' },
    { id: 12, name: 'South Korea', dialCode: '82', code: 'KR' },
    { id: 13, name: 'Brazil', dialCode: '55', code: 'BR' },
    { id: 14, name: 'India', dialCode: '91', code: 'IN' },
    { id: 15, name: 'Russia', dialCode: '7', code: 'RU' },
    { id: 16, name: 'Mexico', dialCode: '52', code: 'MX' },
    { id: 17, name: 'Indonesia', dialCode: '62', code: 'ID' },
    { id: 18, name: 'Turkey', dialCode: '90', code: 'TR' },
    { id: 19, name: 'Saudi Arabia', dialCode: '966', code: 'SA' },
    { id: 20, name: 'United Arab Emirates', dialCode: '971', code: 'AE' }
  ];

  // Basic usage (returns string by default)
  mobileValue1 = signal<string | null>(null);

  // With placeholder
  mobileValue2 = signal<IMobilePrefix | null>(null);
  placeholder = signal<string>('Enter phone number');

  // Disabled
  mobileValue3 = signal<IMobilePrefix | null>(null);

  // Readonly
  mobileValue4 = signal<IMobilePrefix | null>(new IMobilePrefix('3451234567', this.prefixes.find(p => p.code === 'IT') || this.prefixes[5]));

  // Return as String (default behavior)
  mobileValue5 = signal<string | null>(null);

  // Return as Object
  mobileValue6 = signal<IMobilePrefix | null>(null);

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      basic: 'showcase',
      placeholder: 'showcase',
      disabled: 'showcase',
      readonly: 'showcase',
      returnAsString: 'showcase',
      forms: 'showcase'
    },
    {
      basic: 'html',
      placeholder: 'html',
      disabled: 'html',
      readonly: 'html',
      returnAsString: 'html',
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
      html: `<ngt-mobile-prefix
  [(ngModel)]="mobileValue1"
  [values]="prefixes"
  class="w-full md:w-96"
/>`,
      ts: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgtMobilePrefix, IPrefix } from '@ngtailwind/ui-components';

@Component({
  selector: 'app-mobile-prefix',
  imports: [FormsModule, NgtMobilePrefix],
  template: \`<!-- template here -->\`
})
export class MobilePrefixPage {
  prefixes: Array<IPrefix> = [
    { id: 1, name: 'United States', dialCode: '1', code: 'US' },
    { id: 2, name: 'United Kingdom', dialCode: '44', code: 'GB' },
    { id: 19, name: 'Saudi Arabia', dialCode: '966', code: 'SA' },
    { id: 20, name: 'United Arab Emirates', dialCode: '971', code: 'AE' },
    // ... more prefixes
  ];

  // Returns string by default (returnAsString is true by default)
  mobileValue1 = signal<string | null>(null);
}`
    },
    placeholder: {
      html: `<ngt-mobile-prefix
  [(ngModel)]="mobileValue2"
  [values]="prefixes"
  [placeholder]="'Enter phone number'"
  class="w-full md:w-96"
/>`,
      ts: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgtMobilePrefix, IPrefix, IMobilePrefix } from '@ngtailwind/ui-components';

@Component({
  selector: 'app-mobile-prefix',
  imports: [FormsModule, NgtMobilePrefix],
  template: \`<!-- template here -->\`
})
export class MobilePrefixPage {
  prefixes: Array<IPrefix> = [
    { id: 1, name: 'United States', dialCode: '1', code: 'US' },
    // ... more prefixes
  ];

  mobileValue2 = signal<IMobilePrefix | null>(null);
  placeholder = signal<string>('Enter phone number');
}`
    },
    disabled: {
      html: `<ngt-mobile-prefix
  [(ngModel)]="mobileValue3"
  [values]="prefixes"
  [disabled]="true"
  class="w-full md:w-96"
/>`,
      ts: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgtMobilePrefix, IPrefix, IMobilePrefix } from '@ngtailwind/ui-components';

@Component({
  selector: 'app-mobile-prefix',
  imports: [FormsModule, NgtMobilePrefix],
  template: \`<!-- template here -->\`
})
export class MobilePrefixPage {
  prefixes: Array<IPrefix> = [
    { id: 1, name: 'United States', dialCode: '1', code: 'US' },
    // ... more prefixes
  ];

  mobileValue3 = signal<IMobilePrefix | null>(null);
}`
    },
    readonly: {
      html: `<ngt-mobile-prefix
  [(ngModel)]="mobileValue4"
  [values]="prefixes"
  [readonly]="true"
  class="w-full md:w-96"
/>`,
      ts: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgtMobilePrefix, IPrefix, IMobilePrefix } from '@ngtailwind/ui-components';

@Component({
  selector: 'app-mobile-prefix',
  imports: [FormsModule, NgtMobilePrefix],
  template: \`<!-- template here -->\`
})
export class MobilePrefixPage {
  prefixes: Array<IPrefix> = [
    { id: 1, name: 'United States', dialCode: '1', code: 'US' },
    // ... more prefixes
  ];

  mobileValue4 = signal<IMobilePrefix | null>(null);
}`
    },
    returnAsString: {
      html: `<div class="space-y-4">
  <!-- Returns string (default) -->
  <div>
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">String Mode (Default)</label>
    <ngt-mobile-prefix
      [(ngModel)]="mobileValue5"
      [values]="prefixes"
      class="w-full md:w-96"
    />
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
      Value: {{ mobileValue5() || 'Empty' }}
    </p>
  </div>

  <!-- Returns object -->
  <div>
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Object Mode</label>
    <ngt-mobile-prefix
      [(ngModel)]="mobileValue6"
      [values]="prefixes"
      [returnAsObject]="true"
      class="w-full md:w-96"
    />
    <div class="mt-2">
      <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Value:</p>
      @if (mobileValue6()) {
        <pre class="bg-gray-100 dark:bg-gray-900 p-3 rounded text-xs"><code>{{ formatObjectValue(mobileValue6()) }}</code></pre>
      } @else {
        <code class="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">null</code>
      }
    </div>
  </div>
</div>`,
      ts: `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgtMobilePrefix, IPrefix, IMobilePrefix } from '@ngtailwind/ui-components';

@Component({
  selector: 'app-mobile-prefix',
  imports: [FormsModule, NgtMobilePrefix],
  template: \`<!-- template here -->\`
})
export class MobilePrefixPage {
  prefixes: Array<IPrefix> = [
    { id: 1, name: 'United States', dialCode: '1', code: 'US' },
    { id: 2, name: 'United Kingdom', dialCode: '44', code: 'GB' },
    // ... more prefixes
  ];

  // String mode (default - returnAsObject is false by default)
  mobileValue5 = signal<string | null>(null);

  // Object mode (returnAsObject is true)
  mobileValue6 = signal<IMobilePrefix | null>(null);

  formatObjectValue(value: IMobilePrefix | null): string {
    if (!value) return 'null';
    return JSON.stringify({
      phone: value.phone,
      country: {
        id: value.country.id,
        name: value.country.name,
        dialCode: value.country.dialCode,
        code: value.country.code
      }
    }, null, 2);
  }
}`
    },
    forms: {
      html: `<form #exampleForm="ngForm" (ngSubmit)="onSubmit()">
  <div class="flex flex-col gap-1 mb-4">
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
    <ngt-mobile-prefix
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
import { NgtMobilePrefix, NgtButton, IPrefix, IMobilePrefix } from '@ngtailwind/ui-components';

@Component({
  selector: 'app-mobile-prefix',
  imports: [FormsModule, NgtMobilePrefix, NgtButton],
  template: \`<!-- template here -->\`
})
export class MobilePrefixPage {
  prefixes: Array<IPrefix> = [
    { id: 1, name: 'United States', dialCode: '1', code: 'US' },
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

  formatObjectValue(value: IMobilePrefix | null): string {
    if (!value) return 'null';
    return JSON.stringify(
      {
        phone: value.phone,
        country: {
          id: value.country.id,
          name: value.country.name,
          dialCode: value.country.dialCode,
          code: value.country.code
        }
      },
      null,
      2
    );
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
      returnAsString: {
        html: 'mobile-prefix-return-as-string.html',
        ts: 'mobile-prefix-return-as-string.ts'
      },
      forms: {
        html: 'mobile-prefix-forms.html',
        ts: 'mobile-prefix-forms.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('mobile-prefix', demoKey, fileType, fileNames);
  }
}
