# Accessibility Guarantees

All components in ng-tailwind UI are built with accessibility (a11y) as a core requirement. This document outlines the accessibility features and guarantees for each component.

## General Principles

- **ARIA Attributes**: All components include appropriate ARIA attributes for screen readers
- **Keyboard Navigation**: Full keyboard support for all interactive components
- **Focus Management**: Proper focus trapping and management
- **Semantic HTML**: Components use semantic HTML elements where appropriate
- **Color Contrast**: All text meets WCAG AA contrast requirements

## Component-Specific Accessibility

### Button

- ✅ Proper `button` element semantics
- ✅ `disabled` state properly communicated
- ✅ Loading state is visually and programmatically indicated
- ✅ Keyboard accessible (Enter/Space activation)
- ✅ Focus indicators with visible outline

### Modal

- ✅ `role="dialog"` and `aria-modal="true"`
- ✅ `aria-labelledby` for title association
- ✅ Focus trapping using Angular CDK
- ✅ Escape key to close
- ✅ Backdrop click to close (configurable)
- ✅ Focus returns to trigger element on close
- ✅ Body scroll prevention when open

### Accordion

- ✅ `aria-expanded` state on buttons
- ✅ `aria-controls` linking button to content
- ✅ `role="region"` on content panels
- ✅ Keyboard navigation (Enter/Space to toggle)
- ✅ Proper heading hierarchy

### Tabs

- ✅ `role="tablist"` on container
- ✅ `role="tab"` on tab buttons
- ✅ `role="tabpanel"` on content panels
- ✅ `aria-selected` state management
- ✅ `aria-controls` linking tabs to panels
- ✅ Arrow key navigation (Left/Right)
- ✅ Home/End key support
- ✅ Tab key cycles through tabs only
- ✅ Enter/Space to activate

### Dropdown

- ✅ Keyboard accessible trigger
- ✅ Outside click detection to close
- ✅ Escape key to close
- ✅ Focus management
- ✅ ARIA attributes for menu semantics

### Tooltip

- ✅ `role="tooltip"` on tooltip element
- ✅ Keyboard accessible (focus triggers tooltip)
- ✅ Screen reader compatible
- ✅ Proper timing for show/hide

## Directives

### Autofocus Directive

- ✅ Respects user preferences (doesn't force focus if disabled)
- ✅ Works with keyboard navigation

### Outside Click Directive

- ✅ Properly handles keyboard events
- ✅ Accessible to screen reader users

### Trap Focus Directive

- ✅ Uses Angular CDK FocusTrap
- ✅ Maintains focus within component
- ✅ Proper tab order management

## Testing Accessibility

### Manual Testing

1. **Keyboard Navigation**: Test all components using only keyboard
2. **Screen Reader**: Test with NVDA (Windows), JAWS (Windows), or VoiceOver (macOS)
3. **Focus Indicators**: Verify all interactive elements have visible focus states
4. **Color Contrast**: Use tools like WebAIM Contrast Checker

### Automated Testing

Consider using tools like:
- **axe DevTools**: Browser extension for accessibility testing
- **Lighthouse**: Includes accessibility audits
- **Pa11y**: Command-line accessibility testing

## WCAG Compliance

All components aim for **WCAG 2.1 Level AA** compliance:

- ✅ **Perceivable**: Information is presentable to users
- ✅ **Operable**: Interface components are navigable
- ✅ **Understandable**: Information and UI operation are understandable
- ✅ **Robust**: Content is interpretable by assistive technologies

## Reporting Issues

If you find accessibility issues, please report them with:
- Component name
- Issue description
- Steps to reproduce
- Expected behavior
- Browser and screen reader used

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Angular Accessibility Guide](https://angular.io/guide/accessibility)

