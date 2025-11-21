import { Component, Input, OnInit, OnDestroy, inject, ViewChild, ElementRef, signal, effect, Signal, WritableSignal, input, output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TrapFocusDirective } from '../../directives';

export type OffcanvasPosition = 'start' | 'end' | 'top' | 'bottom';

@Component({
  selector: 'ngt-offcanvas',
  imports: [TrapFocusDirective],
  templateUrl: './offcanvas.component.html'
})
export class NgtOffCanvas implements OnInit, OnDestroy {
  @Input() set isOpen(value: boolean | WritableSignal<boolean>) {
    if (typeof value === 'boolean') {
      this._isOpen.set(value);
    } else {
      this._isOpen = value;
    }
  }
  private _isOpen: WritableSignal<boolean> = signal(false);
  
  readonly title = input<string>();
  readonly position = input<OffcanvasPosition>('end');
  readonly showHeader = input(true);
  readonly closeOnBackdropClick = input(true);
  readonly backdrop = input(true);
  readonly closed = output<void>();

  @ViewChild('offcanvasContent') offcanvasContent!: ElementRef<HTMLElement>;

  private document = inject(DOCUMENT);
  protected isVisible = signal(false);
  private escapeListener?: (event: KeyboardEvent) => void;
  private effectRef?: ReturnType<typeof effect>;

  get isOpen(): Signal<boolean> {
    return this._isOpen;
  }

  constructor() {
    // effect() must be called in an injection context (constructor)
    this.effectRef = effect(() => {
      if (this.isOpen()) {
        // Prevent body scroll when offcanvas is open
        this.document.body.style.overflow = 'hidden';
        // Trigger animation
        setTimeout(() => this.isVisible.set(true), 10);
      } else {
        this.document.body.style.overflow = '';
        this.isVisible.set(false);
      }
    });
  }

  ngOnInit(): void {
    this.escapeListener = (event: KeyboardEvent) => {
      if (this.isOpen() && event.key === 'Escape') {
        this.handleClose();
      }
    };
    this.document.addEventListener('keydown', this.escapeListener as EventListener);
  }

  ngOnDestroy(): void {
    if (this.escapeListener) {
      this.document.removeEventListener('keydown', this.escapeListener);
    }
    if (this.effectRef) {
      this.effectRef.destroy();
    }
    this.document.body.style.overflow = '';
  }

  onBackdropClick(): void {
    if (this.closeOnBackdropClick()) {
      this.handleClose();
    }
  }

  handleClose(): void {
    this.closed.emit();
  }

  getPositionClasses(): string {
    const position = this.position();
    const isVisible = this.isVisible();

    const baseClasses = 'fixed z-50 bg-white shadow-xl transition-transform duration-300 ease-in-out flex flex-col';
    
    switch (position) {
      case 'start':
        return `${baseClasses} left-0 top-0 bottom-0 h-full ${isVisible ? 'translate-x-0' : '-translate-x-full'}`;
      case 'end':
        return `${baseClasses} right-0 top-0 bottom-0 h-full ${isVisible ? 'translate-x-0' : 'translate-x-full'}`;
      case 'top':
        return `${baseClasses} top-0 left-0 right-0 w-full ${isVisible ? 'translate-y-0' : '-translate-y-full'}`;
      case 'bottom':
        return `${baseClasses} bottom-0 left-0 right-0 w-full ${isVisible ? 'translate-y-0' : 'translate-y-full'}`;
      default:
        return `${baseClasses} right-0 top-0 bottom-0 h-full ${isVisible ? 'translate-x-0' : 'translate-x-full'}`;
    }
  }

  getWidthClasses(): string {
    const position = this.position();
    
    if (position === 'top' || position === 'bottom') {
      return 'w-full';
    }
    
    return 'w-full sm:w-96 md:w-md lg:w-lg';
  }
}

