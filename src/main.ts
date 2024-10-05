import { Message } from './message.class';
import { ParentalLeave } from './parental.leave';

const BIRTH_DATE = new Date('2024-10-10');
const STORED_VACATION_FOR_2025 = 5;
const TOTAL_VACATION = 16;

const main = () => {
  const availableVacations = TOTAL_VACATION - STORED_VACATION_FOR_2025;

  const schedule = ParentalLeave.generateVacationSchedule(BIRTH_DATE, availableVacations, 12);

  console.log(Message.generateMessage(schedule));
};

main();
