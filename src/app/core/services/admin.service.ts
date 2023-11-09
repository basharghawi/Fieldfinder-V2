import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  createField(fieldData: object):Observable<any> {
    return this.http.post(`${environment.apiUrl}/Field/CreateFiled`, fieldData);
  };

  deleteField(fieldId: string):Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', fieldId);
    return this.http.delete(`${environment.apiUrl}/Field/DeleteField`, { params: queryParams });
  };
}
