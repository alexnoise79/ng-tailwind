import { Component, Input, OnInit, OnDestroy, inject, ViewChild, ElementRef, signal, effect, Signal, WritableSignal, input, output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TrapFocusDirective } from '../../directives';

@Component({
  selector: 'ngt-modal',
  imports: [TrapFocusDirective],
  templateUrl: './modal.component.html'
})
export class NgtModal implements OnInit, OnDestroy {
  @Input() set isOpen(value: boolean | WritableSignal<boolean>) {
    if (typeof value === 'boolean') {
      this._isOpen.set(value);
    } else {
      this._isOpen = value;
    }
  }
  private _isOpen: WritableSignal<boolean> = signal(false);
  
  readonly title = input<string>();
  readonly showFooter = input(false);
  readonly closeOnBackdropClick = input(true);
  readonly closed = output<void>();

  @ViewChild('modalContent') modalContent!: ElementRef<HTMLElement>;

  private document = inject(DOCUMENT);
  protected isVisible = signal(false);
  private escapeListener?: (event: KeyboardEvent) => void;

  get isOpen(): Signal<boolean> {
    return this._isOpen;
  }

  ngOnInit(): void {
    this.escapeListener = (event: KeyboardEvent) => {
      if (this.isOpen() && event.key === 'Escape') {
        this.handleClose();
      }
    };
    this.document.addEventListener('keydown', this.escapeListener as EventListener);

    effect(() => {
      if (this.isOpen()) {
        // Prevent body scroll when modal is open
        this.document.body.style.overflow = 'hidden';
        // Trigger animation
        setTimeout(() => this.isVisible.set(true), 10);
      } else {
        this.document.body.style.overflow = '';
        this.isVisible.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.escapeListener) {
      this.document.removeEventListener('keydown', this.escapeListener);
    }
    this.document.body.style.overflow = '';
  }

  onBackdropClick(): void {
    if (this.closeOnBackdropClick()) {
      this.handleClose();
    }
  }

  handleClose(): void {
    // TODO: The 'emit' function requires a mandatory void argument
    this.closed.emit();
  }
}
