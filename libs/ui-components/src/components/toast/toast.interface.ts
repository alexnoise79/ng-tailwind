import { TemplateRef } from '@angular/core';

export type ToastSeverity = 'success' | 'info' | 'warning' | 'danger';

export interface NgtToastMessage {
  text?: string | TemplateRef<any>;
  severity?: ToastSeverity;
  summary?: string;
  detail?: string;
  delay?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: any;
  icon?: string;
  styleClass?: string;
  closeIcon?: string;
}

