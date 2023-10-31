import { Fields } from "./fields"

export interface Searched {
  currentPage: number,
  totalPages: number,
  totalRowsPerPage: number,
  totalRows: number,
  selectedPageSize: number,
  items: Fields[]
}