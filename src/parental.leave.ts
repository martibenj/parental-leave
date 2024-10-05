import { addDays } from './date.method';
import { Item } from './item.interface';

const TOTAL_PARENTAL_LEAVE_FR = 25;
const AFTER_BIRTH_PARENTAL_LEAVE = 4;
const REMAINING_AFTER_BIRTH_PARENTAL_LEAVE = TOTAL_PARENTAL_LEAVE_FR - AFTER_BIRTH_PARENTAL_LEAVE;

export class ParentalLeave {
  static generateVacationSchedule(
    birthDate: Date,
    vacationDays: number,
    nbDaysParentalLeaveFirstSplit: number
  ): Item[] {
    return [
      {
        type: 'Birth Leave FR',
        days: 3,
        isBusinessDay: true,
      },
      {
        type: 'Mandatory Parental Leave FR',
        days: AFTER_BIRTH_PARENTAL_LEAVE,
      },
      {
        type: 'Parental Leave FR',
        days: nbDaysParentalLeaveFirstSplit,
      },
      {
        type: 'Back to work',
        days: 21,
      },
      {
        type: 'Vacations',
        days: vacationDays,
        isBusinessDay: true,
      },
      {
        type: 'Parental Leave FR',
        days: REMAINING_AFTER_BIRTH_PARENTAL_LEAVE - nbDaysParentalLeaveFirstSplit,
      },
      {
        type: "General Parental Leave Moody's",
        days: 51,
      },
    ].reduce<Item[]>((acc, { type, days, isBusinessDay }) => {
      acc.push(this._toItem(acc[acc.length - 1], type, days, isBusinessDay, birthDate));
      return acc;
    }, []);
  }

  private static _toItem(
    previousItem: Item | undefined,
    type: string,
    days: number,
    isBusinessDays: boolean = false,
    defaultDate: Date
  ): Item {
    const startDate = previousItem?.endDate ? addDays(previousItem.endDate, 1, isBusinessDays) : defaultDate;
    const endDate = addDays(startDate, days - 1, isBusinessDays);

    return {
      type,
      days,
      isBusinessDays,
      startDate,
      endDate,
    };
  }
}
