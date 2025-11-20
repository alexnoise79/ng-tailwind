# Component Usage Examples

## Button

### Basic Usage

```typescript
import { ButtonComponent } from '@ng-tailwind/ui-components';

@Component({
  imports: [ButtonComponent],
  template: `
    <ui-button variant="primary">Primary Button</ui-button>
    <ui-button variant="outline">Outline Button</ui-button>
    <ui-button variant="ghost">Ghost Button</ui-button>
  `,
})
export class MyComponent {}
```

### Sizes

```typescript
<ui-button variant="primary" size="sm">Small</ui-button>
<ui-button variant="primary" size="md">Medium</ui-button>
<ui-button variant="primary" size="lg">Large</ui-button>
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
<ui-button variant="primary" [loading]="loading" (click)="handleClick()">
  Submit
</ui-button>
```

## Modal

### Basic Modal

```typescript
import { ModalComponent } from '@ng-tailwind/ui-components';
import { signal } from '@angular/core';

export class MyComponent {
  showModal = signal(false);
}
```

```html
<ui-button variant="primary" (click)="showModal.set(true)">
  Open Modal
</ui-button>

@if (showModal()) {
  <ui-modal
    [isOpen]="showModal()"
    [title]="'My Modal'"
    (close)="showModal.set(false)"
  >
    <p>Modal content goes here</p>
  </ui-modal>
}
```

### Modal with Footer

```html
<ui-modal
  [isOpen]="showModal()"
  [title]="'Confirm Action'"
  [showFooter]="true"
  (close)="showModal.set(false)"
>
  <p>Are you sure you want to proceed?</p>
  <div footer>
    <ui-button variant="outline" (click)="showModal.set(false)">Cancel</ui-button>
    <ui-button variant="primary" (click)="handleConfirm()">Confirm</ui-button>
  </div>
</ui-modal>
```

## Accordion

### Single Open Mode

```typescript
import { AccordionComponent, AccordionItemComponent } from '@ng-tailwind/ui-components';
```

```html
<ui-accordion [multiOpen]="false">
  <ui-accordion-item title="Section 1">
    <p>Content for section 1</p>
  </ui-accordion-item>
  <ui-accordion-item title="Section 2">
    <p>Content for section 2</p>
  </ui-accordion-item>
</ui-accordion>
```

### Multi-Open Mode

```html
<ui-accordion [multiOpen]="true">
  <ui-accordion-item title="Section 1">
    <p>Content for section 1</p>
  </ui-accordion-item>
  <ui-accordion-item title="Section 2">
    <p>Content for section 2</p>
  </ui-accordion-item>
</ui-accordion>
```

## Tabs

```typescript
import { TabsComponent, TabComponent } from '@ng-tailwind/ui-components';
```

```html
<ui-tabs>
  <ui-tab label="Overview">
    <h3>Overview Content</h3>
    <p>This is the overview tab</p>
  </ui-tab>
  <ui-tab label="Details">
    <h3>Details Content</h3>
    <p>This is the details tab</p>
  </ui-tab>
  <ui-tab label="Settings">
    <h3>Settings Content</h3>
    <p>This is the settings tab</p>
  </ui-tab>
</ui-tabs>
```

## Dropdown

```typescript
import { 
  DropdownComponent,
  DropdownTriggerDirective,
  DropdownContentDirective 
} from '@ng-tailwind/ui-components';
import { signal } from '@angular/core';

export class MyComponent {
  dropdownOpen = signal(false);
}
```

```html
<ui-dropdown [align]="'left'" [isOpen]="dropdownOpen">
  <button ui-dropdown-trigger class="px-4 py-2 bg-primary-600 text-white rounded-md">
    Open Menu
  </button>
  <div ui-dropdown-content class="mt-2 w-48 bg-white rounded-md shadow-lg">
    <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-100">Option 1</a>
    <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-100">Option 2</a>
    <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-100">Option 3</a>
  </div>
</ui-dropdown>
```

## Tooltip

```typescript
import { TooltipComponent } from '@ng-tailwind/ui-components';
```

```html
<ui-tooltip text="This is a helpful tooltip" position="top">
  <button class="px-4 py-2 bg-primary-600 text-white rounded-md">
    Hover me
  </button>
</ui-tooltip>
```

### Tooltip Positions

```html
<ui-tooltip text="Top tooltip" position="top">...</ui-tooltip>
<ui-tooltip text="Bottom tooltip" position="bottom">...</ui-tooltip>
<ui-tooltip text="Left tooltip" position="left">...</ui-tooltip>
<ui-tooltip text="Right tooltip" position="right">...</ui-tooltip>
```

## Directives

### Autofocus

```typescript
import { AutofocusDirective } from '@ng-tailwind/ui-components';
```

```html
<input type="text" uiAutofocus />
```

### Outside Click

```typescript
import { OutsideClickDirective } from '@ng-tailwind/ui-components';
```

```html
<div uiOutsideClick (uiOutsideClick)="handleOutsideClick()">
  Content
</div>
```

### Trap Focus

```typescript
import { TrapFocusDirective } from '@ng-tailwind/ui-components';
```

```html
<div uiTrapFocus>
  <!-- Focus will be trapped within this element -->
</div>
```

## Datepicker

### Basic Usage

```typescript
import { DatepickerComponent, NgtDateStruct } from '@ng-tailwind/ui-components';
import { signal } from '@angular/core';

export class MyComponent {
  selectedDate = signal<NgtDateStruct | null>(null);
}
```

```html
<ui-datepicker
  [model]="selectedDate()"
  (dateSelect)="selectedDate.set($event)"
></ui-datepicker>

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
<ui-datepicker
  [model]="selectedDate()"
  [minDate]="minDate"
  [maxDate]="maxDate"
  (dateSelect)="selectedDate.set($event)"
></ui-datepicker>
```

### With Initial Date

```typescript
export class MyComponent {
  selectedDate = signal<NgtDateStruct>({ year: 2024, month: 3, day: 15 });
}
```

```html
<ui-datepicker
  [model]="selectedDate()"
  (dateSelect)="selectedDate.set($event)"
></ui-datepicker>
```

### Disabled State

```html
<ui-datepicker
  [model]="selectedDate()"
  [disabled]="true"
  (dateSelect)="selectedDate.set($event)"
></ui-datepicker>
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
<ui-datepicker
  [model]="selectedDate()"
  (dateSelect)="selectedDate.set($event)"
  (navigate)="onNavigate($event)"
></ui-datepicker>
```

