import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'field-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './field-card.component.html',
  styleUrls: ['./field-card.component.scss']
})
export class FieldCardComponent {

  @Input() fieldData: any;
}
