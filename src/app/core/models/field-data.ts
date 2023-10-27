import { FieldRes } from '@core/models/field-reservation'

export interface Field {
  cityId: string,
  cityName: string,
  description: string,
  id: string,
  image: string,
  name: string,
  price: number,
  mapLocation: string,
  reservationPeriod: number,
  email: string,
  phoneNumber: string,
  reservations: FieldRes[]
}