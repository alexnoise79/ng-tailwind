/// <reference types="vitest/globals" />
import { NgtDatepicker, NgtDateStruct } from './datepicker.component';
import { runInInjectionContext, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

describe('NgtDatepicker', () => {
  let component: NgtDatepicker;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    injector = TestBed.inject(Injector);
    
    component = runInInjectionContext(injector, () => {
      return new NgtDatepicker();
    });
    
    // Mock input signals
    (component as any).disabled = signal(false);
    (component as any).minDate = signal<NgtDateStruct | null>(null);
    (component as any).maxDate = signal<NgtDateStruct | null>(null);
    (component as any).startDate = signal<NgtDateStruct | null>(null);
    (component as any).markDisabled = signal<((date: NgtDateStruct) => boolean) | undefined>(undefined);
    
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should initialize with current month and year', () => {
      const today = new Date();
      expect(component.currentMonth()).toBe(today.getMonth() + 1);
      expect(component.currentYear()).toBe(today.getFullYear());
    });

    it('should initialize with startDate if provided', () => {
      const startDate: NgtDateStruct = { year: 2023, month: 6, day: 15 };
      (component as any).startDate.set(startDate);
      component.ngOnInit();
      
      expect(component.currentMonth()).toBe(6);
      expect(component.currentYear()).toBe(2023);
    });

    it('should initialize with model date if no startDate', () => {
      const modelDate: NgtDateStruct = { year: 2024, month: 3, day: 10 };
      component.model = modelDate;
      component.ngOnInit();
      
      expect(component.currentMonth()).toBe(3);
      expect(component.currentYear()).toBe(2024);
    });
  });

  describe('Calendar generation', () => {
    it('should generate correct number of days for a month', () => {
      (component as any)._currentMonth.set(1); // January
      (component as any)._currentYear.set(2024);
      
      const days = component.calendarDays();
      const actualDays = days.filter(d => d !== null);
      expect(actualDays.length).toBe(31);
    });

    it('should generate correct number of days for February in leap year', () => {
      (component as any)._currentMonth.set(2); // February
      (component as any)._currentYear.set(2024); // Leap year
      
      const days = component.calendarDays();
      const actualDays = days.filter(d => d !== null);
      expect(actualDays.length).toBe(29);
    });

    it('should generate correct number of days for February in non-leap year', () => {
      (component as any)._currentMonth.set(2); // February
      (component as any)._currentYear.set(2023); // Non-leap year
      
      const days = component.calendarDays();
      const actualDays = days.filter(d => d !== null);
      expect(actualDays.length).toBe(28);
    });

    it('should include empty cells for days before first day of month', () => {
      (component as any)._currentMonth.set(1); // January 2024 starts on Monday
      (component as any)._currentYear.set(2024);
      
      const days = component.calendarDays();
      // January 1, 2024 is a Monday (firstDay = 0), so first day should be at index 0
      expect(days[0]).not.toBeNull();
      expect(days[0]).toEqual({ year: 2024, month: 1, day: 1 });
    });

    it('should include empty cells when month starts mid-week', () => {
      (component as any)._currentMonth.set(2); // February 2024 starts on Thursday (firstDay = 3)
      (component as any)._currentYear.set(2024);
      
      const days = component.calendarDays();
      // First 3 cells should be null (Mon, Tue, Wed)
      expect(days[0]).toBeNull();
      expect(days[1]).toBeNull();
      expect(days[2]).toBeNull();
      // Fourth cell should be February 1, 2024
      expect(days[3]).not.toBeNull();
      expect(days[3]).toEqual({ year: 2024, month: 2, day: 1 });
    });
  });

  describe('Date utilities', () => {
    it('should get correct days in month', () => {
      expect(component.getDaysInMonth(1, 2024)).toBe(31); // January
      expect(component.getDaysInMonth(2, 2024)).toBe(29); // February (leap year)
      expect(component.getDaysInMonth(2, 2023)).toBe(28); // February (non-leap year)
      expect(component.getDaysInMonth(4, 2024)).toBe(30); // April
    });

    it('should get correct first day of month', () => {
      // January 1, 2024 is a Monday (0 in our system)
      expect(component.getFirstDayOfMonth(1, 2024)).toBe(0);
    });
  });

  describe('Date selection', () => {
    it('should select a date and emit dateSelect event', () => {
      const date: NgtDateStruct = { year: 2024, month: 6, day: 15 };
      let emittedDate: string | undefined;
      
      component.dateSelect.subscribe((d) => {
        emittedDate = d;
      });
      
      component.selectDate(date);
      
      expect(component.modelValue()).toEqual(date);
      expect(emittedDate).toBeTruthy();
      expect(typeof emittedDate).toBe('string');
    });

    it('should not select disabled date', () => {
      const date: NgtDateStruct = { year: 2024, month: 6, day: 15 };
      (component as any).disabled.set(true);
      
      component.selectDate(date);
      
      expect(component.modelValue()).toBeNull();
    });

    it('should update current month and year when model is set', () => {
      const date: NgtDateStruct = { year: 2024, month: 6, day: 15 };
      component.model = date;
      
      expect(component.currentMonth()).toBe(6);
      expect(component.currentYear()).toBe(2024);
      expect(component.modelValue()).toEqual(date);
    });
  });

  describe('isSelected', () => {
    it('should return true for selected date', () => {
      const date: NgtDateStruct = { year: 2024, month: 6, day: 15 };
      component.model = date;
      
      expect(component.isSelected(date)).toBe(true);
    });

    it('should return false for non-selected date', () => {
      const selectedDate: NgtDateStruct = { year: 2024, month: 6, day: 15 };
      const otherDate: NgtDateStruct = { year: 2024, month: 6, day: 16 };
      component.model = selectedDate;
      
      expect(component.isSelected(otherDate)).toBe(false);
    });

    it('should return false for null date', () => {
      expect(component.isSelected(null)).toBe(false);
    });

    it('should return false when no model is set', () => {
      const date: NgtDateStruct = { year: 2024, month: 6, day: 15 };
      expect(component.isSelected(date)).toBe(false);
    });
  });

  describe('isToday', () => {
    it('should return true for today\'s date', () => {
      const today = new Date();
      const todayStruct: NgtDateStruct = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
      };
      
      expect(component.isToday(todayStruct)).toBe(true);
    });

    it('should return false for other dates', () => {
      const date: NgtDateStruct = { year: 2024, month: 6, day: 15 };
      expect(component.isToday(date)).toBe(false);
    });

    it('should return false for null date', () => {
      expect(component.isToday(null)).toBe(false);
    });
  });

  describe('isDisabled', () => {
    it('should return true when component is disabled', () => {
      (component as any).disabled.set(true);
      const date: NgtDateStruct = { year: 2024, month: 6, day: 15 };
      
      expect(component.isDisabled(date)).toBe(true);
    });

    it('should return true for date before minDate', () => {
      const minDate: NgtDateStruct = { year: 2024, month: 6, day: 10 };
      const date: NgtDateStruct = { year: 2024, month: 6, day: 5 };
      (component as any).minDate.set(minDate);
      
      expect(component.isDisabled(date)).toBe(true);
    });

    it('should return false for date equal to minDate', () => {
      const minDate: NgtDateStruct = { year: 2024, month: 6, day: 10 };
      (component as any).minDate.set(minDate);
      
      expect(component.isDisabled(minDate)).toBe(false);
    });

    it('should return true for date after maxDate', () => {
      const maxDate: NgtDateStruct = { year: 2024, month: 6, day: 20 };
      const date: NgtDateStruct = { year: 2024, month: 6, day: 25 };
      (component as any).maxDate.set(maxDate);
      
      expect(component.isDisabled(date)).toBe(true);
    });

    it('should return false for date equal to maxDate', () => {
      const maxDate: NgtDateStruct = { year: 2024, month: 6, day: 20 };
      (component as any).maxDate.set(maxDate);
      
      expect(component.isDisabled(maxDate)).toBe(false);
    });

    it('should use markDisabled function when provided', () => {
      const date: NgtDateStruct = { year: 2024, month: 6, day: 15 };
      const markDisabledFn = (d: NgtDateStruct) => d.day === 15;
      (component as any).markDisabled.set(markDisabledFn);
      
      expect(component.isDisabled(date)).toBe(true);
      
      const otherDate: NgtDateStruct = { year: 2024, month: 6, day: 16 };
      expect(component.isDisabled(otherDate)).toBe(false);
    });

    it('should return false for valid date with no constraints', () => {
      const date: NgtDateStruct = { year: 2024, month: 6, day: 15 };
      expect(component.isDisabled(date)).toBe(false);
    });

    it('should return true for null date', () => {
      expect(component.isDisabled(null)).toBe(true);
    });
  });

  describe('Navigation - Month', () => {
    it('should navigate to previous month', () => {
      (component as any)._currentMonth.set(6);
      (component as any)._currentYear.set(2024);
      
      let navigationEvent: any;
      component.navigate.subscribe((event) => {
        navigationEvent = event;
      });
      
      component.previousMonth();
      
      expect(component.currentMonth()).toBe(5);
      expect(component.currentYear()).toBe(2024);
      expect(navigationEvent).toEqual({
        current: { year: 2024, month: 5 },
        prev: { year: 2024, month: 6 }
      });
    });

    it('should navigate to previous year when at January', () => {
      (component as any)._currentMonth.set(1);
      (component as any)._currentYear.set(2024);
      
      component.previousMonth();
      
      expect(component.currentMonth()).toBe(12);
      expect(component.currentYear()).toBe(2023);
    });

    it('should navigate to next month', () => {
      (component as any)._currentMonth.set(6);
      (component as any)._currentYear.set(2024);
      
      let navigationEvent: any;
      component.navigate.subscribe((event) => {
        navigationEvent = event;
      });
      
      component.nextMonth();
      
      expect(component.currentMonth()).toBe(7);
      expect(component.currentYear()).toBe(2024);
      expect(navigationEvent).toEqual({
        current: { year: 2024, month: 7 },
        prev: { year: 2024, month: 6 }
      });
    });

    it('should navigate to next year when at December', () => {
      (component as any)._currentMonth.set(12);
      (component as any)._currentYear.set(2024);
      
      component.nextMonth();
      
      expect(component.currentMonth()).toBe(1);
      expect(component.currentYear()).toBe(2025);
    });
  });

  describe('Navigation - Year', () => {
    it('should navigate to previous year', () => {
      (component as any)._currentMonth.set(6);
      (component as any)._currentYear.set(2024);
      
      let navigationEvent: any;
      component.navigate.subscribe((event) => {
        navigationEvent = event;
      });
      
      component.previousYear();
      
      expect(component.currentYear()).toBe(2023);
      expect(component.currentMonth()).toBe(6);
      expect(navigationEvent).toEqual({
        current: { year: 2023, month: 6 },
        prev: { year: 2024, month: 6 }
      });
    });

    it('should navigate to next year', () => {
      (component as any)._currentMonth.set(6);
      (component as any)._currentYear.set(2024);
      
      let navigationEvent: any;
      component.navigate.subscribe((event) => {
        navigationEvent = event;
      });
      
      component.nextYear();
      
      expect(component.currentYear()).toBe(2025);
      expect(component.currentMonth()).toBe(6);
      expect(navigationEvent).toEqual({
        current: { year: 2025, month: 6 },
        prev: { year: 2024, month: 6 }
      });
    });
  });

  describe('Model input', () => {
    it('should set model to null when null is provided', () => {
      component.model = { year: 2024, month: 6, day: 15 };
      expect(component.modelValue()).not.toBeNull();
      
      component.model = null;
      expect(component.modelValue()).toBeNull();
    });

    it('should set model to null when undefined is provided', () => {
      component.model = { year: 2024, month: 6, day: 15 };
      expect(component.modelValue()).not.toBeNull();
      
      component.model = undefined;
      expect(component.modelValue()).toBeNull();
    });
  });

  describe('Month and day names', () => {
    it('should have correct month names', () => {
      expect(component.monthNames.length).toBe(12);
      expect(component.monthNames[0]).toBe('January');
      expect(component.monthNames[11]).toBe('December');
    });

    it('should have correct day names', () => {
      expect(component.dayNames.length).toBe(7);
      expect(component.dayNames[0]).toBe('Mon');
      expect(component.dayNames[6]).toBe('Sun');
    });
  });
});
