import { Component, Input, signal, computed, input, output, TemplateRef, ViewChild, ElementRef, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { classMerge } from '../../utils';
import { ToastSeverity } from './toast.interface';

@Component({
  selector: 'ngt-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html'
})
export class NgtToast implements OnInit, OnDestroy {
  toastId = '';
  
  @Input() set text(value: string | TemplateRef<any> | undefined) {
    this._text.set(value);
  }
  private _text = signal<string | TemplateRef<any> | undefined>(undefined);

  @Input() set severity(value: ToastSeverity) {
    this._severity.set(value || 'info');
  }
  private _severity = signal<ToastSeverity>('info');

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

  @Input() set data(value: any) {
    this._data.set(value);
  }
  private _data = signal<any>(undefined);

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

  toastClasses = computed(() => {
    const baseClasses = 'flex items-start gap-3 p-4 rounded-lg shadow-lg border transition-all duration-300 transform relative pointer-events-auto';
    const severityClasses = {
      success: 'bg-green-50 border-green-200 text-green-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      danger: 'bg-red-50 border-red-200 text-red-800'
    };
    const visibilityClasses = this.isRemoving() 
      ? 'opacity-0 translate-x-full' 
      : this.isVisible() 
        ? 'opacity-100 translate-x-0' 
        : 'opacity-0 -translate-x-full';
    
    const customClass = this.styleClassValue();
    
    return classMerge(
      baseClasses,
      severityClasses[this.severityValue()],
      visibilityClasses,
      customClass || ''
    );
  });

  iconClasses = computed(() => {
    const baseClasses = 'flex-shrink-0';
    const severityClasses = {
      success: 'text-green-600',
      info: 'text-blue-600',
      warning: 'text-yellow-600',
      danger: 'text-red-600'
    };
    return classMerge(baseClasses, severityClasses[this.severityValue()]);
  });

  defaultIcon = computed(() => {
    if (this.iconValue()) {
      return this.iconValue();
    }
    const icons = {
      success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      danger: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
    };
    return icons[this.severityValue()];
  });

  ngOnInit(): void {
    // Trigger entrance animation
    setTimeout(() => {
      this.isVisible.set(true);
    }, 10);
  }

  ngOnDestroy(): void {
    // Cleanup
  }

  close(): void {
    this.isRemoving.set(true);
    setTimeout(() => {
      this.closed.emit();
    }, 300);
  }

  handleClose(): void {
    if (this.closableValue()) {
      this.close();
    }
  }
}

