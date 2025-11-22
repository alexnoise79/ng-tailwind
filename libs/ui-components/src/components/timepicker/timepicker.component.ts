import { Component, Input, signal, computed, input, output, OnInit } from '@angular/core';

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
      this._model.set(parsed);
      this._currentHour.set(parsed.hour);
      this._currentMinute.set(parsed.minute);
      if (parsed.second !== undefined) this._currentSecond.set(parsed.second);
    } else {
      this._model.set(null);
    }
  }
  private _model = signal<NgtTimeStruct | null>(null);

  readonly disabled = input(false);
  readonly showSeconds = input(false);
  readonly meridian = input(false); // 12-hour format with AM/PM

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

  ngOnInit(): void {
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

  updateMeridian(): void {
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

  incrementHour(): void {
    if (this.disabled()) return;
    let newHour = this.currentHour() + 1;
    if (this.meridian()) {
      if (newHour >= 24) newHour = 0;
      if (newHour === 12) {
        this._meridian.set(this.currentMeridian() === 'AM' ? 'PM' : 'AM');
      }
    } else {
      if (newHour >= 24) newHour = 0;
    }
    this._currentHour.set(newHour);
    this.emitTime();
  }

  decrementHour(): void {
    if (this.disabled()) return;
    let newHour = this.currentHour() - 1;
    if (this.meridian()) {
      if (newHour < 0) newHour = 23;
      if (newHour === 11) {
        this._meridian.set(this.currentMeridian() === 'AM' ? 'PM' : 'AM');
      }
    } else {
      if (newHour < 0) newHour = 23;
    }
    this._currentHour.set(newHour);
    this.emitTime();
  }

  incrementMinute(): void {
    if (this.disabled()) return;
    let newMinute = this.currentMinute() + 1;
    if (newMinute >= 60) {
      newMinute = 0;
    }
    this._currentMinute.set(newMinute);
    this.emitTime();
  }

  decrementMinute(): void {
    if (this.disabled()) return;
    let newMinute = this.currentMinute() - 1;
    if (newMinute < 0) {
      newMinute = 59;
    }
    this._currentMinute.set(newMinute);
    this.emitTime();
  }

  incrementSecond(): void {
    if (this.disabled()) return;
    let newSecond = this.currentSecond() + 1;
    if (newSecond >= 60) {
      newSecond = 0;
    }
    this._currentSecond.set(newSecond);
    this.emitTime();
  }

  decrementSecond(): void {
    if (this.disabled()) return;
    let newSecond = this.currentSecond() - 1;
    if (newSecond < 0) {
      newSecond = 59;
    }
    this._currentSecond.set(newSecond);
    this.emitTime();
  }

  onHourChange(event: Event): void {
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

  onMinuteChange(event: Event): void {
    if (this.disabled()) return;
    const target = event.target as HTMLInputElement;
    let value = parseInt(target.value, 10);
    if (isNaN(value)) value = 0;
    if (value > 59) value = 59;
    if (value < 0) value = 0;
    this._currentMinute.set(value);
    this.emitTime();
  }

  onSecondChange(event: Event): void {
    if (this.disabled()) return;
    const target = event.target as HTMLInputElement;
    let value = parseInt(target.value, 10);
    if (isNaN(value)) value = 0;
    if (value > 59) value = 59;
    if (value < 0) value = 0;
    this._currentSecond.set(value);
    this.emitTime();
  }

  toggleMeridian(): void {
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

  private emitTime(): void {
    const time: NgtTimeStruct = {
      hour: this.currentHour(),
      minute: this.currentMinute(),
      second: this.showSeconds() ? this.currentSecond() : undefined
    };
    this._model.set(time);
    this.timeSelect.emit(time);
  }
}

