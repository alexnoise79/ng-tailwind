# Accessibility Guarantees

All components in ngtailwind UI are built with accessibility (a11y) as a core requirement. This document outlines the accessibility features and guarantees for each component.

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

### Nav

- ✅ `role="tablist"` on container
- ✅ `role="tab"` on nav item buttons
- ✅ `aria-selected` state management
- ✅ `aria-disabled` for disabled items
- ✅ Arrow key navigation (Left/Right for horizontal, Up/Down for vertical)
- ✅ Home/End key support
- ✅ Tab key cycles through nav items only
- ✅ Enter/Space to activate
- ✅ Keyboard navigation respects disabled items

### Dropdown

- ✅ Keyboard accessible trigger
- ✅ Outside click detection to close
- ✅ Escape key to close
- ✅ Focus management
- ✅ ARIA attributes for menu semantics

### Tooltip

- ✅ `role="tooltip"` on tooltip element

### Checkbox

- ✅ Proper `input[type="checkbox"]` element semantics
- ✅ `disabled` state properly communicated
- ✅ `indeterminate` state with `aria-checked="mixed"` support
- ✅ Keyboard accessible (Space to toggle)
- ✅ Focus indicators with visible outline
- ✅ Label association for screen readers
- ✅ Custom templates maintain accessibility when checkbox is hidden
- ✅ Keyboard accessible (focus triggers tooltip)
- ✅ Screen reader compatible
- ✅ Proper timing for show/hide

### Collapse

- ✅ `aria-expanded` state management
- ✅ Keyboard accessible (Enter/Space to toggle)
- ✅ Proper semantic structure

### Datepicker

- ✅ Keyboard navigation (arrow keys, Home/End, Page Up/Down)
- ✅ `aria-label` and `aria-describedby` for date inputs
- ✅ `role="grid"` for calendar view
- ✅ `role="gridcell"` for date cells
- ✅ `aria-selected` for selected dates
- ✅ `aria-disabled` for disabled dates
- ✅ Focus management for calendar navigation
- ✅ Screen reader announcements for date selection

### Offcanvas

- ✅ `role="dialog"` and `aria-modal="true"`
- ✅ `aria-labelledby` for title association
- ✅ Focus trapping using Angular CDK
- ✅ Escape key to close
- ✅ Backdrop click to close (configurable)
- ✅ Focus returns to trigger element on close
- ✅ Body scroll prevention when open

### Pagination

- ✅ `role="navigation"` and `aria-label` for pagination
- ✅ `aria-current="page"` for current page
- ✅ Keyboard navigation (arrow keys, Enter/Space)
- ✅ Disabled state properly communicated
- ✅ Screen reader announcements for page changes

### Toggle Switch

- ✅ Proper `input[type="checkbox"]` semantics
- ✅ `aria-label` or associated label
- ✅ `disabled` state properly communicated
- ✅ Keyboard accessible (Space to toggle)
- ✅ Focus indicators with visible outline

### Toast

- ✅ `role="alert"` or `role="status"` based on severity
- ✅ `aria-live` regions for announcements
- ✅ Keyboard accessible dismiss
- ✅ Screen reader compatible
- ✅ Proper timing for auto-dismiss
- ✅ Focus management for multiple toasts

### Table

- ✅ `role="table"` with proper structure
- ✅ `role="columnheader"` for sortable columns
- ✅ `aria-sort` for sort state (ascending/descending/none)
- ✅ Keyboard navigation (arrow keys, Tab)
- ✅ `aria-label` for table and columns
- ✅ `aria-rowcount` and `aria-rowindex` for large datasets
- ✅ Focus management for sortable columns
- ✅ Screen reader announcements for sorting

### Select

- ✅ `role="combobox"` on trigger
- ✅ `aria-expanded` state management
- ✅ `aria-haspopup="listbox"`
- ✅ `aria-controls` linking trigger to dropdown
- ✅ `role="listbox"` on dropdown
- ✅ `role="option"` on options
- ✅ `aria-selected` for selected option
- ✅ Keyboard navigation (arrow keys, Enter, Escape)
- ✅ Focus management
- ✅ Screen reader announcements for selection

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

