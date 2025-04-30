import { addBusinessDays, addCalendarDays, addDays, isBusinessDay } from './date.method';

describe('addCalendarDays', () => {
  it('should correctly add calendar days', () => {
    const wednesday = new Date('2024-10-09');
    const result = addCalendarDays(wednesday, 5);
    expect(result.toISOString()).toBe(new Date('2024-10-14').toISOString());
  });
});

describe('addBusinessDays', () => {
  it('should skip weekends when adding business days', () => {
    const wednesday = new Date('2024-10-09');
    const result = addBusinessDays(wednesday, 5);
    expect(result.toISOString()).toBe(new Date('2024-10-16').toISOString());
  });

  it('should not count Saturdays and Sundays as business days', () => {
    const friday = new Date('2024-10-04');
    const result = addBusinessDays(friday, 2);
    expect(result.toISOString()).toBe(new Date('2024-10-08').toISOString());
  });
});

describe('addDays', () => {
  it('should add calendar days when isBusinessDay is false', () => {
    const date = new Date('2024-10-09');
    const result = addDays(date, 7, false);
    expect(result.toISOString()).toBe(new Date('2024-10-16').toISOString());
  });

  it('should add business days when isBusinessDay is true', () => {
    const date = new Date('2024-10-09');
    const result = addDays(date, 5, true);
    expect(result.toISOString()).toBe(new Date('2024-10-16').toISOString());
  });
});

describe('isBusinessDay', () => {
  it('should return false for Saturdays', () => {
    const saturday = new Date('2024-10-05');
    expect(isBusinessDay(saturday)).toBe(false);
  });

  it('should return false for Sundays', () => {
    const sunday = new Date('2024-10-06');
    expect(isBusinessDay(sunday)).toBe(false);
  });

  it('should return true for regular weekdays', () => {
    const wednesday = new Date('2024-10-02');
    expect(isBusinessDay(wednesday)).toBe(true);
  });
});
