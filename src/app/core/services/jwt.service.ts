import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  decodeToken() {
    const token = JSON.stringify(window.localStorage["jwtToken"]);
    const decodedToken: any = jwtDecode(token);
    return {
      role: decodedToken.Role,
      useID: decodedToken.sub
    };
  }

  getToken(): string {
    return window.localStorage["jwtToken"];
  }

  saveToken(token: string): void {
    window.localStorage["jwtToken"] = token;
  }

  destroyToken(): void {
    window.localStorage.removeItem("jwtToken");
  }
}
