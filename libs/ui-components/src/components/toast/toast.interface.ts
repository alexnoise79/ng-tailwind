import { TemplateRef } from '@angular/core';
import { Variant } from '../../models';

export interface NgtToastMessage {
  text?: string | TemplateRef<unknown>;
  severity?: Variant;
  summary?: string;
  detail?: string;
  delay?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: unknown;
  icon?: string;
  styleClass?: string;
  closeIcon?: string;
}
