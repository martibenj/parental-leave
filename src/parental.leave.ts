import { addDays } from './date.method';
import { Item, RawItem } from './item.interface';

export class ParentalLeave {
  static generateVacationSchedule(birthDate: Date, planning: RawItem[]): Item[] {
    return planning.reduce<Item[]>((acc, { type, days, isBusinessDay }) => {
      acc.push(this._toItem(acc[acc.length - 1], type, days, isBusinessDay, birthDate));
      return acc;
    }, []);
  }

  private static _toItem(
    previousItem: Item | undefined,
    type: string,
    days: number,
    isBusinessDay: boolean = false,
    defaultDate: Date
  ): Item {
    const startDate = previousItem?.endDate ? addDays(previousItem.endDate, 1, isBusinessDay) : defaultDate;
    const endDate = addDays(startDate, days - 1, isBusinessDay);

    return {
      type,
      days,
      isBusinessDay,
      startDate,
      endDate,
    };
  }
}
