export interface RawItem {
  type: string;
  days: number;
  isBusinessDay?: boolean;
}

export interface Item extends RawItem {
  startDate: Date;
  endDate: Date;
  isBusinessDay: boolean;
}
