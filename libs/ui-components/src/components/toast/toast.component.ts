import { Component, Input, signal, computed, output, TemplateRef, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { classMerge } from '../../utils';
import { Variant } from '../../models';

@Component({
  selector: 'ngt-toast',
  imports: [NgTemplateOutlet],
  templateUrl: './toast.component.html'
})
export class NgtToast implements OnInit, OnDestroy {
  toastId = '';

  @Input() set text(value: string | TemplateRef<unknown> | undefined) {
    this._text.set(value);
  }
  private _text = signal<string | TemplateRef<unknown> | undefined>(undefined);

  @Input() set severity(value: Variant) {
    this._severity.set(value || 'info');
  }
  private _severity = signal<Variant>('info');

  @Input() set summary(value: string | undefined) {
    this._summary.set(value);
  }
  private _summary = signal<string | undefined>(undefined);

  @Input() set detail(value: string | undefined) {
    this._detail.set(value);
  }
  private _detail = signal<string | undefined>(undefined);

  @Input() set delay(value: number | undefined) {
    this._delay.set(value ?? 3000);
  }
  private _delay = signal<number>(3000);

  @Input() set sticky(value: boolean | undefined) {
    this._sticky.set(value ?? false);
  }
  private _sticky = signal<boolean>(false);

  @Input() set closable(value: boolean | undefined) {
    this._closable.set(value ?? true);
  }
  private _closable = signal<boolean>(true);

  @Input() set data(value: unknown) {
    this._data.set(value);
  }
  private _data = signal<unknown>(undefined);

  @Input() set icon(value: string | undefined) {
    this._icon.set(value);
  }
  private _icon = signal<string | undefined>(undefined);

  @Input() set styleClass(value: string | undefined) {
    this._styleClass.set(value);
  }
  private _styleClass = signal<string | undefined>(undefined);

  @Input() set closeIcon(value: string | undefined) {
    this._closeIcon.set(value);
  }
  private _closeIcon = signal<string | undefined>(undefined);

  readonly closed = output<void>();

  @ViewChild('toastElement') toastElement!: ElementRef<HTMLElement>;

  private isVisible = signal(false);
  private isRemoving = signal(false);

  textValue = computed(() => this._text());
  severityValue = computed(() => this._severity());
  summaryValue = computed(() => this._summary());
  detailValue = computed(() => this._detail());
  closableValue = computed(() => this._closable());
  iconValue = computed(() => this._icon());
  styleClassValue = computed(() => this._styleClass());
  closeIconValue = computed(() => this._closeIcon());

  isTextTemplate = computed(() => {
    const text = this.textValue();
    return text instanceof TemplateRef;
  });

  textTemplate = computed(() => {
    const text = this.textValue();
    return text instanceof TemplateRef ? text : null;
  });

  templateContext = computed(() => {
    return { $implicit: this._data() as Record<string, unknown> };
  });

  toastClasses = computed(() => {
    const baseClasses = 'flex items-start gap-3 p-4 rounded-lg shadow-lg border transition-all duration-300 transform relative pointer-events-auto';
    const severityClasses: Record<Variant, string> = {
      success: 'bg-white/90 border-green-200 text-green-800 dark:bg-gray-900/90 dark:border-green-800 dark:text-green-200',
      info: 'bg-white/90 border-blue-200 text-blue-800 dark:bg-gray-900/90 dark:border-blue-800 dark:text-blue-200',
      warning: 'bg-white/90 border-yellow-200 text-yellow-800 dark:bg-gray-900/90 dark:border-yellow-800 dark:text-yellow-200',
      danger: 'bg-white/90 border-red-200 text-red-800 dark:bg-gray-900/90 dark:border-red-800 dark:text-red-200',
      primary: 'bg-white/90 border-primary-200 text-primary-800 dark:bg-gray-900/90 dark:border-primary-800 dark:text-primary-200',
      secondary: 'bg-white/90 border-gray-200 text-gray-800 dark:bg-gray-800/90 dark:border-gray-700 dark:text-gray-200',
      light: 'bg-white/90 border-gray-300 text-gray-900 dark:bg-gray-700/90 dark:border-gray-600 dark:text-gray-100',
      dark: 'bg-gray-900/90 border-gray-700 text-gray-100 dark:bg-gray-950/90 dark:border-gray-800 dark:text-gray-50'
    };
    const visibilityClasses = this.isRemoving() ? 'opacity-0 translate-x-full' : this.isVisible() ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full';

    const customClass = this.styleClassValue();

    return classMerge(baseClasses, severityClasses[this.severityValue()], visibilityClasses, customClass || '');
  });

  iconClasses = computed(() => {
    const severityClasses: Record<Variant, string> = {
      success: 'text-green-600 dark:text-green-400',
      info: 'text-blue-600 dark:text-blue-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      danger: 'text-red-600 dark:text-red-400',
      primary: 'text-primary-600 dark:text-primary-400',
      secondary: 'text-gray-600 dark:text-gray-400',
      light: 'text-gray-700 dark:text-gray-300',
      dark: 'text-gray-100 dark:text-gray-50'
    };
    return severityClasses[this.severityValue()];
  });

  defaultIcon = computed(() => {
    if (this.iconValue()) {
      return this.iconValue();
    }
    const icons: Record<Variant, string> = {
      success: 'M19 5l-8 8.254-3.729-3.509-2.771 2.773 6.5 6.482 11-11.228z',
      info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      danger: 'M8 5L12 9L16 5L19 9L16 12L19 15L16 19L12 15L8 19L5 15L8 12L5 9Z',
      primary: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      secondary: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      light: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      dark: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    };
    return icons[this.severityValue()];
  });

  ngOnInit() {
    // Trigger entrance animation
    setTimeout(() => {
      this.isVisible.set(true);
    }, 10);
  }

  ngOnDestroy() {
    // Lifecycle hook - cleanup handled automatically by Angular
    this.isRemoving.set(false);
    this.isVisible.set(false);
  }

  close() {
    this.isRemoving.set(true);
    setTimeout(() => {
      this.closed.emit();
    }, 300);
  }

  handleClose() {
    if (this.closableValue()) {
      this.close();
    }
  }
}
