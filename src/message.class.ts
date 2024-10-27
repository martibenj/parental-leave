import { Item } from './item.interface';

export class Message {
  static generateScheduleMessage(schedule: Item[]): string {
    return schedule.reduce((acc, item, currentIndex, array) => {
      acc += `- ${item.type}: ${this._dateToString(item.startDate)} - ${this._dateToString(item.endDate)} (${item.days} ${item.isBusinessDay ? 'business' : 'calendar'} days)${currentIndex !== array.length - 1 ? '\n' : ''}`;
      return acc;
    }, '');
  }

  static _dateToString(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
