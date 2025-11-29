import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgtCheckbox, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService } from '@ngtailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.checkbox',
  imports: [NgtCheckbox, FormsModule, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet],
  templateUrl: './checkbox.page.html'
})
export class CheckboxPage {
  private toastService = inject(NgtToastService);
  
  basicCheckbox = false;
  labeledCheckbox = true;
  labelBeforeCheckbox = false;
  customValues = signal<'yes' | 'no'>('no');
  indeterminateCheckbox = signal(false);
  disabledChecked = true;
  disabledUnchecked = false;
  formCheckbox = false;
  templateCheckbox1 = false;
  templateCheckbox2 = signal(false);
  templateCheckbox3 = signal(false);
  
  // Indeterminate example - master and child checkboxes
  childCheckbox1 = signal(false);
  childCheckbox2 = signal(false);
  childCheckbox3 = signal(false);
  
  // Computed properties for indeterminate example
  allChildrenChecked = computed(() => 
    this.childCheckbox1() && this.childCheckbox2() && this.childCheckbox3()
  );
  
  someChildrenChecked = computed(() => 
    this.childCheckbox1() || this.childCheckbox2() || this.childCheckbox3()
  );
  
  isMasterIndeterminate = computed(() => 
    this.someChildrenChecked() && !this.allChildrenChecked()
  );
  
  masterChecked = computed(() => this.allChildrenChecked());
  
  toggleMaster() {
    const newValue = !this.allChildrenChecked();
    this.childCheckbox1.set(newValue);
    this.childCheckbox2.set(newValue);
    this.childCheckbox3.set(newValue);
  }

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      basic: 'showcase',
      label: 'showcase',
      labelBefore: 'showcase',
      sizes: 'showcase',
      customValues: 'showcase',
      indeterminate: 'showcase',
      disabled: 'showcase',
      templates: 'showcase',
      forms: 'showcase'
    },
    {
      basic: 'html',
      label: 'html',
      labelBefore: 'html',
      sizes: 'html',
      customValues: 'html',
      indeterminate: 'html',
      disabled: 'html',
      templates: 'html',
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
    basic: `<ngt-checkbox></ngt-checkbox>
<ngt-checkbox [(ngModel)]="basicCheckbox"></ngt-checkbox>
<p>Value: {{ basicCheckbox }}</p>`,
    label: `<ngt-checkbox label="Accept terms and conditions"></ngt-checkbox>
<ngt-checkbox [(ngModel)]="labeledCheckbox" label="Enable notifications"></ngt-checkbox>`,
    labelBefore: `<ngt-checkbox [labelBefore]="true" label="Label before checkbox"></ngt-checkbox>`,
    sizes: `<ngt-checkbox size="sm" label="Small checkbox"></ngt-checkbox>
<ngt-checkbox size="md" label="Medium checkbox"></ngt-checkbox>
<ngt-checkbox size="lg" label="Large checkbox"></ngt-checkbox>`,
    customValues: {
      html: `<ngt-checkbox 
  [(ngModel)]="customValues" 
  [trueValue]="'yes'" 
  [falseValue]="'no'" 
  label="Custom values (yes/no)">
</ngt-checkbox>
<p>Value: {{ customValues() }}</p>`,
      ts: `customValues = signal<'yes' | 'no'>('no');`
    },
    indeterminate: {
      html: `<ngt-checkbox 
  [ngModel]="masterChecked()" 
  [indeterminate]="isMasterIndeterminate()" 
  (ngModelChange)="toggleMaster()"
  label="Select all">
</ngt-checkbox>
<div class="ml-6 mt-2 flex flex-col gap-3">
  <ngt-checkbox 
    [(ngModel)]="childCheckbox1" 
    label="Option 1">
  </ngt-checkbox>
  <ngt-checkbox 
    [(ngModel)]="childCheckbox2" 
    label="Option 2">
  </ngt-checkbox>
  <ngt-checkbox 
    [(ngModel)]="childCheckbox3" 
    label="Option 3">
  </ngt-checkbox>
</div>`,
      ts: `childCheckbox1 = signal(false);
childCheckbox2 = signal(false);
childCheckbox3 = signal(false);

allChildrenChecked = computed(() => 
  this.childCheckbox1() && this.childCheckbox2() && this.childCheckbox3()
);

someChildrenChecked = computed(() => 
  this.childCheckbox1() || this.childCheckbox2() || this.childCheckbox3()
);

isMasterIndeterminate = computed(() => 
  this.someChildrenChecked() && !this.allChildrenChecked()
);

masterChecked = computed(() => this.allChildrenChecked());

toggleMaster() {
  const newValue = !this.allChildrenChecked();
  this.childCheckbox1.set(newValue);
  this.childCheckbox2.set(newValue);
  this.childCheckbox3.set(newValue);
}`
    },
    disabled: `<ngt-checkbox [disabled]="true" label="Disabled (unchecked)"></ngt-checkbox>
<ngt-checkbox [(ngModel)]="disabledChecked" [disabled]="true" label="Disabled (checked)"></ngt-checkbox>`,
    templates: {
      html: `<ngt-checkbox [(ngModel)]="templateCheckbox1" label="Custom templates">
  <ng-template #trueTemplate>
    <span class="text-green-600 dark:text-green-400 ml-2">✓ Active</span>
  </ng-template>
  <ng-template #falseTemplate>
    <span class="text-gray-500 ml-2">○ Inactive</span>
  </ng-template>
</ngt-checkbox>

<ngt-checkbox [(ngModel)]="templateCheckbox2" label="Icon templates">
  <ng-template #trueTemplate>
    <span class="ml-2 text-blue-600 dark:text-blue-400">🔵</span>
  </ng-template>
  <ng-template #falseTemplate>
    <span class="ml-2 text-gray-400">⚪</span>
  </ng-template>
</ngt-checkbox>

<ngt-checkbox [(ngModel)]="templateCheckbox3" label="Badge templates">
  <ng-template #trueTemplate>
    <span class="ml-2 px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">Enabled</span>
  </ng-template>
  <ng-template #falseTemplate>
    <span class="ml-2 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">Disabled</span>
  </ng-template>
</ngt-checkbox>`,
      ts: `templateCheckbox1 = false;
templateCheckbox2 = signal(false);
templateCheckbox3 = signal(false);`
    },
    forms: {
      html: `<form #exampleForm="ngForm" (ngSubmit)="onSubmit()">
  <div class="mb-4">
    <ngt-checkbox 
      name="agree" 
      [(ngModel)]="formCheckbox" 
      #agree="ngModel"
      label="I agree to the terms and conditions"
      required>
    </ngt-checkbox>
    @if (agree.invalid && (agree.touched || formSubmitted())) {
      <p class="text-red-600 dark:text-red-400 text-sm mt-1">This field is required</p>
    }
  </div>
  <button type="submit" [disabled]="exampleForm.invalid">Submit</button>
</form>`,
      ts: `formCheckbox = false;
formSubmitted = signal(false);

onSubmit() {
  this.formSubmitted.set(true);
  if (this.formCheckbox) {
    console.log('Form submitted', this.formCheckbox);
  }
}`
    }
  };

  formSubmitted = signal(false);

  onSubmit() {
    this.formSubmitted.set(true);
    if (this.formCheckbox) {
      console.log('Form submitted', this.formCheckbox);
    }
  }

  // Helper to get code snippet for a specific tab
  getCodeSnippet(demoKey: string, fileType: 'html' | 'ts'): string {
    return this.codeViewUtil.getCodeSnippet(this.codeSnippets, demoKey, fileType);
  }

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      basic: {
        html: 'checkbox-basic.html',
        ts: 'checkbox-basic.ts'
      },
      label: {
        html: 'checkbox-label.html',
        ts: 'checkbox-label.ts'
      },
      labelBefore: {
        html: 'checkbox-label-before.html',
        ts: 'checkbox-label-before.ts'
      },
      sizes: {
        html: 'checkbox-sizes.html',
        ts: 'checkbox-sizes.ts'
      },
      customValues: {
        html: 'checkbox-custom-values.html',
        ts: 'checkbox-custom-values.ts'
      },
      indeterminate: {
        html: 'checkbox-indeterminate.html',
        ts: 'checkbox-indeterminate.ts'
      },
      disabled: {
        html: 'checkbox-disabled.html',
        ts: 'checkbox-disabled.ts'
      },
      templates: {
        html: 'checkbox-templates.html',
        ts: 'checkbox-templates.ts'
      },
      forms: {
        html: 'checkbox-forms.html',
        ts: 'checkbox-forms.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('checkbox', demoKey, fileType, fileNames);
  }
}

