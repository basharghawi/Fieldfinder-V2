import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetFields } from '@core/models/get-fields'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getFields(fieldData: GetFields):Observable<any> {
    return this.http.post('https://localhost:44389/api/Field/GetFields', fieldData);
  };
}
