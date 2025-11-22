# Theme Customization Guide

The ng-tailwind UI library uses Tailwind CSS 4.1.17 with CSS variables for theming, making it easy to customize colors, spacing, shadows, and other design tokens.

> **Note**: This library uses Tailwind CSS v4, which defines themes in CSS using the `@theme` directive rather than in the JavaScript config file.

## CSS Variables

All theme tokens are defined as CSS variables in `apps/ui-demo/src/styles.css` (or your application's global styles).

### Primary Colors

```css
:root {
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  /* ... */
  --color-primary-900: #1e3a8a;
  --color-primary-950: #172554;
}
```

### Secondary Colors

```css
:root {
  --color-secondary-50: #f8fafc;
  --color-secondary-100: #f1f5f9;
  /* ... */
  --color-secondary-900: #0f172a;
  --color-secondary-950: #020617;
}
```

### Shadows

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
}
```

### Spacing Scale

The spacing scale uses rem units and is available from `--spacing-0-5` to `--spacing-96`.

### Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-full: 9999px;
}
```

### Transitions

```css
:root {
  --transition-duration: 150ms;
  --transition-duration-75: 75ms;
  --transition-duration-100: 100ms;
  /* ... */
  --transition-duration-1000: 1000ms;
  --transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Customizing Your Theme

### 1. Override CSS Variables

Create a custom theme by overriding the CSS variables in your application's global styles:

```css
:root {
  --color-primary-500: #your-color;
  --color-primary-600: #your-darker-color;
  /* ... */
}
```

### 2. Tailwind CSS v4 Configuration

In Tailwind CSS v4, themes are defined in CSS using the `@theme` directive. The `tailwind.config.js` file is minimal and mainly used for content paths. All theme customization should be done in your CSS files using CSS variables or the `@theme` directive.

### 3. Dark Mode Support

To add dark mode support, use the `prefers-color-scheme` media query or a class-based approach:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary-500: #your-dark-color;
    /* ... */
  }
}

/* Or class-based */
.dark {
  --color-primary-500: #your-dark-color;
  /* ... */
}
```

## Example: Custom Brand Colors

```css
:root {
  /* Brand Primary */
  --color-primary-50: #f0f9ff;
  --color-primary-500: #0ea5e9;
  --color-primary-600: #0284c7;
  --color-primary-700: #0369a1;
  
  /* Brand Secondary */
  --color-secondary-500: #64748b;
  --color-secondary-600: #475569;
}
```

All components will automatically use your custom colors through Tailwind's utility classes.

