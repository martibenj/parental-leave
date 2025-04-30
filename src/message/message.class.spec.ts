import { Item } from '../interfaces/item.interface';
import { Message } from './message.class';

describe('Message', () => {
  describe('generateMessage', () => {
    it('should generate a formatted message for a given schedule', () => {
      const schedule: Item[] = [
        {
          type: 'Birth Leave',
          startDate: new Date('2024-10-09'),
          endDate: new Date('2024-10-11'),
          days: 3,
          isBusinessDay: true,
        },
        {
          type: 'Parental Leave',
          startDate: new Date('2024-10-12'),
          endDate: new Date('2024-10-21'),
          days: 10,
          isBusinessDay: false,
        },
      ];

      const result = Message.generateScheduleMessage(schedule);
      const expectedMessage =
        `- Birth Leave: Oct 09, 2024 - Oct 11, 2024 (3 business days)\n` +
        `- Parental Leave: Oct 12, 2024 - Oct 21, 2024 (10 calendar days)`;

      expect(result).toBe(expectedMessage);
    });

    it('should not add a newline after the last schedule item', () => {
      const schedule: Item[] = [
        {
          type: 'Back to Work',
          startDate: new Date('2025-02-03'),
          endDate: new Date('2025-02-03'),
          days: 1,
          isBusinessDay: true,
        },
      ];

      const result = Message.generateScheduleMessage(schedule);
      const expectedMessage = `- Back to Work: Feb 03, 2025 - Feb 03, 2025 (1 business days)`;

      expect(result).toBe(expectedMessage);
    });

    it('should generate an empty string if the schedule is empty', () => {
      const schedule: Item[] = [];

      const result = Message.generateScheduleMessage(schedule);
      expect(result).toBe('');
    });
  });
});
