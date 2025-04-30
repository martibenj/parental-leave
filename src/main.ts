import {
  AVAILABLE_VACATION_TOTAL_COUNT,
  NB_DAYS_USED_ON_FR_PARENTAL_LEAVE_FIRST_SPLIT,
  NB_DAYS_BACK_TO_WORK_BETWEEN_FR_PARENTAL_LEAVE,
  NB_DAYS_USED_ON_MOODYS_PARENTAL_LEAVE_FIRST_SPLIT,
  MOODYS_PARENTAL_LEAVE_SECOND_SPLIT_START_DATE,
  ESTIMATED_BIRTH_DATE,
} from './configuration';
import { RawItem } from './interfaces/item.interface';
import { Message } from './message/message.class';
import { ParentalLeave } from './parental-leave/parental-leave';

// Constants
const TOTAL_FR_PARENTAL_LEAVE = 25;
const TOTAL_MOODYS_PARENTAL_LEAVE = 84;
const MANDATORY_BIRTH_PARENTAL_LEAVE = 3;
const MANDATORY_AFTER_BIRTH_PARENTAL_LEAVE = 4;
const STORED_VACATION_FOR_NEXT_YEAR = 5;
const AVAILABLE_VACATIONS = AVAILABLE_VACATION_TOTAL_COUNT - STORED_VACATION_FOR_NEXT_YEAR;

export const MAIN_PLANNING: RawItem[] = [
  {
    type: 'Birth Leave FR',
    days: MANDATORY_BIRTH_PARENTAL_LEAVE,
    isBusinessDay: true,
  },
  {
    type: 'Mandatory Parental Leave FR',
    days: MANDATORY_AFTER_BIRTH_PARENTAL_LEAVE,
  },
  {
    type: 'Parental Leave FR',
    days: NB_DAYS_USED_ON_FR_PARENTAL_LEAVE_FIRST_SPLIT,
  },
  {
    type: 'Back to work',
    days: NB_DAYS_BACK_TO_WORK_BETWEEN_FR_PARENTAL_LEAVE,
  },
  {
    type: 'Vacations',
    days: AVAILABLE_VACATIONS,
    isBusinessDay: true,
  },
  {
    type: 'Parental Leave FR',
    days:
      TOTAL_FR_PARENTAL_LEAVE - MANDATORY_AFTER_BIRTH_PARENTAL_LEAVE - NB_DAYS_USED_ON_FR_PARENTAL_LEAVE_FIRST_SPLIT,
  },
  {
    type: "Global parental Leave Moody's",
    days: NB_DAYS_USED_ON_MOODYS_PARENTAL_LEAVE_FIRST_SPLIT,
  },
  {
    type: 'Back to work',
    days: 1,
    isBusinessDay: true,
  },
];

export const REMAINING_PLANNING: RawItem[] = [
  {
    type: "Global parental Leave Moody's",
    days: TOTAL_MOODYS_PARENTAL_LEAVE - NB_DAYS_USED_ON_MOODYS_PARENTAL_LEAVE_FIRST_SPLIT,
  },
];

const main = () => {
  const mainSchedule = ParentalLeave.generateVacationSchedule(ESTIMATED_BIRTH_DATE, MAIN_PLANNING);
  const remainingSchedule = ParentalLeave.generateVacationSchedule(
    MOODYS_PARENTAL_LEAVE_SECOND_SPLIT_START_DATE,
    REMAINING_PLANNING
  );

  console.log(Message.generateScheduleMessage(mainSchedule));
  console.log(Message.generateScheduleMessage(remainingSchedule));
};

main();
