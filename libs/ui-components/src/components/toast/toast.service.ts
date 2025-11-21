import { Injectable, ComponentRef, ViewContainerRef } from '@angular/core';
import { NgtToast } from './toast.component';
import { NgtToastMessage } from './toast.interface';

@Injectable({
  providedIn: 'root'
})
export class NgtToastService {
  private containerRef: ViewContainerRef | null = null;
  private toasts: Map<string, ComponentRef<NgtToast>> = new Map();
  private toastCounter = 0;

  setContainer(containerRef: ViewContainerRef): void {
    this.containerRef = containerRef;
  }

  show(message: NgtToastMessage): string {
    const toastId = `toast-${++this.toastCounter}`;

    if (!this.containerRef) {
      console.warn('Toast container not set. Please add <ngt-toast-container></ngt-toast-container> to your app component.');
      return toastId;
    }

    const toastRef = this.containerRef.createComponent(NgtToast);

    // Calculate delay with default
    const delay = message.delay ?? 3000;
    const sticky = message.sticky ?? false;

    // Set all properties
    toastRef.instance.toastId = toastId;
    toastRef.instance.text = message.text;
    toastRef.instance.severity = message.severity || 'info';
    toastRef.instance.summary = message.summary;
    toastRef.instance.detail = message.detail;
    toastRef.instance.delay = delay;
    toastRef.instance.sticky = sticky;
    toastRef.instance.closable = message.closable ?? true;
    toastRef.instance.data = message.data;
    toastRef.instance.icon = message.icon;
    toastRef.instance.styleClass = message.styleClass;
    toastRef.instance.closeIcon = message.closeIcon;

    // Handle close event
    toastRef.instance.closed.subscribe(() => {
      this.remove(toastId);
    });

    this.toasts.set(toastId, toastRef);

    // Auto remove if not sticky and delay is greater than 0
    if (!sticky && delay > 0) {
      setTimeout(() => {
        this.remove(toastId);
      }, delay);
    }

    return toastId;
  }

  remove(toastId: string): void {
    const toastRef = this.toasts.get(toastId);
    if (toastRef) {
      toastRef.instance.close();
      setTimeout(() => {
        toastRef.destroy();
        this.toasts.delete(toastId);
      }, 300); // Wait for animation
    }
  }

  clear(): void {
    this.toasts.forEach((_, toastId) => {
      this.remove(toastId);
    });
  }
}
