const SUNDAY = 0;
const SATURDAY = 6;

const BANK_DAYS = [
  //
  new Date('2024-11-01'),
  new Date('2024-11-11'),
];

export const addDays = (date: Date, days: number, isBusinessDay: boolean = false): Date => {
  if (isBusinessDay) {
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

export const isBusinessDay = (date: Date): boolean => {
  const day = date.getDay();
  if (day === SUNDAY || day === SATURDAY) {
    return false;
  }

  for (const bankDay of BANK_DAYS) {
    if (isSameDay(date, bankDay)) {
      return false;
    }
  }
  return true;
};

export const isSameDay = (date1?: Date, date2?: Date): boolean => {
  if (!date1 || !date2) {
    return false;
  }

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
