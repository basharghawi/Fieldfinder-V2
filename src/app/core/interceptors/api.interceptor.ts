import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(req));
  }

  addAuthToken(request: HttpRequest<any>) {
    const token = localStorage.getItem('accessToken');
    return request.clone({
      setHeaders: {
        "Accept-Language": sessionStorage.getItem('language') || 'en',
        Authorization: `Bearer ${token}`,
        "X-Tenant": 'azhar'
      }
    })
  }
}
