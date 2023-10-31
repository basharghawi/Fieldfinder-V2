export interface Fields {
  id: string,
  name: string,
  image: string,
  city?: { name: string },
  cityName?: string,
  cityId?: string,
  price?: number
}