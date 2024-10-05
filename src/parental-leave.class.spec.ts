import { Item } from './item.interface';
import { ParentalLeave } from './parental.leave';

describe('ParentalLeave', () => {
  it('should generate vacation schedule with the given inputs', () => {
    // Inputs
    const birthDate = new Date('2024-10-09');
    const vacationDays = 11;
    const nbDaysParentalLeaveFirstSplit = 12;

    const expectedSchedule: Item[] = [
      {
        type: 'Birth Leave FR',
        days: 3,
        isBusinessDays: true,
        startDate: new Date('2024-10-09'),
        endDate: new Date('2024-10-11'),
      },
      {
        type: 'Mandatory Parental Leave FR',
        days: 4,
        isBusinessDays: false,
        startDate: new Date('2024-10-12'),
        endDate: new Date('2024-10-15'),
      },
      {
        type: 'Parental Leave FR',
        days: 12,
        isBusinessDays: false,
        startDate: new Date('2024-10-16'),
        endDate: new Date('2024-10-27'),
      },
      {
        type: 'Back to work',
        days: 21,
        isBusinessDays: false,
        startDate: new Date('2024-10-28'),
        endDate: new Date('2024-11-17'),
      },
      {
        type: 'Vacations',
        days: 11,
        isBusinessDays: true,
        startDate: new Date('2024-11-18'),
        endDate: new Date('2024-12-02'),
      },
      {
        type: 'Parental Leave FR',
        days: 9,
        isBusinessDays: false,
        startDate: new Date('2024-12-03'),
        endDate: new Date('2024-12-11'),
      },
      {
        type: "General Parental Leave Moody's",
        days: 51,
        isBusinessDays: false,
        startDate: new Date('2024-12-12'),
        endDate: new Date('2025-01-31'),
      },
      {
        type: 'Back to Work',
        days: 1,
        isBusinessDays: true,
        startDate: new Date('2025-02-03'),
        endDate: new Date('2025-02-03'),
      },
    ];

    // - Birth Leave FR: 09/10/2024 - 11/10/2024 (3 business days)
    // - Mandatory Parental Leave FR: 12/10/2024 - 15/10/2024 (4 calendar days)
    // - Parental Leave FR: 16/10/2024 - 27/10/2024 (12 calendar days)
    // - Back to work: 28/10/2024 - 17/11/2024 (21 calendar days)
    // - Vacations: 18/11/2024 - 02/12/2024 (11 business days)
    // - Parental Leave FR: 03/12/2024 - 11/12/2024 (9 calendar days)
    // - General Parental Leave Moody's: 12/12/2024 - 31/01/2025 (51 calendar days)
    // - Back to Work: 03/02/2025 - 03/02/2025 (1 business days)

    const schedule = ParentalLeave.generateVacationSchedule(birthDate, vacationDays, nbDaysParentalLeaveFirstSplit);

    schedule.forEach((item, index) => {
      const expectedItem = expectedSchedule[index];
      expect(item.type).toBe(expectedItem.type);
      expect(item.days).toBe(expectedItem.days);
      expect(item.isBusinessDays).toBe(expectedItem.isBusinessDays);

      expect(item.startDate.toISOString()).toBe(expectedItem.startDate.toISOString());
      expect(item.endDate.toISOString()).toBe(expectedItem.endDate.toISOString());
    });
  });
});
