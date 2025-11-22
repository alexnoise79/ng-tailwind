# Getting Started

Welcome to **ng-tailwind UI Components** - a modern Angular component library built with TailwindCSS, Angular standalone components, and Angular CDK.

## Installation

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Angular 20.0.0
- Nx workspace

### Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Build the library:**

```bash
nx build ui-components
```

3. **Serve the demo application:**

```bash
nx serve ui-demo
```

The demo application will be available at `http://localhost:4200`.

## Using Components

All components are standalone and can be imported directly:

```typescript
import { NgtButton } from '@ng-tailwind/ui-components';

@Component({
  selector: 'app-example',
  imports: [NgtButton],
  template: `
    <ngt-button variant="primary">Click me</ngt-button>
  `,
})
export class ExampleComponent {}
```

## Available Components

- **Button** - Variants, sizes, and loading states
- **Modal** - Dialog with backdrop and animations
- **Accordion** - Collapsible content sections
- **Nav** - Navigation component with multiple styles (tabs, pills, underline)
- **Dropdown** - Dropdown menu with positioning
- **Tooltip** - Contextual information tooltips
- **Collapse** - Expandable/collapsible content (horizontal or vertical)
- **Datepicker** - Date selection component with calendar view
- **Offcanvas** - Side panel component with multiple positions (start, end, top, bottom)
- **Pagination** - Page navigation with customizable options
- **Toggle Switch** - Form control for boolean values with sizes
- **Toast** - Notification messages with severity levels and auto-dismiss
- **Table** - Data table with sorting, pagination, grouping, and column reordering
- **Select** - Dropdown select with form integration and option grouping
- **Alert** - Alert component with multiple variants and dismissible functionality

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

