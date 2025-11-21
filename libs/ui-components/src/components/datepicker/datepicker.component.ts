import { Component, Input, signal, computed, input, output, OnInit } from '@angular/core';
import { classMerge } from '../../utils';

export interface NgtDateStruct {
  year: number;
  month: number;
  day: number;
}

@Component({
  selector: 'ngt-datepicker',
  templateUrl: './datepicker.component.html'
})
export class NgtDatepicker implements OnInit {
  @Input() set model(value: NgtDateStruct | null | undefined) {
    if (value) {
      this._model.set(value);
      this._currentMonth.set(value.month);
      this._currentYear.set(value.year);
    } else {
      this._model.set(null);
    }
  }
  private _model = signal<NgtDateStruct | null>(null);

  readonly disabled = input(false);
  readonly minDate = input<NgtDateStruct | null>(null);
  readonly maxDate = input<NgtDateStruct | null>(null);
  readonly startDate = input<NgtDateStruct | null>(null);
  readonly markDisabled = input<((date: NgtDateStruct) => boolean) | undefined>(undefined);

  readonly dateSelect = output<NgtDateStruct>();
  readonly navigate = output<{ current: { year: number; month: number }; prev: { year: number; month: number } }>();

  private _currentMonth = signal(new Date().getMonth() + 1);
  private _currentYear = signal(new Date().getFullYear());

  modelValue = computed(() => this._model());
  currentMonth = computed(() => this._currentMonth());
  currentYear = computed(() => this._currentYear());

  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  ngOnInit(): void {
    if (this.startDate()) {
      this._currentMonth.set(this.startDate()!.month);
      this._currentYear.set(this.startDate()!.year);
    } else if (this.modelValue()) {
      this._currentMonth.set(this.modelValue()!.month);
      this._currentYear.set(this.modelValue()!.year);
    }
  }

  getDaysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }

  getFirstDayOfMonth(month: number, year: number): number {
    const firstDay = new Date(year, month - 1, 1).getDay();
    // Convert Sunday (0) to 7, and shift Monday to 0
    return firstDay === 0 ? 6 : firstDay - 1;
  }

  calendarDays = computed(() => {
    const month = this.currentMonth();
    const year = this.currentYear();
    const daysInMonth = this.getDaysInMonth(month, year);
    const firstDay = this.getFirstDayOfMonth(month, year);
    const days: (NgtDateStruct | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ year, month, day });
    }

    return days;
  });

  isSelected(date: NgtDateStruct | null): boolean {
    if (!date || !this.modelValue()) return false;
    const model = this.modelValue()!;
    return date.year === model.year && date.month === model.month && date.day === model.day;
  }

  isToday(date: NgtDateStruct | null): boolean {
    if (!date) return false;
    const today = new Date();
    return date.year === today.getFullYear() && date.month === today.getMonth() + 1 && date.day === today.getDate();
  }

  isDisabled(date: NgtDateStruct | null): boolean {
    if (!date || this.disabled()) return true;

    // Check minDate
    if (this.minDate()) {
      const min = this.minDate()!;
      const dateValue = new Date(date.year, date.month - 1, date.day);
      const minValue = new Date(min.year, min.month - 1, min.day);
      if (dateValue < minValue) return true;
    }

    // Check maxDate
    if (this.maxDate()) {
      const max = this.maxDate()!;
      const dateValue = new Date(date.year, date.month - 1, date.day);
      const maxValue = new Date(max.year, max.month - 1, max.day);
      if (dateValue > maxValue) return true;
    }

    // Check custom markDisabled function
    const markDisabledFn = this.markDisabled();
    if (markDisabledFn) {
      const result = markDisabledFn(date);
      if (result === true) return true;
    }

    return false;
  }

  selectDate(date: NgtDateStruct): void {
    if (this.isDisabled(date)) return;

    this._model.set(date);
    this.dateSelect.emit(date);
  }

  previousMonth(): void {
    const prevMonth = this.currentMonth();
    const prevYear = this.currentYear();

    if (this.currentMonth() === 1) {
      this._currentMonth.set(12);
      this._currentYear.set(this.currentYear() - 1);
    } else {
      this._currentMonth.set(this.currentMonth() - 1);
    }

    this.navigate.emit({
      current: { year: this.currentYear(), month: this.currentMonth() },
      prev: { year: prevYear, month: prevMonth }
    });
  }

  nextMonth(): void {
    const prevMonth = this.currentMonth();
    const prevYear = this.currentYear();

    if (this.currentMonth() === 12) {
      this._currentMonth.set(1);
      this._currentYear.set(this.currentYear() + 1);
    } else {
      this._currentMonth.set(this.currentMonth() + 1);
    }

    this.navigate.emit({
      current: { year: this.currentYear(), month: this.currentMonth() },
      prev: { year: prevYear, month: prevMonth }
    });
  }

  previousYear(): void {
    const prevMonth = this.currentMonth();
    const prevYear = this.currentYear();
    this._currentYear.set(this.currentYear() - 1);

    this.navigate.emit({
      current: { year: this.currentYear(), month: this.currentMonth() },
      prev: { year: prevYear, month: prevMonth }
    });
  }

  nextYear(): void {
    const prevMonth = this.currentMonth();
    const prevYear = this.currentYear();
    this._currentYear.set(this.currentYear() + 1);

    this.navigate.emit({
      current: { year: this.currentYear(), month: this.currentMonth() },
      prev: { year: prevYear, month: prevMonth }
    });
  }

  getDateClasses(date: NgtDateStruct | null): string {
    if (!date) return '';

    const base = 'w-10 h-10 flex items-center justify-center text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1';

    if (this.isDisabled(date)) {
      return classMerge(base, 'text-gray-300 dark:text-gray-600 cursor-not-allowed');
    }

    if (this.isSelected(date)) {
      return classMerge(base, 'bg-primary-600 text-white font-semibold hover:bg-primary-700');
    }

    if (this.isToday(date)) {
      return classMerge(base, 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold hover:bg-primary-100 dark:hover:bg-primary-900/50');
    }

    return classMerge(base, 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700');
  }
}
