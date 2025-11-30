import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgtProgressbarConfig {
  animated = false;
  ariaLabel = 'progress bar';
  height?: string;
  max = 100;
  showValue = false;
  striped = false;
  textType?: string;
  type?: string;
}
