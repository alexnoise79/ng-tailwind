# Getting Started

Welcome to **ngtailwind UI Components** - a comprehensive, modern Angular component library that seamlessly combines the power of TailwindCSS with Angular's latest features. Built with Angular 20 standalone components and Angular CDK, this library provides a complete set of accessible, customizable, and production-ready UI components for your Angular applications.

Whether you're building a simple dashboard or a complex enterprise application, ngtailwind UI Components offers everything you need to create beautiful, responsive, and accessible user interfaces with minimal setup and maximum flexibility.

## Installation

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Angular 20.0.0
- Tailwind CSS 4.x

### Install the Package

Install the `@ngtailwind/ngtailwind` package from npm:

```bash
npm install @ngtailwind/ngtailwind
```

You can also use yarn or pnpm:

```bash
# Using yarn
yarn add @ngtailwind/ngtailwind

# Using pnpm
pnpm add @ngtailwind/ngtailwind
```

For more information, visit the [npm package page](https://www.npmjs.com/package/@ngtailwind/ngtailwind).

### Configure Tailwind CSS

After installing the package, ensure your project has Tailwind CSS 4.x configured. Since the library is installed in `node_modules`, you need to tell Tailwind to scan the library's compiled files using the `@source` directive.

If you haven't set up Tailwind CSS 4.x yet:

1. **Install Tailwind CSS 4.x and its dependencies:**

```bash
npm install -D tailwindcss @tailwindcss/postcss autoprefixer
```

2. **Add Tailwind CSS and configure it to scan the library** in your global styles file (e.g., `src/styles.css`):

```css
@import 'tailwindcss';
@source '../node_modules/@ngtailwind/ngtailwind/esm2022/**/*.{html,js}';
```

3. **Create a PostCSS configuration file** (e.g., `postcss.config.json` in your project root):

```json
{
  "plugins": {
    "@tailwindcss/postcss": {},
    "autoprefixer": {}
  }
}
```

4. **Define a minimal theme** (optional but recommended) in your global styles file. Add a minimal `@theme` block with primary colors:

```css
@custom-variant dark (&:where(.dark, .dark *));

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
}
```

**Important:** The `@source` directive is required because Tailwind CSS 4.x does not automatically scan `node_modules` directories. This tells Tailwind to scan the library's compiled JavaScript and HTML files to detect all the utility classes used by the components.

You can define your theme directly in your CSS file using the `@theme` directive. The minimal theme above includes the primary color palette used by the library components. No `tailwind.config.js` file is required.

**Note:** All component CSS files are automatically bundled with the library. The `@source` directive ensures Tailwind generates the necessary utility classes for the library components.

## Usage Example

All components are standalone and can be imported directly into your Angular components. Here's a complete example:

```typescript
import { Component, signal } from '@angular/core';
import { NgtButton, NgtModal, NgtAlert } from '@ngtailwind/ui-components';

@Component({
  selector: 'app-example',
  imports: [NgtButton, NgtModal, NgtAlert],
  template: `
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
  `,
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
}
```

This example demonstrates:

- **Alert component** with dismissible functionality
- **Button components** with different variants, sizes, and loading states
- **Modal component** with custom footer content
- **Signal-based state management** using Angular's reactive primitives

## Available Components

- **Accordion** - Collapsible content sections
- **Alert** - Alert component with multiple variants and dismissible functionality
- **Button** - Variants, sizes, and loading states
- **Card** - Flexible card component with template loading for header, title, subtitle, and footer
- **Collapse** - Expandable/collapsible content (horizontal or vertical)
- **Datepicker** - Date selection component with calendar view
- **Dropdown** - Dropdown menu with positioning
- **Modal** - Dialog with backdrop and animations
- **Nav** - Navigation component with multiple styles (tabs, pills, underline)
- **Offcanvas** - Side panel component with multiple positions (start, end, top, bottom)
- **Pagination** - Page navigation with customizable options
- **Select** - Dropdown select with form integration and option grouping
- **Table** - Data table with sorting, pagination, grouping, and column reordering
- **Toast** - Notification messages with severity levels and auto-dismiss
- **Toggle Switch** - Form control for boolean values with sizes
- **Tooltip** - Contextual information tooltips
- **Mobile Prefix** - Phone number input with country code selector
- **Password** - Password input with visibility toggle
- **Timepicker** - Time selection component

## Storybook

View all components in Storybook:

```bash
nx storybook ui-components
```

Storybook provides interactive playgrounds for all components with live examples and documentation.

## Next Steps

- Read the [Theme Customization Guide](./theme-customization.md)
- Explore [Component Examples](./component-examples.md)
- Review [Accessibility Guarantees](./accessibility.md)
