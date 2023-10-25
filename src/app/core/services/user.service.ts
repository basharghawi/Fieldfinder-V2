import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { JwtService } from './jwt.service';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient, 
    private jwtService: JwtService,
    private router: Router
  ) { }
  currentUser = new BehaviorSubject(null);

  signUp(credentials: {
    email: string,
    password: string,
    phone: string,
    name: string
  }):Observable<any> {
    return this.http.post('https://localhost:44389/api/Account/Register', credentials);
  };

  login(credentials: {
    email: string,
    password: string
  }):Observable<any> {
    return this.http
      .post('https://localhost:44389/api/Account/Login', credentials)
      .pipe(tap((user) => this.setAuth(user)));
  };

  logout(): void {
    this.purgeAuth();
    void this.router.navigate(["/"]);
  }

  setAuth(user: any): void {
    this.jwtService.saveToken(user.result.authResponse.accessToken);
    this.currentUser.next(user.result.authResponse.accessToken);
  }

  purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUser.next(null);
  }
}
