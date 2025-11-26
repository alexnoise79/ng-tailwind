# Component Usage Examples

## Button

### Basic Usage

```typescript
import { NgtButton } from '@ng-tailwind/ui-components';

@Component({
  imports: [NgtButton],
  template: `
    <ngt-button variant="primary">Primary Button</ngt-button>
    <ngt-button variant="outline">Outline Button</ngt-button>
    <ngt-button variant="ghost">Ghost Button</ngt-button>
  `,
})
export class MyComponent {}
```

### Sizes

```typescript
<ngt-button variant="primary" size="sm">Small</ngt-button>
<ngt-button variant="primary" size="md">Medium</ngt-button>
<ngt-button variant="primary" size="lg">Large</ngt-button>
```

### Loading State

```typescript
import { signal } from '@angular/core';

export class MyComponent {
  loading = signal(false);
  
  handleClick() {
    this.loading.set(true);
    // ... async operation
    this.loading.set(false);
  }
}
```

```html
<ngt-button variant="primary" [loading]="loading" (click)="handleClick()">
  Submit
</ngt-button>
```

## Modal

### Basic Modal

```typescript
import { NgtModal, NgtButton } from '@ng-tailwind/ui-components';
import { signal } from '@angular/core';

export class MyComponent {
  showModal = signal(false);
}
```

```html
<ngt-button variant="primary" (click)="showModal.set(true)">
  Open Modal
</ngt-button>

@if (showModal()) {
  <ngt-modal
    [isOpen]="showModal()"
    [title]="'My Modal'"
    (close)="showModal.set(false)"
  >
    <p>Modal content goes here</p>
  </ngt-modal>
}
```

### Modal with Footer

```html
<ngt-modal
  [isOpen]="showModal()"
  [title]="'Confirm Action'"
  [showFooter]="true"
  (close)="showModal.set(false)"
>
  <p>Are you sure you want to proceed?</p>
  <div footer>
    <ngt-button variant="outline" (click)="showModal.set(false)">Cancel</ngt-button>
    <ngt-button variant="primary" (click)="handleConfirm()">Confirm</ngt-button>
  </div>
</ngt-modal>
```

## Alert

### Basic Usage

```typescript
import { NgtAlert } from '@ng-tailwind/ui-components';
import { signal } from '@angular/core';

export class MyComponent {
  showAlert = signal(true);
  
  onAlertClose() {
    this.showAlert.set(false);
  }
}
```

```html
@if (showAlert()) {
  <ngt-alert variant="success" [dismissible]="true" (close)="onAlertClose()">
    <strong>Success!</strong> Operation completed successfully.
  </ngt-alert>
}
```

### Variants

```html
<!-- Success -->
<ngt-alert variant="success" [dismissible]="true">
  <strong>Success!</strong> Operation completed successfully.
</ngt-alert>

<!-- Info -->
<ngt-alert variant="info" [dismissible]="true">
  <strong>Info:</strong> This is an informational message.
</ngt-alert>

<!-- Warning -->
<ngt-alert variant="warning" [dismissible]="true">
  <strong>Warning:</strong> Please review this action carefully.
</ngt-alert>

<!-- Danger -->
<ngt-alert variant="danger" [dismissible]="true">
  <strong>Error:</strong> An error has occurred.
</ngt-alert>

<!-- Primary -->
<ngt-alert variant="primary" [dismissible]="true">
  <strong>Primary:</strong> This is a primary alert.
</ngt-alert>

<!-- Secondary -->
<ngt-alert variant="secondary" [dismissible]="true">
  <strong>Secondary:</strong> This is a secondary alert.
</ngt-alert>

<!-- Light -->
<ngt-alert variant="light" [dismissible]="true">
  <strong>Light:</strong> This is a light alert.
</ngt-alert>

<!-- Dark -->
<ngt-alert variant="dark" [dismissible]="true">
  <strong>Dark:</strong> This is a dark alert.
</ngt-alert>
```

### Dismissible

```html
<!-- Dismissible alert -->
<ngt-alert variant="info" [dismissible]="true" (close)="onClose()">
  This alert can be dismissed by clicking the close button.
</ngt-alert>

<!-- Non-dismissible alert -->
<ngt-alert variant="info" [dismissible]="false">
  This alert cannot be dismissed.
</ngt-alert>
```

### With Close Event

```typescript
export class MyComponent {
  onClose() {
    console.log('Alert was closed');
    // Handle alert close event
  }
}
```

```html
<ngt-alert variant="warning" [dismissible]="true" (close)="onClose()">
  <strong>Warning:</strong> This alert will trigger a close event when dismissed.
</ngt-alert>
```

## Accordion

### Single Open Mode

```typescript
import { NgtAccordion, NgtAccordionItem } from '@ng-tailwind/ui-components';
```

```html
<ngt-accordion [multiOpen]="false">
  <ngt-accordion-item title="Section 1">
    <p>Content for section 1</p>
  </ngt-accordion-item>
  <ngt-accordion-item title="Section 2">
    <p>Content for section 2</p>
  </ngt-accordion-item>
</ngt-accordion>
```

### Multi-Open Mode

```html
<ngt-accordion [multiOpen]="true">
  <ngt-accordion-item title="Section 1">
    <p>Content for section 1</p>
  </ngt-accordion-item>
  <ngt-accordion-item title="Section 2">
    <p>Content for section 2</p>
  </ngt-accordion-item>
</ngt-accordion>
```

## Nav

### Basic Navigation

```typescript
import { NgtNav, NgtNavItem } from '@ng-tailwind/ui-components';
```

```html
<ngt-nav>
  <ngt-nav-item label="Home" [itemId]="'home'"></ngt-nav-item>
  <ngt-nav-item label="About" [itemId]="'about'"></ngt-nav-item>
  <ngt-nav-item label="Contact" [itemId]="'contact'"></ngt-nav-item>
</ngt-nav>
```

### Navigation Styles

```html
<!-- Tabs style (default) -->
<ngt-nav [style]="'tabs'">
  <ngt-nav-item label="Home" [itemId]="'home'"></ngt-nav-item>
  <ngt-nav-item label="About" [itemId]="'about'"></ngt-nav-item>
</ngt-nav>

<!-- Pills style -->
<ngt-nav [style]="'pills'">
  <ngt-nav-item label="Home" [itemId]="'home'"></ngt-nav-item>
  <ngt-nav-item label="About" [itemId]="'about'"></ngt-nav-item>
</ngt-nav>

<!-- Underline style -->
<ngt-nav [style]="'underline'">
  <ngt-nav-item label="Home" [itemId]="'home'"></ngt-nav-item>
  <ngt-nav-item label="About" [itemId]="'about'"></ngt-nav-item>
</ngt-nav>
```

### Alignment

```html
<!-- Start aligned (default) -->
<ngt-nav [align]="'start'">...</ngt-nav>

<!-- Center aligned -->
<ngt-nav [align]="'center'">...</ngt-nav>

<!-- End aligned -->
<ngt-nav [align]="'end'">...</ngt-nav>

<!-- Justified -->
<ngt-nav [align]="'justified'">...</ngt-nav>
```

### Vertical Orientation

```html
<ngt-nav [orientation]="'vertical'">
  <ngt-nav-item label="Home" [itemId]="'home'"></ngt-nav-item>
  <ngt-nav-item label="About" [itemId]="'about'"></ngt-nav-item>
</ngt-nav>
```

### With Disabled Items

```html
<ngt-nav>
  <ngt-nav-item label="Home" [itemId]="'home'"></ngt-nav-item>
  <ngt-nav-item label="About" [itemId]="'about'"></ngt-nav-item>
  <ngt-nav-item label="Disabled" [itemId]="'disabled'" [disabled]="true"></ngt-nav-item>
</ngt-nav>
```

### With Active ID

```typescript
export class MyComponent {
  activeNavId = signal('about');
}
```

```html
<ngt-nav [activeId]="activeNavId()">
  <ngt-nav-item label="Home" [itemId]="'home'"></ngt-nav-item>
  <ngt-nav-item label="About" [itemId]="'about'"></ngt-nav-item>
  <ngt-nav-item label="Contact" [itemId]="'contact'"></ngt-nav-item>
</ngt-nav>
```

## Dropdown

```typescript
import { 
  NgtDropdown,
  NgtDropdownTrigger,
  NgtDropdownContent 
} from '@ng-tailwind/ui-components';
import { signal } from '@angular/core';

export class MyComponent {
  dropdownOpen = signal(false);
}
```

```html
<ngt-dropdown [placement]="'bottom-start'" [isOpen]="dropdownOpen">
  <button ngt-dropdown-trigger class="px-4 py-2 bg-primary-600 text-white rounded-md">
    Open Menu
  </button>
  <div ngt-dropdown-content class="w-48 bg-white rounded-md shadow-lg border border-gray-200">
    <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-100">Option 1</a>
    <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-100">Option 2</a>
    <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-100">Option 3</a>
  </div>
</ngt-dropdown>
```

## Tooltip

```typescript
import { NgtTooltip } from '@ng-tailwind/ui-components';
```

```html
<button 
  ngtTooltip="This is a helpful tooltip" 
  tooltipPosition="top"
  class="px-4 py-2 bg-primary-600 text-white rounded-md">
  Hover me
</button>
```

### Tooltip Positions

```html
<button ngtTooltip="Top tooltip" tooltipPosition="top">...</button>
<button ngtTooltip="Bottom tooltip" tooltipPosition="bottom">...</button>
<button ngtTooltip="Left tooltip" tooltipPosition="left">...</button>
<button ngtTooltip="Right tooltip" tooltipPosition="right">...</button>
```

## Directives

### Autofocus

```typescript
import { NgtAutofocus } from '@ng-tailwind/ui-components';
```

```html
<input type="text" ngtAutofocus />
```

### Outside Click

```typescript
import { NgtOutsideClick } from '@ng-tailwind/ui-components';
```

```html
<div ngtOutsideClick (ngtOutsideClick)="handleOutsideClick()">
  Content
</div>
```

### Trap Focus

```typescript
import { NgtTrapFocus } from '@ng-tailwind/ui-components';
```

```html
<div ngtTrapFocus>
  <!-- Focus will be trapped within this element -->
</div>
```

## Datepicker

### Basic Usage

```typescript
import { NgtDatepicker, NgtDateStruct } from '@ng-tailwind/ui-components';
import { signal } from '@angular/core';

export class MyComponent {
  selectedDate = signal<NgtDateStruct | null>(null);
}
```

```html
<ngt-datepicker
  [model]="selectedDate()"
  (dateSelect)="selectedDate.set($event)"
></ngt-datepicker>

@if (selectedDate()) {
  <p>Selected: {{ selectedDate()!.year }}-{{ selectedDate()!.month }}-{{ selectedDate()!.day }}</p>
}
```

### With Min/Max Dates

```typescript
export class MyComponent {
  selectedDate = signal<NgtDateStruct | null>(null);
  minDate: NgtDateStruct = { year: 2024, month: 1, day: 1 };
  maxDate: NgtDateStruct = { year: 2024, month: 12, day: 31 };
}
```

```html
<ngt-datepicker
  [model]="selectedDate()"
  [minDate]="minDate"
  [maxDate]="maxDate"
  (dateSelect)="selectedDate.set($event)"
></ngt-datepicker>
```

### With Initial Date

```typescript
export class MyComponent {
  selectedDate = signal<NgtDateStruct>({ year: 2024, month: 3, day: 15 });
}
```

```html
<ngt-datepicker
  [model]="selectedDate()"
  (dateSelect)="selectedDate.set($event)"
></ngt-datepicker>
```

### Disabled State

```html
<ngt-datepicker
  [model]="selectedDate()"
  [disabled]="true"
  (dateSelect)="selectedDate.set($event)"
></ngt-datepicker>
```

### Navigation Event

```typescript
export class MyComponent {
  onNavigate(event: { current: { year: number; month: number } }) {
    console.log('Navigated to:', event.current);
  }
}
```

```html
<ngt-datepicker
  [model]="selectedDate()"
  (dateSelect)="selectedDate.set($event)"
  (navigate)="onNavigate($event)"
></ngt-datepicker>
```

## Card

### Basic Usage

```typescript
import { NgtCard } from '@ng-tailwind/ui-components';
```

```html
<ngt-card>
  <p class="p-6">This is a basic card with just content.</p>
</ngt-card>
```

### Card with Header

```html
<ngt-card>
  <div header class="p-6 border-b border-gray-200 dark:border-gray-700">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Card Header</h3>
  </div>
  <p class="p-6">Card content goes here.</p>
</ngt-card>
```

### Card with Footer

```html
<ngt-card>
  <p class="p-6">Card content goes here.</p>
  <div footer class="p-6 border-t border-gray-200 dark:border-gray-700">
    <ngt-button variant="primary">Action</ngt-button>
  </div>
</ngt-card>
```

### Complete Card with Title and Subtitle

```html
<ngt-card>
  <div header class="p-6 border-b border-gray-200 dark:border-gray-700">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Card Title</h3>
  </div>
  <h2 title class="p-6 pb-2 text-xl font-bold text-gray-900 dark:text-white">Main Title</h2>
  <p subtitle class="p-6 pt-0 pb-4 text-sm text-gray-600 dark:text-gray-400">This is a subtitle</p>
  <p class="px-6 pb-6 text-gray-700 dark:text-gray-300">Card content goes here. You can add any content you want.</p>
  <div footer class="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-2 justify-end">
    <ngt-button variant="outline">Cancel</ngt-button>
    <ngt-button variant="primary">Save</ngt-button>
  </div>
</ngt-card>
```

### Card with Image Header

```html
<ngt-card>
  <div header class="overflow-hidden">
    <img src="https://example.com/image.jpg" alt="Card image" class="w-full h-48 object-cover" />
  </div>
  <h2 title class="p-6 pb-2 text-xl font-bold text-gray-900 dark:text-white">Card with Image</h2>
  <p subtitle class="p-6 pt-0 pb-4 text-sm text-gray-600 dark:text-gray-400">A beautiful card example with an image header</p>
  <p class="px-6 pb-6 text-gray-700 dark:text-gray-300">
    This card demonstrates all the features: image header, title, subtitle, content, and action buttons in the footer.
  </p>
  <div footer class="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-2 justify-end">
    <ngt-button variant="outline">Learn More</ngt-button>
    <ngt-button variant="primary">Get Started</ngt-button>
  </div>
</ngt-card>
```

### Variants

```html
<!-- Default variant with shadow-sm -->
<ngt-card variant="default">
  <p class="p-6">Default card with shadow-sm</p>
</ngt-card>

<!-- Bordered variant -->
<ngt-card variant="bordered">
  <p class="p-6">Bordered card with border</p>
</ngt-card>

<!-- Elevated variant with shadow-lg -->
<ngt-card variant="elevated">
  <p class="p-6">Elevated card with shadow-lg</p>
</ngt-card>
```

## Collapse

### Basic Usage

```typescript
import { NgtCollapse } from '@ng-tailwind/ui-components';
import { signal } from '@angular/core';

export class MyComponent {
  isOpen = signal(false);
}
```

```html
<button (click)="isOpen.set(!isOpen())">Toggle</button>
<ngt-collapse [isOpen]="isOpen()">
  <div class="p-4 bg-gray-100 rounded">
    Collapsible content goes here
  </div>
</ngt-collapse>
```

### Horizontal Collapse

```html
<ngt-collapse [isOpen]="isOpen()" [horizontal]="true">
  <div class="p-4 bg-gray-100 rounded">
    Horizontal collapsible content
  </div>
</ngt-collapse>
```

## Offcanvas

### Basic Usage

```typescript
import { NgtOffCanvas } from '@ng-tailwind/ui-components';
import { signal } from '@angular/core';

export class MyComponent {
  isOpen = signal(false);
}
```

```html
<button (click)="isOpen.set(true)">Open Offcanvas</button>

<ngt-offcanvas
  [isOpen]="isOpen()"
  [title]="'My Offcanvas'"
  [position]="'end'"
  (closed)="isOpen.set(false)"
>
  <p>Offcanvas content goes here</p>
</ngt-offcanvas>
```

### Positions

```html
<!-- Start (left) -->
<ngt-offcanvas [isOpen]="isOpen()" [position]="'start'">...</ngt-offcanvas>

<!-- End (right) -->
<ngt-offcanvas [isOpen]="isOpen()" [position]="'end'">...</ngt-offcanvas>

<!-- Top -->
<ngt-offcanvas [isOpen]="isOpen()" [position]="'top'">...</ngt-offcanvas>

<!-- Bottom -->
<ngt-offcanvas [isOpen]="isOpen()" [position]="'bottom'">...</ngt-offcanvas>
```

## Pagination

### Basic Usage

```typescript
import { NgtPagination } from '@ng-tailwind/ui-components';
import { signal } from '@angular/core';

export class MyComponent {
  currentPage = signal(1);
  totalItems = signal(100);
  pageSize = signal(10);
}
```

```html
<ngt-pagination
  [currentPage]="currentPage()"
  [totalItems]="totalItems()"
  [pageSize]="pageSize()"
  (pageChanged)="currentPage.set($event)"
></ngt-pagination>
```

### With Total Pages

```html
<ngt-pagination
  [currentPage]="currentPage()"
  [totalPages]="10"
  (pageChanged)="currentPage.set($event)"
></ngt-pagination>
```

### Sizes

```html
<ngt-pagination [currentPage]="1" [totalPages]="10" [size]="'sm'"></ngt-pagination>
<ngt-pagination [currentPage]="1" [totalPages]="10" [size]="'md'"></ngt-pagination>
<ngt-pagination [currentPage]="1" [totalPages]="10" [size]="'lg'"></ngt-pagination>
```

## Toggle Switch

### Basic Usage

```typescript
import { NgtToggleSwitch } from '@ng-tailwind/ui-components';
import { signal } from '@angular/core';

export class MyComponent {
  enabled = signal(false);
}
```

```html
<ngt-toggle-switch
  [ngModel]="enabled()"
  (ngModelChange)="enabled.set($event)"
  [label]="'Enable notifications'"
></ngt-toggle-switch>
```

### With Form Control

```typescript
import { FormControl } from '@angular/forms';

export class MyComponent {
  toggleControl = new FormControl(false);
}
```

```html
<ngt-toggle-switch
  [formControl]="toggleControl"
  [label]="'Enable feature'"
></ngt-toggle-switch>
```

### Sizes

```html
<ngt-toggle-switch [size]="'sm'" [label]="'Small'"></ngt-toggle-switch>
<ngt-toggle-switch [size]="'md'" [label]="'Medium'"></ngt-toggle-switch>
<ngt-toggle-switch [size]="'lg'" [label]="'Large'"></ngt-toggle-switch>
```

## Toast

### Basic Usage

```typescript
import { NgtToastService, NgtToastContainer } from '@ng-tailwind/ui-components';

export class MyComponent {
  constructor(private toastService: NgtToastService) {}

  showToast() {
    this.toastService.show({
      text: 'Operation completed successfully',
      severity: 'success'
    });
  }
}
```

```html
<ngt-toast-container></ngt-toast-container>
<button (click)="showToast()">Show Toast</button>
```

### Severity Levels

```typescript
this.toastService.show({ text: 'Info message', severity: 'info' });
this.toastService.show({ text: 'Success message', severity: 'success' });
this.toastService.show({ text: 'Warning message', severity: 'warning' });
this.toastService.show({ text: 'Error message', severity: 'error' });
```

### With Summary and Detail

```typescript
this.toastService.show({
  summary: 'Update Complete',
  detail: 'Your changes have been saved',
  severity: 'success'
});
```

## Table

### Basic Usage

```typescript
import { NgtTable } from '@ng-tailwind/ui-components';

export class MyComponent {
  data = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 },
    { id: 3, name: 'Bob', age: 35 }
  ];

  columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'age', header: 'Age' }
  ];
}
```

```html
<ngt-table
  [value]="data"
  [columns]="columns"
></ngt-table>
```

### With Pagination

```html
<ngt-table
  [value]="data"
  [columns]="columns"
  [paginator]="true"
  [rows]="10"
></ngt-table>
```

### With Sorting

```typescript
export class MyComponent {
  sortField = signal<string | null>(null);
  sortOrder = signal<'asc' | 'desc' | null>(null);
}
```

```html
<ngt-table
  [value]="data"
  [columns]="columns"
  [sortField]="sortField()"
  [sortOrder]="sortOrder()"
  (sort)="handleSort($event)"
></ngt-table>
```

## Select

### Basic Usage

```typescript
import { NgtSelect } from '@ng-tailwind/ui-components';
import { signal } from '@angular/core';

export class MyComponent {
  selectedValue = signal<string | null>(null);
  options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
  ];
}
```

```html
<ngt-select
  [options]="options"
  optionLabel="label"
  optionValue="value"
  [ngModel]="selectedValue()"
  (ngModelChange)="selectedValue.set($event)"
  [placeholder]="'Select an option'"
></ngt-select>
```

### With Form Control

```typescript
import { FormControl } from '@angular/forms';

export class MyComponent {
  selectControl = new FormControl(null);
  options = ['Option 1', 'Option 2', 'Option 3'];
}
```

```html
<ngt-select
  [formControl]="selectControl"
  [options]="options"
  [placeholder]="'Choose...'"
></ngt-select>
```

### With Option Groups

```typescript
export class MyComponent {
  groupedOptions = [
    {
      label: 'Group 1',
      items: [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' }
      ]
    },
    {
      label: 'Group 2',
      items: [
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' }
      ]
    }
  ];
}
```

```html
<ngt-select
  [options]="groupedOptions"
  optionLabel="label"
  optionValue="value"
  [optionGroupLabel]="'label'"
  [optionGroupChildren]="'items'"
></ngt-select>
```

