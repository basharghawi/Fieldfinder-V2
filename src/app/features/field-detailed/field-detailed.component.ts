import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@core/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Field } from '@core/models/field-data';


@Component({
  selector: 'field-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './field-detailed.component.html',
  styleUrls: ['./field-detailed.component.scss']
})
export class FieldDetailedComponent {
  constructor(
    private ApiService: ApiService,
    private route: ActivatedRoute,
    private Sanitizer: DomSanitizer
  ) {}

  // @Input() reservationsData: Function | undefined

  fieldData$ = this.route.params.pipe(
    map((params) => params['id']),
    switchMap((id) => this.ApiService.getFieldById(id).pipe(map((data) => data.result as Field)))
  )

  sanitize(url: string) {  // to use maps API
    return this.Sanitizer.bypassSecurityTrustResourceUrl(url)
  }
}
