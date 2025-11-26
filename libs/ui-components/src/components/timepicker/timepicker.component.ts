import { Component, Input, signal, computed, input, output, OnInit } from '@angular/core';
import { Size } from '../../models';

export interface NgtTimeStruct {
  hour: number;
  minute: number;
  second?: number;
}

export type TimeInput = string | Date | NgtTimeStruct | null | undefined;

@Component({
  selector: 'ngt-timepicker',
  templateUrl: './timepicker.component.html'
})
export class NgtTimepicker implements OnInit {
  @Input() set model(value: TimeInput) {
    const parsed = this.parseTimeInput(value);
    if (parsed) {
      // Only update if the values actually changed to avoid circular updates
      const currentModel = this._model();
      const hasChanged = !currentModel || currentModel.hour !== parsed.hour || currentModel.minute !== parsed.minute || (currentModel.second ?? undefined) !== (parsed.second ?? undefined);

      if (hasChanged) {
        this._model.set(parsed);
        this._currentHour.set(parsed.hour);
        this._currentMinute.set(parsed.minute);
        if (parsed.second !== undefined) {
          this._currentSecond.set(parsed.second);
        }
      }
    } else {
      if (this._model() !== null) {
        this._model.set(null);
      }
    }
  }
  private _model = signal<NgtTimeStruct | null>(null);

  readonly disabled = input(false);
  readonly showSeconds = input(false);
  readonly meridian = input(false); // 12-hour format with AM/PM
  readonly size = input<Size>('md');
  readonly hourStep = input(1);
  readonly minuteStep = input(1);
  readonly secondStep = input(1);

  readonly timeSelect = output<NgtTimeStruct>();

  private _currentHour = signal(new Date().getHours());
  private _currentMinute = signal(new Date().getMinutes());
  private _currentSecond = signal(new Date().getSeconds());
  private _meridian = signal<'AM' | 'PM'>('AM');

  modelValue = computed(() => this._model());
  currentHour = computed(() => this._currentHour());
  currentMinute = computed(() => this._currentMinute());
  currentSecond = computed(() => this._currentSecond());
  currentMeridian = computed(() => this._meridian());

  ngOnInit() {
    if (this.modelValue()) {
      const model = this.modelValue()!;
      this._currentHour.set(model.hour);
      this._currentMinute.set(model.minute);
      if (model.second !== undefined) this._currentSecond.set(model.second);
    }
    this.updateMeridian();
  }

  parseTimeInput(value: TimeInput): NgtTimeStruct | null {
    if (!value) return null;

    // If it's already a NgtTimeStruct
    if (typeof value === 'object' && 'hour' in value && 'minute' in value) {
      return value as NgtTimeStruct;
    }

    // If it's a Date object
    if (value instanceof Date) {
      return {
        hour: value.getHours(),
        minute: value.getMinutes(),
        second: value.getSeconds()
      };
    }

    // If it's a string, try to parse it (HH:mm:ss or HH:mm)
    if (typeof value === 'string') {
      const parts = value.split(':');
      if (parts.length >= 2) {
        const hour = parseInt(parts[0], 10);
        const minute = parseInt(parts[1], 10);
        const second = parts.length >= 3 ? parseInt(parts[2], 10) : undefined;
        if (!isNaN(hour) && !isNaN(minute)) {
          return { hour, minute, second };
        }
      }
    }

    return null;
  }

  updateMeridian() {
    if (this.meridian()) {
      const hour = this.currentHour();
      this._meridian.set(hour >= 12 ? 'PM' : 'AM');
    }
  }

  getDisplayHour(): number {
    if (!this.meridian()) {
      return this.currentHour();
    }
    const hour = this.currentHour();
    if (hour === 0) return 12;
    if (hour > 12) return hour - 12;
    return hour;
  }

  incrementHour() {
    if (this.disabled()) return;
    const step = this.hourStep();
    let newHour = this.currentHour() + step;
    if (this.meridian()) {
      if (newHour >= 24) {
        newHour = newHour % 24;
      }
      // Check if we cross the 12 boundary
      const currentHour = this.currentHour();
      if (currentHour < 12 && newHour >= 12) {
        this._meridian.set(this.currentMeridian() === 'AM' ? 'PM' : 'AM');
      } else if (currentHour >= 12 && newHour < 12) {
        this._meridian.set(this.currentMeridian() === 'AM' ? 'PM' : 'AM');
      }
    } else {
      if (newHour >= 24) {
        newHour = newHour % 24;
      }
    }
    this._currentHour.set(newHour);
    this.emitTime();
  }

  decrementHour() {
    if (this.disabled()) return;
    const step = this.hourStep();
    let newHour = this.currentHour() - step;
    if (this.meridian()) {
      if (newHour < 0) {
        newHour = 24 + (newHour % 24);
        if (newHour === 24) newHour = 0;
      }
      // Check if we cross the 12 boundary
      const currentHour = this.currentHour();
      if (currentHour >= 12 && newHour < 12) {
        this._meridian.set(this.currentMeridian() === 'AM' ? 'PM' : 'AM');
      } else if (currentHour < 12 && newHour >= 12) {
        this._meridian.set(this.currentMeridian() === 'AM' ? 'PM' : 'AM');
      }
    } else {
      if (newHour < 0) {
        newHour = 24 + (newHour % 24);
        if (newHour === 24) newHour = 0;
      }
    }
    this._currentHour.set(newHour);
    this.emitTime();
  }

  incrementMinute() {
    if (this.disabled()) return;
    const step = this.minuteStep();
    let newMinute = this.currentMinute() + step;
    if (newMinute >= 60) {
      newMinute = newMinute % 60;
    }
    this._currentMinute.set(newMinute);
    this.emitTime();
  }

  decrementMinute() {
    if (this.disabled()) return;
    const step = this.minuteStep();
    let newMinute = this.currentMinute() - step;
    if (newMinute < 0) {
      newMinute = 60 + (newMinute % 60);
      if (newMinute === 60) newMinute = 0;
    }
    this._currentMinute.set(newMinute);
    this.emitTime();
  }

  incrementSecond() {
    if (this.disabled()) return;
    const step = this.secondStep();
    let newSecond = this.currentSecond() + step;
    if (newSecond >= 60) {
      newSecond = newSecond % 60;
    }
    this._currentSecond.set(newSecond);
    this.emitTime();
  }

  decrementSecond() {
    if (this.disabled()) return;
    const step = this.secondStep();
    let newSecond = this.currentSecond() - step;
    if (newSecond < 0) {
      newSecond = 60 + (newSecond % 60);
      if (newSecond === 60) newSecond = 0;
    }
    this._currentSecond.set(newSecond);
    this.emitTime();
  }

  onHourChange(event: Event) {
    if (this.disabled()) return;
    const target = event.target as HTMLInputElement;
    let value = parseInt(target.value, 10);
    if (isNaN(value)) value = 0;

    if (this.meridian()) {
      const meridian = this.currentMeridian();
      if (value > 12) value = 12;
      if (value < 1) value = 1;
      let hour24 = value;
      if (meridian === 'PM' && value !== 12) hour24 = value + 12;
      if (meridian === 'AM' && value === 12) hour24 = 0;
      this._currentHour.set(hour24);
    } else {
      if (value > 23) value = 23;
      if (value < 0) value = 0;
      this._currentHour.set(value);
    }
    this.updateMeridian();
    this.emitTime();
  }

  onMinuteChange(event: Event) {
    if (this.disabled()) return;
    const target = event.target as HTMLInputElement;
    let value = parseInt(target.value, 10);
    if (isNaN(value)) value = 0;
    if (value > 59) value = 59;
    if (value < 0) value = 0;
    this._currentMinute.set(value);
    this.emitTime();
  }

  onSecondChange(event: Event) {
    if (this.disabled()) return;
    const target = event.target as HTMLInputElement;
    let value = parseInt(target.value, 10);
    if (isNaN(value)) value = 0;
    if (value > 59) value = 59;
    if (value < 0) value = 0;
    this._currentSecond.set(value);
    this.emitTime();
  }

  toggleMeridian() {
    if (this.disabled()) return;
    const newMeridian = this.currentMeridian() === 'AM' ? 'PM' : 'AM';
    this._meridian.set(newMeridian);

    let hour = this.currentHour();
    if (newMeridian === 'PM' && hour < 12) {
      hour = hour + 12;
    } else if (newMeridian === 'AM' && hour >= 12) {
      hour = hour - 12;
    }
    this._currentHour.set(hour);
    this.emitTime();
  }

  formatTimeValue(value: number): string {
    return String(value).padStart(2, '0');
  }

  // Size-based classes
  inputClasses = computed(() => {
    const sizeClasses = {
      sm: 'w-10 px-1.5 py-0.5 text-xs',
      md: 'w-12 px-2 py-1 text-sm',
      lg: 'w-14 px-2.5 py-1.5 text-sm'
    };
    const base =
      'text-center font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]';
    return `${base} ${sizeClasses[this.size()]}`;
  });

  buttonClasses = computed(() => {
    const sizeClasses = {
      sm: 'p-0.5',
      md: 'p-1',
      lg: 'p-1.5'
    };
    const base = 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed';
    return `${base} ${sizeClasses[this.size()]}`;
  });

  iconClasses = computed(() => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    };
    return sizeClasses[this.size()];
  });

  separatorClasses = computed(() => {
    const sizeClasses = {
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-xl'
    };
    return `font-semibold text-gray-700 dark:text-gray-300 ${sizeClasses[this.size()]}`;
  });

  meridianButtonClasses = computed(() => {
    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-sm'
    };
    const base = 'font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors';
    return `${base} ${sizeClasses[this.size()]}`;
  });

  private emitTime() {
    const time: NgtTimeStruct = {
      hour: this.currentHour(),
      minute: this.currentMinute(),
      second: this.showSeconds() ? this.currentSecond() : undefined
    };
    this._model.set(time);
    this.timeSelect.emit(time);
  }
}
