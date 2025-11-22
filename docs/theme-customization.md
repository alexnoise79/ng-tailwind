# Theme Customization Guide

The ng-tailwind UI library uses **Tailwind CSS 4.1.17** with the `@theme` directive for theme configuration. This modern approach allows you to define all design tokens directly in CSS, making customization straightforward and powerful.

## Understanding Tailwind CSS v4 Theming

In Tailwind CSS v4, themes are defined using the `@theme` directive in your CSS file, not in JavaScript configuration. This provides better performance, type safety, and easier customization.

### Basic Setup

Your theme is defined in your global styles file (e.g., `apps/ui-demo/src/styles.css`):

```css
@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Your theme variables go here */
}
```

## Theme Structure

### Primary Colors

Define your primary color palette using CSS variables within the `@theme` block:

```css
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

### Secondary Colors

```css
@theme {
  /* Secondary Colors */
  --color-secondary-50: #f8fafc;
  --color-secondary-100: #f1f5f9;
  --color-secondary-200: #e2e8f0;
  --color-secondary-300: #cbd5e1;
  --color-secondary-400: #94a3b8;
  --color-secondary-500: #64748b;
  --color-secondary-600: #475569;
  --color-secondary-700: #334155;
  --color-secondary-800: #1e293b;
  --color-secondary-900: #0f172a;
  --color-secondary-950: #020617;
}
```

### Box Shadows

```css
@theme {
  /* Box Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
}
```

### Spacing Scale

```css
@theme {
  /* Spacing */
  --spacing-0-5: 0.125rem;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  --spacing-8: 2rem;
  /* ... up to --spacing-96: 24rem */
}
```

### Border Radius

```css
@theme {
  /* Border Radius */
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
@theme {
  /* Transition Duration */
  --transition-duration: 150ms;
  --transition-duration-75: 75ms;
  --transition-duration-100: 100ms;
  --transition-duration-200: 200ms;
  --transition-duration-300: 300ms;
  --transition-duration-500: 500ms;
  --transition-duration-700: 700ms;
  --transition-duration-1000: 1000ms;

  /* Transition Timing */
  --transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Dark Mode Configuration

Tailwind CSS v4 uses the `@custom-variant` directive to define dark mode. The library uses a class-based approach:

```css
@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));
```

This allows you to use the `dark:` variant in your Tailwind classes, and it will apply when the `.dark` class is present on any ancestor element.

### Dark Mode Theme Overrides

You can override theme variables for dark mode using the `.dark` selector:

```css
.dark {
  --scrollbar-thumb: var(--color-primary-500);
  --scrollbar-track: rgb(30 41 59);
  --scrollbar-thumb-hover: var(--color-primary-600);
}
```

## Customizing Your Theme

### Method 1: Override in @theme Block

You can directly modify the `@theme` block in your styles file:

```css
@theme {
  /* Override primary colors */
  --color-primary-500: #0ea5e9;  /* Sky blue */
  --color-primary-600: #0284c7;
  --color-primary-700: #0369a1;
  
  /* Override shadows */
  --shadow-lg: 0 10px 15px -3px rgb(14 165 233 / 0.2);
}
```

### Method 2: Using Data Attributes for Theme Variants

You can create multiple theme variants using data attributes. This allows users to switch themes dynamically:

```css
/* Cyberpunk Theme */
[data-theme='cyberpunk'] {
  --color-primary-50: #fdf4ff;
  --color-primary-100: #fae8ff;
  --color-primary-500: #d946ef;
  --color-primary-600: #c026d3;
  
  /* Sharp, angular design */
  --radius-sm: 0;
  --radius-md: 0;
  --radius-lg: 0.25rem;
  
  /* Vibrant, glowing shadows */
  --shadow-lg: 0 10px 15px -3px rgb(217 70 239 / 0.4);
}

/* Minimalist Theme */
[data-theme='minimalist'] {
  --color-primary-500: #737373;
  --color-primary-600: #525252;
  
  /* Very subtle shadows */
  --shadow-sm: 0 1px 1px 0 rgb(0 0 0 / 0.02);
  --shadow-md: 0 2px 4px 0 rgb(0 0 0 / 0.03);
  
  /* Generous border radius */
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}
```

Then apply the theme in your HTML:

```html
<html data-theme="cyberpunk">
  <!-- Your app -->
</html>
```

Or switch themes dynamically in Angular:

```typescript
export class AppComponent {
  currentTheme = signal('default');
  
  setTheme(theme: string) {
    this.currentTheme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}
```

### Method 3: Override Specific Variables

You can override individual variables outside the `@theme` block using CSS selectors:

```css
/* Override for specific components */
.my-custom-button {
  --color-primary-500: #10b981; /* Green */
}

/* Override globally */
:root {
  --color-primary-500: #8b5cf6; /* Purple */
}
```

## Complete Example: Custom Brand Theme

Here's a complete example of creating a custom brand theme:

```css
@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Brand Primary Colors - Ocean Blue */
  --color-primary-50: #f0f9ff;
  --color-primary-100: #e0f2fe;
  --color-primary-200: #bae6fd;
  --color-primary-300: #7dd3fc;
  --color-primary-400: #38bdf8;
  --color-primary-500: #0ea5e9;
  --color-primary-600: #0284c7;
  --color-primary-700: #0369a1;
  --color-primary-800: #075985;
  --color-primary-900: #0c4a6e;
  --color-primary-950: #082f49;

  /* Brand Secondary Colors - Slate */
  --color-secondary-50: #f8fafc;
  --color-secondary-100: #f1f5f9;
  --color-secondary-500: #64748b;
  --color-secondary-600: #475569;

  /* Custom Shadows with Brand Color */
  --shadow-sm: 0 1px 2px 0 rgb(14 165 233 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(14 165 233 / 0.15);
  --shadow-lg: 0 10px 15px -3px rgb(14 165 233 / 0.2);

  /* Custom Border Radius */
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}
```

## Using Theme Variables in Components

Once defined in `@theme`, you can use these variables in your Tailwind classes:

```html
<!-- Using primary colors -->
<button class="bg-primary-500 hover:bg-primary-600 text-white">
  Click me
</button>

<!-- Using custom shadows -->
<div class="shadow-lg">
  Content
</div>

<!-- Using spacing -->
<div class="p-4 m-2">
  Content
</div>

<!-- Using border radius -->
<div class="rounded-lg">
  Content
</div>
```

## Advanced: Custom Scrollbar Theming

You can also theme custom scrollbars using CSS variables:

```css
@theme {
  /* Scrollbar Colors - Light mode */
  --scrollbar-thumb: var(--color-primary-500);
  --scrollbar-track: rgb(241 245 249);
  --scrollbar-thumb-hover: var(--color-primary-600);
}

/* Dark mode scrollbar */
.dark {
  --scrollbar-thumb: var(--color-primary-500);
  --scrollbar-track: rgb(30 41 59);
  --scrollbar-thumb-hover: var(--color-primary-600);
}

/* Apply scrollbar styles */
body {
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
}

::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover);
}
```

## Best Practices

1. **Define all theme tokens in `@theme`**: Keep your design system consistent by defining all tokens in one place.

2. **Use semantic naming**: Use names like `primary`, `secondary` rather than specific colors like `blue`, `red`.

3. **Create theme variants with data attributes**: Use `[data-theme='...']` for multiple theme options.

4. **Leverage CSS variables**: Variables defined in `@theme` are automatically available as Tailwind utilities.

5. **Test in both light and dark modes**: Ensure your customizations work well in both modes.

## Migration from Tailwind v3

If you're migrating from Tailwind v3:

- **Old**: Theme defined in `tailwind.config.js`
- **New**: Theme defined in CSS using `@theme` directive

- **Old**: `theme.extend.colors`
- **New**: `--color-*` variables in `@theme`

- **Old**: `darkMode: 'class'` in config
- **New**: `@custom-variant dark (&:where(.dark, .dark *))` in CSS

All components will automatically use your custom theme through Tailwind's utility classes!
