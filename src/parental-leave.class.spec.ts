import { Item } from './item.interface';
import { MAIN_PLANNING } from './main';
import { ParentalLeave } from './parental.leave';

describe('ParentalLeave.generateVacationSchedule', () => {
  it('should generate the correct vacation schedule for the provided parameters', () => {
    const birthDate = new Date('2024-10-10');

    const schedule: Item[] = ParentalLeave.generateVacationSchedule(birthDate, MAIN_PLANNING);

    // - Birth Leave FR: 10/10/2024 - 14/10/2024 (3 business days)
    // - Mandatory Parental Leave FR: 15/10/2024 - 18/10/2024 (4 calendar days)
    // - Parental Leave FR: 19/10/2024 - 30/10/2024 (12 calendar days)
    // - Back to work: 31/10/2024 - 20/11/2024 (21 calendar days)
    // - Vacations: 21/11/2024 - 05/12/2024 (11 business days)
    // - Parental Leave FR: 06/12/2024 - 14/12/2024 (9 calendar days)
    // - General Parental Leave Moody's: 15/12/2024 - 03/02/2025 (51 calendar days)

    expect(schedule).toEqual([
      {
        type: 'Birth Leave FR',
        days: 3,
        isBusinessDay: true,
        startDate: new Date('2024-10-10'),
        endDate: new Date('2024-10-14'),
      },
      {
        type: 'Mandatory Parental Leave FR',
        days: 4,
        isBusinessDay: false,
        startDate: new Date('2024-10-15'),
        endDate: new Date('2024-10-18'),
      },
      {
        type: 'Parental Leave FR',
        days: 12,
        isBusinessDay: false,
        startDate: new Date('2024-10-19'),
        endDate: new Date('2024-10-30'),
      },
      {
        type: 'Back to work',
        days: 21,
        isBusinessDay: false,
        startDate: new Date('2024-10-31'),
        endDate: new Date('2024-11-20'),
      },
      {
        type: 'Vacations',
        days: 11,
        isBusinessDay: true,
        startDate: new Date('2024-11-21'),
        endDate: new Date('2024-12-05'),
      },
      {
        type: 'Parental Leave FR',
        days: 9,
        isBusinessDay: false,
        startDate: new Date('2024-12-06'),
        endDate: new Date('2024-12-14'),
      },
      {
        type: "General Parental Leave Moody's",
        days: 39,
        isBusinessDay: false,
        startDate: new Date('2024-12-15'),
        endDate: new Date('2025-01-22'),
      },
      {
        type: 'Back to work',
        days: 1,
        isBusinessDay: true,
        startDate: new Date('2025-01-23'),
        endDate: new Date('2025-01-23'),
      },
    ]);
  });
});
