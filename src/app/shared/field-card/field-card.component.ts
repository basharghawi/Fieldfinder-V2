import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Fields } from '@core/models/fields';
@Component({
  selector: 'field-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './field-card.component.html',
  styleUrls: ['./field-card.component.scss']
})
export class FieldCardComponent {

  @Input() fieldData: Fields | undefined;
}
