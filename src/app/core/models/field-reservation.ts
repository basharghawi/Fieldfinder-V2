export interface FieldRes {
  date: string,
  dayName: string,
  dayNumber: number,
  times: [
    {
      fromTime: string,
      toTime: string,
      isReserved: boolean
    }
  ]
}