import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [NgIf],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

}
