const BANK_DAYS = [
  //
  new Date('2024-11-01'),
  new Date('2024-11-11'),
];

export const addDays = (date: Date, days: number, isBusinessDays: boolean = false): Date => {
  if (isBusinessDays) {
    return addBusinessDays(date, days);
  } else {
    return addCalendarDays(date, days);
  }
};

export const addCalendarDays = (date: Date, days: number): Date => {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + days));
};

export const addBusinessDays = (date: Date, days: number): Date => {
  let newDate = new Date(date.getTime());
  while (days > 0) {
    newDate = addCalendarDays(newDate, 1);
    if (isBusinessDay(newDate)) {
      days--;
    }
  }
  return newDate;
};

const SUNDAY = 0;
const SATURDAY = 6;
export const isBusinessDay = (date: Date): boolean => {
  const day = date.getDay();
  if (day === SUNDAY || day === SATURDAY) {
    return false;
  }

  for (const bankDay of BANK_DAYS) {
    if (
      date.getFullYear() === bankDay.getFullYear() &&
      date.getMonth() === bankDay.getMonth() &&
      date.getDate() === bankDay.getDate()
    ) {
      return false;
    }
  }
  return true;
};
