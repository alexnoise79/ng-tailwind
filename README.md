# ngtailwind UI Components

A modern Angular component library built with TailwindCSS, Angular standalone components, and Angular CDK.

## 🚀 Live Demo

### **[👉 View Live Demo →](https://alexnoise79.github.io/ng-tailwind/getting-started)**

> **Explore all components in action!** See the full component library with interactive examples and theme customization.

## Versions

- **Angular**: 20.0.0
- **Tailwind CSS**: 4.1.17

## Features

- 🎨 **TailwindCSS** - Utility-first CSS framework
- 🚀 **Angular 20** - Latest Angular features with standalone components
- 🌐 **SSR Compliant** - Server-side rendering compliant
- ♿ **Accessible** - WCAG 2.1 AA compliant components
- 📦 **CDK Integration** - Uses Angular CDK for overlays, portals, and focus management
- 📚 **Storybook** - Interactive component documentation
- 🎯 **TypeScript** - Fully typed with strict mode
- 🔧 **Nx Workspace** - Monorepo structure for scalability

## Quick Start

```bash
# Install dependencies
npm install

# Build the library
nx build ui-components

# Serve the demo app
nx serve ui-demo

# Run Storybook
nx storybook ui-components
```

## Components

- **Accordion** - Collapsible content sections
- **Alert** - Alert component with multiple variants and dismissible functionality
- **Button** - Variants, sizes, and loading states
- **Card** - Flexible card component with template loading for header, title, subtitle, and footer
- **Checkbox** - Form control with custom values, indeterminate state, and template support
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

## Documentation

- [Getting Started](./docs/getting-started.md)
- [Theme Customization](./docs/theme-customization.md)
- [Component Examples](./docs/component-examples.md)
- [Accessibility](./docs/accessibility.md)

## Project Structure

```
ng-tailwind/
├── apps/
│   └── ui-demo/          # Demo application
├── libs/
│   └── ui-components/    # Component library
│       ├── src/
│       │   ├── components/
│       │   ├── directives/
│       │   └── utils/
│       └── index.ts      # Public API
├── docs/                 # Documentation
├── .storybook/           # Storybook configuration
└── tailwind.config.js    # Tailwind configuration
```

## Development

### Build

```bash
nx build ui-components
```

### Test

```bash
nx test ui-components
```

### Lint

```bash
nx lint ui-components
```

## License

MIT

