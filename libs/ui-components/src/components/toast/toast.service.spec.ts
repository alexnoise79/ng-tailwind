/// <reference types="vitest/globals" />
import { NgtToastService } from './toast.service';
import { ViewContainerRef, ComponentRef } from '@angular/core';
import { NgtToast } from './toast.component';
import { NgtToastMessage } from './toast.interface';

describe('NgtToastService', () => {
  let service: NgtToastService;
  let mockViewContainerRef: Partial<ViewContainerRef>;
  let mockComponentRef: Partial<ComponentRef<NgtToast>>;

  beforeEach(() => {
    vi.useFakeTimers();
    service = new NgtToastService();
    
    mockComponentRef = {
      instance: {
        toastId: '',
        text: '',
        severity: 'info',
        closed: {
          subscribe: vi.fn((callback) => {
            return { unsubscribe: vi.fn() };
          })
        } as any,
        close: vi.fn()
      } as Partial<NgtToast> as NgtToast,
      destroy: vi.fn()
    };

    mockViewContainerRef = {
      createComponent: vi.fn(() => mockComponentRef as ComponentRef<NgtToast>)
    };

    service.setContainer(mockViewContainerRef as ViewContainerRef);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('show', () => {
    it('should create and show toast', () => {
      const message: NgtToastMessage = {
        text: 'Test message',
        severity: 'info'
      };
      
      const toastId = service.show(message);
      
      expect(toastId).toBeTruthy();
      expect(mockViewContainerRef.createComponent).toHaveBeenCalledWith(NgtToast);
    });

    it('should auto-remove toast after delay', () => {
      const message: NgtToastMessage = {
        text: 'Test message',
        severity: 'info',
        delay: 3000
      };
      
      service.show(message);
      vi.advanceTimersByTime(3000);
      
      // The service calls remove which calls close then destroy after 300ms
      vi.advanceTimersByTime(300);
      expect(mockComponentRef.destroy).toHaveBeenCalled();
    });

    it('should not auto-remove sticky toast', () => {
      const message: NgtToastMessage = {
        text: 'Test message',
        severity: 'info',
        sticky: true
      };
      
      service.show(message);
      vi.advanceTimersByTime(3000);
      
      expect(mockComponentRef.destroy).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove toast by id', () => {
      const message: NgtToastMessage = {
        text: 'Test message',
        severity: 'info'
      };
      
      const toastId = service.show(message);
      service.remove(toastId);
      vi.advanceTimersByTime(300);
      
      expect(mockComponentRef.instance?.close).toHaveBeenCalled();
    });
  });

  describe('clear', () => {
    it('should clear all toasts', () => {
      service.show({ text: 'Toast 1', severity: 'info' });
      service.show({ text: 'Toast 2', severity: 'info' });
      
      service.clear();
      vi.advanceTimersByTime(300);
      
      expect(mockComponentRef.instance?.close).toHaveBeenCalled();
    });
  });
});

