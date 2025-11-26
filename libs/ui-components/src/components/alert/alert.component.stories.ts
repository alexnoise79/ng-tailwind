import type { Meta, StoryObj } from '@storybook/angular';
import { NgtAlert } from './alert.component';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'alert-story-wrapper',
  template: `
    <div class="p-8 space-y-4">
      <ngt-alert variant="success" [dismissible]="true" (close)="onClose('success')"> <strong>Success!</strong> This is a success alert with dismissible functionality. </ngt-alert>
      <ngt-alert variant="info" [dismissible]="true" (close)="onClose('info')"> <strong>Info:</strong> This is an informational alert. </ngt-alert>
      <ngt-alert variant="warning" [dismissible]="true" (close)="onClose('warning')"> <strong>Warning:</strong> Please review this action carefully. </ngt-alert>
      <ngt-alert variant="danger" [dismissible]="true" (close)="onClose('danger')"> <strong>Error:</strong> An error has occurred. </ngt-alert>
      <ngt-alert variant="primary" [dismissible]="true" (close)="onClose('primary')"> <strong>Primary:</strong> This is a primary alert. </ngt-alert>
      <ngt-alert variant="secondary" [dismissible]="true" (close)="onClose('secondary')"> <strong>Secondary:</strong> This is a secondary alert. </ngt-alert>
      <ngt-alert variant="light" [dismissible]="true" (close)="onClose('light')"> <strong>Light:</strong> This is a light alert. </ngt-alert>
      <ngt-alert variant="dark" [dismissible]="true" (close)="onClose('dark')"> <strong>Dark:</strong> This is a dark alert. </ngt-alert>
    </div>
  `,
  imports: [NgtAlert]
})
class AlertStoryWrapper {
  onClose(variant: string) {
    console.log(`${variant} alert closed`);
  }
}

const meta: Meta<NgtAlert> = {
  title: 'Components/Alert',
  component: NgtAlert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'info', 'warning', 'danger', 'primary', 'secondary', 'light', 'dark'],
      description: 'Alert variant style'
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed'
    }
  }
};

export default meta;
type Story = StoryObj<NgtAlert>;

export const Interactive: Story = {
  render: () =>
    ({
      component: AlertStoryWrapper
    }) as any
};

export const Success: Story = {
  args: {
    variant: 'success',
    dismissible: true
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtAlert]
    },
    template: `
      <div class="p-8">
        <ngt-alert [variant]="variant" [dismissible]="dismissible" (close)="onClose()">
          <strong>Success!</strong> Operation completed successfully.
        </ngt-alert>
      </div>
    `,
    methods: {
      onClose: () => console.log('Alert closed')
    }
  })
};

export const Info: Story = {
  args: {
    variant: 'info',
    dismissible: true
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtAlert]
    },
    template: `
      <div class="p-8">
        <ngt-alert [variant]="variant" [dismissible]="dismissible" (close)="onClose()">
          <strong>Info:</strong> This is an informational message.
        </ngt-alert>
      </div>
    `,
    methods: {
      onClose: () => console.log('Alert closed')
    }
  })
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    dismissible: true
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtAlert]
    },
    template: `
      <div class="p-8">
        <ngt-alert [variant]="variant" [dismissible]="dismissible" (close)="onClose()">
          <strong>Warning:</strong> Please review this action carefully.
        </ngt-alert>
      </div>
    `,
    methods: {
      onClose: () => console.log('Alert closed')
    }
  })
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    dismissible: true
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtAlert]
    },
    template: `
      <div class="p-8">
        <ngt-alert [variant]="variant" [dismissible]="dismissible" (close)="onClose()">
          <strong>Error:</strong> An error has occurred.
        </ngt-alert>
      </div>
    `,
    methods: {
      onClose: () => console.log('Alert closed')
    }
  })
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    dismissible: true
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtAlert]
    },
    template: `
      <div class="p-8">
        <ngt-alert [variant]="variant" [dismissible]="dismissible" (close)="onClose()">
          <strong>Primary:</strong> This is a primary alert.
        </ngt-alert>
      </div>
    `,
    methods: {
      onClose: () => console.log('Alert closed')
    }
  })
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    dismissible: true
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtAlert]
    },
    template: `
      <div class="p-8">
        <ngt-alert [variant]="variant" [dismissible]="dismissible" (close)="onClose()">
          <strong>Secondary:</strong> This is a secondary alert.
        </ngt-alert>
      </div>
    `,
    methods: {
      onClose: () => console.log('Alert closed')
    }
  })
};

export const Light: Story = {
  args: {
    variant: 'light',
    dismissible: true
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtAlert]
    },
    template: `
      <div class="p-8">
        <ngt-alert [variant]="variant" [dismissible]="dismissible" (close)="onClose()">
          <strong>Light:</strong> This is a light alert.
        </ngt-alert>
      </div>
    `,
    methods: {
      onClose: () => console.log('Alert closed')
    }
  })
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    dismissible: true
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtAlert]
    },
    template: `
      <div class="p-8">
        <ngt-alert [variant]="variant" [dismissible]="dismissible" (close)="onClose()">
          <strong>Dark:</strong> This is a dark alert.
        </ngt-alert>
      </div>
    `,
    methods: {
      onClose: () => console.log('Alert closed')
    }
  })
};

export const AllVariants: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [NgtAlert]
    },
    template: `
      <div class="p-8 space-y-4">
        <ngt-alert variant="success" [dismissible]="true">
          <strong>Success!</strong> Operation completed successfully.
        </ngt-alert>
        <ngt-alert variant="info" [dismissible]="true">
          <strong>Info:</strong> This is an informational message.
        </ngt-alert>
        <ngt-alert variant="warning" [dismissible]="true">
          <strong>Warning:</strong> Please review this action carefully.
        </ngt-alert>
        <ngt-alert variant="danger" [dismissible]="true">
          <strong>Error:</strong> An error has occurred.
        </ngt-alert>
        <ngt-alert variant="primary" [dismissible]="true">
          <strong>Primary:</strong> This is a primary alert.
        </ngt-alert>
        <ngt-alert variant="secondary" [dismissible]="true">
          <strong>Secondary:</strong> This is a secondary alert.
        </ngt-alert>
        <ngt-alert variant="light" [dismissible]="true">
          <strong>Light:</strong> This is a light alert.
        </ngt-alert>
        <ngt-alert variant="dark" [dismissible]="true">
          <strong>Dark:</strong> This is a dark alert.
        </ngt-alert>
      </div>
    `
  })
};

export const NotDismissible: Story = {
  args: {
    variant: 'info',
    dismissible: false
  },
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [NgtAlert]
    },
    template: `
      <div class="p-8">
        <ngt-alert [variant]="variant" [dismissible]="dismissible">
          <strong>Info:</strong> This alert cannot be dismissed.
        </ngt-alert>
      </div>
    `
  })
};
