import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, map, tap } from 'rxjs';
import { Router } from "@angular/router";
import { JwtService } from './jwt.service';
import { Token } from '@core/models/token';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient, 
    private jwtService: JwtService,
    private router: Router
  ) { 
    if (window.localStorage["jwtToken"] != null) {
      this.currentUserSubject.next(this.jwtService.decodeToken());
      // console.log(this.jwtService.decodeToken());
    }
  }

  private currentUserSubject = new BehaviorSubject<Token | null>(null);
  public currentUser = this.currentUserSubject.asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  signUp(credentials: {
    email: string,
    password: string,
    phone: string,
    name: string
  }):Observable<any> {
    return this.http.post(`${environment.apiUrl}/Account/Register`, credentials);
  };

  login(credentials: {
    email: string,
    password: string
  }):Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/Account/Login`, credentials)
      .pipe(tap((user) => this.setAuth(user)));
  };

  logout(): void {
    this.purgeAuth();
    void this.router.navigate(["/"]);
  }

  setAuth(user: any): void {
    this.jwtService.saveToken(user.result.authResponse.accessToken);
    this.currentUserSubject.next(this.jwtService.decodeToken());
  }

  purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
  }
}
