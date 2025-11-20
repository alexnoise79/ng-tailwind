import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, inject, ViewChild, ElementRef, signal, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TrapFocusDirective } from '../../directives';

@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [TrapFocusDirective],
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() isOpen = signal(false);
  @Input() title?: string;
  @Input() showFooter = false;
  @Input() closeOnBackdropClick = true;
  @Output() close = new EventEmitter<void>();

  @ViewChild('modalContent') modalContent!: ElementRef<HTMLElement>;

  private document = inject(DOCUMENT);
  protected isVisible = signal(false);
  private escapeListener?: (event: KeyboardEvent) => void;

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
    if (this.closeOnBackdropClick) {
      this.handleClose();
    }
  }

  handleClose(): void {
    this.close.emit();
  }
}
