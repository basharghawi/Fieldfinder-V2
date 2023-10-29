import { Times } from '@core/models/field-times'
export interface FieldRes {
  date: string,
  dayName: string,
  dayNumber: number,
  times: Times[]
}