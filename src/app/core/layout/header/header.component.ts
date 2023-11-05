import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '@core/services/user.service';
import { JwtService } from '@core/services/jwt.service';


@Component({
  selector: 'header-layout',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userRole$ = inject(UserService).currentUser;
  
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}


  logout() {
    this.userService.logout();
  }
}
