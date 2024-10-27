import { RawItem } from './item.interface';
import { Message } from './message.class';
import { ParentalLeave } from './parental.leave';

const BIRTH_DATE = new Date('2024-10-10');
const REMAINING_START_DATE = new Date('2025-07-31');

const STORED_VACATION_FOR_2025 = 5;
const TOTAL_VACATION = 16;
const AVAILABLE_VACATIONS = TOTAL_VACATION - STORED_VACATION_FOR_2025;

const TOTAL_PARENTAL_LEAVE_FR = 25;
const TOTAL_PARENTAL_LEAVE_MOODYS = 84;
const AFTER_BIRTH_PARENTAL_LEAVE = 4;

const NB_DAYS_PARENTAL_LEAVE_FIRST_SPLIT = 12;
const NB_DAYS_PARENTAL_LEAVE_MOODYS_FIRST_SPLIT = 38;

export const MAIN_PLANNING: RawItem[] = [
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
    days: NB_DAYS_PARENTAL_LEAVE_FIRST_SPLIT,
  },
  {
    type: 'Back to work',
    days: 21,
  },
  {
    type: 'Vacations',
    days: AVAILABLE_VACATIONS,
    isBusinessDay: true,
  },
  {
    type: 'Parental Leave FR',
    days: TOTAL_PARENTAL_LEAVE_FR - AFTER_BIRTH_PARENTAL_LEAVE - NB_DAYS_PARENTAL_LEAVE_FIRST_SPLIT,
  },
  {
    type: "General Parental Leave Moody's",
    days: NB_DAYS_PARENTAL_LEAVE_MOODYS_FIRST_SPLIT,
  },
  {
    type: 'Back to work',
    days: 1,
    isBusinessDay: true,
  },
];

export const REMAINING_PLANNING: RawItem[] = [
  {
    type: "General Parental Leave Moody's",
    days: TOTAL_PARENTAL_LEAVE_MOODYS - NB_DAYS_PARENTAL_LEAVE_MOODYS_FIRST_SPLIT,
  },
];

const main = () => {
  const mainSchedule = ParentalLeave.generateVacationSchedule(BIRTH_DATE, MAIN_PLANNING);
  const remainingSchedule = ParentalLeave.generateVacationSchedule(REMAINING_START_DATE, REMAINING_PLANNING);

  console.log(Message.generateScheduleMessage(mainSchedule));
  console.log(Message.generateScheduleMessage(remainingSchedule));
};

main();
