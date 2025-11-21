import type { Meta, StoryObj } from '@storybook/angular';
import { NgtToast } from './toast.component';
import { NgtToastService } from './toast.service';
import { NgtToastContainer } from './toast-container.component';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'toast-story-wrapper',
  template: `
    <ngt-toast-container></ngt-toast-container>
    <div class="p-8 space-y-4">
      <div class="flex flex-wrap gap-4">
        <button (click)="showSuccess()" class="px-4 py-2 bg-green-600 text-white rounded">Success</button>
        <button (click)="showInfo()" class="px-4 py-2 bg-blue-600 text-white rounded">Info</button>
        <button (click)="showWarning()" class="px-4 py-2 bg-yellow-600 text-white rounded">Warning</button>
        <button (click)="showDanger()" class="px-4 py-2 bg-red-600 text-white rounded">Danger</button>
        <button (click)="showWithSummary()" class="px-4 py-2 bg-gray-600 text-white rounded">With Summary</button>
        <button (click)="showSticky()" class="px-4 py-2 bg-purple-600 text-white rounded">Sticky</button>
        <button (click)="showNotClosable()" class="px-4 py-2 bg-indigo-600 text-white rounded">Not Closable</button>
        <button (click)="clearAll()" class="px-4 py-2 bg-gray-800 text-white rounded">Clear All</button>
      </div>
    </div>
  `,
  imports: [NgtToastContainer]
})
class ToastStoryWrapper {
  private readonly toastService = inject(NgtToastService);

  showSuccess(): void {
    this.toastService.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Operation completed successfully'
    });
  }

  showInfo(): void {
    this.toastService.show({
      severity: 'info',
      summary: 'Information',
      detail: 'This is an informational message'
    });
  }

  showWarning(): void {
    this.toastService.show({
      severity: 'warning',
      summary: 'Warning',
      detail: 'Please review this action'
    });
  }

  showDanger(): void {
    this.toastService.show({
      severity: 'danger',
      summary: 'Error',
      detail: 'An error occurred'
    });
  }

  showWithSummary(): void {
    this.toastService.show({
      severity: 'info',
      summary: 'Update Available',
      detail: 'A new version of the application is available'
    });
  }

  showSticky(): void {
    this.toastService.show({
      severity: 'warning',
      summary: 'Sticky Toast',
      detail: 'This toast will not auto-close',
      sticky: true
    });
  }

  showNotClosable(): void {
    this.toastService.show({
      severity: 'info',
      summary: 'Processing',
      detail: 'This toast cannot be closed manually',
      closable: false,
      delay: 5000
    });
  }

  clearAll(): void {
    this.toastService.clear();
  }
}

const meta: Meta<NgtToast> = {
  title: 'Components/Toast',
  component: NgtToast,
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'info', 'warning', 'danger'],
      description: 'Toast severity level'
    },
    summary: {
      control: 'text',
      description: 'Toast summary text'
    },
    detail: {
      control: 'text',
      description: 'Toast detail text'
    },
    delay: {
      control: 'number',
      description: 'Auto-close delay in milliseconds'
    },
    sticky: {
      control: 'boolean',
      description: 'Whether the toast should stay visible'
    },
    closable: {
      control: 'boolean',
      description: 'Whether the toast can be closed manually'
    }
  }
};

export default meta;
type Story = StoryObj<NgtToast>;

export const Interactive: Story = {
  render: () => ({
    component: ToastStoryWrapper,
    moduleMetadata: {
      imports: [NgtToastContainer]
    }
  })
};

export const Success: Story = {
  args: {
    severity: 'success',
    summary: 'Success',
    detail: 'Operation completed successfully',
    closable: true
  },
  render: args => ({
    props: args,
    template: `
      <div class="p-8">
        <ngt-toast
          [severity]="severity"
          [summary]="summary"
          [detail]="detail"
          [closable]="closable">
        </ngt-toast>
      </div>
    `
  })
};

export const Info: Story = {
  args: {
    severity: 'info',
    summary: 'Information',
    detail: 'This is an informational message',
    closable: true
  },
  render: args => ({
    props: args,
    template: `
      <div class="p-8">
        <ngt-toast
          [severity]="severity"
          [summary]="summary"
          [detail]="detail"
          [closable]="closable">
        </ngt-toast>
      </div>
    `
  })
};

export const Warning: Story = {
  args: {
    severity: 'warning',
    summary: 'Warning',
    detail: 'Please review this action',
    closable: true
  },
  render: args => ({
    props: args,
    template: `
      <div class="p-8">
        <ngt-toast
          [severity]="severity"
          [summary]="summary"
          [detail]="detail"
          [closable]="closable">
        </ngt-toast>
      </div>
    `
  })
};

export const Danger: Story = {
  args: {
    severity: 'danger',
    summary: 'Error',
    detail: 'An error occurred',
    closable: true
  },
  render: args => ({
    props: args,
    template: `
      <div class="p-8">
        <ngt-toast
          [severity]="severity"
          [summary]="summary"
          [detail]="detail"
          [closable]="closable">
        </ngt-toast>
      </div>
    `
  })
};

export const AllSeverities: Story = {
  render: () => ({
    template: `
      <div class="p-8 space-y-4">
        <ngt-toast severity="success" summary="Success" detail="Operation completed successfully"></ngt-toast>
        <ngt-toast severity="info" summary="Info" detail="This is an informational message"></ngt-toast>
        <ngt-toast severity="warning" summary="Warning" detail="Please review this action"></ngt-toast>
        <ngt-toast severity="danger" summary="Error" detail="An error occurred"></ngt-toast>
      </div>
    `
  })
};

export const WithTextOnly: Story = {
  args: {
    severity: 'info',
    text: 'Simple toast message without summary or detail',
    closable: true
  },
  render: args => ({
    props: args,
    template: `
      <div class="p-8">
        <ngt-toast
          [severity]="severity"
          [text]="text"
          [closable]="closable">
        </ngt-toast>
      </div>
    `
  })
};

export const NotClosable: Story = {
  args: {
    severity: 'info',
    summary: 'Processing',
    detail: 'This toast cannot be closed manually',
    closable: false
  },
  render: args => ({
    props: args,
    template: `
      <div class="p-8">
        <ngt-toast
          [severity]="severity"
          [summary]="summary"
          [detail]="detail"
          [closable]="closable">
        </ngt-toast>
      </div>
    `
  })
};
