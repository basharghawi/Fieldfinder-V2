import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetFields } from '@core/models/get-fields'
import { CreateReservation } from '@core/models/createRes';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getFields():Observable<any> {
    return this.http.get('https://localhost:44389/api/Field/GetFields');
  };

  searchFields(fieldData: GetFields):Observable<any> {
    return this.http.post('https://localhost:44389/api/Field/SearchFields', fieldData);
  };

  getFieldById(fieldId: string):Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', fieldId);
    return this.http.get('https://localhost:44389/api/Field/GetField', { params: queryParams });
  };

  CreateReservation(reservation: CreateReservation):Observable<any> {
    return this.http.post('https://localhost:44389/api/Field/CreateReservation', reservation);
  };

  getCities():Observable<any> {
    return this.http.get('https://localhost:44389/api/Site/GetCities');
  };
}
