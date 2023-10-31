import { Component } from '@angular/core';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { defer, map, switchMap } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldCardComponent } from '@shared/field-card/field-card.component';
import { ApiService } from '@core/services/api.service';
import { Searched } from '@core/models/search-result';
import { GetFields } from '@core/models/get-fields';
import { Cities } from '@core/models/cities';
@Component({
  selector: 'listing-page',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, NgClass, FieldCardComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './field-listing.component.html',
  styleUrls: ['./field-listing.component.scss']
})
export class FieldListingComponent {
  constructor(
    private _ApiService: ApiService,
    private route: ActivatedRoute
  ) {}

  getFieldForm:FormGroup = new FormGroup({
    searchText: new FormControl('', Validators.required),
    cityName: new FormControl('')
  })
  
  getFields(data?: GetFields) {
    return this.route.queryParams.pipe(map((params) => params['search']))
    .pipe(switchMap((search) => this._ApiService.searchFields({
        searchText: search || data?.searchText,
        cityName: data?.cityName,
        pageNumber: data?.pageNumber,
        rowsPerPage: data?.rowsPerPage
      }))
    )
    .pipe(map((data) => data.result.fields as Searched))
  }

  FieldsQueryed$ = defer(() => this.getFields({rowsPerPage: 3}));

  cities$ = this._ApiService.getCities()
  .pipe(map((data) => data.result.cities as Cities[]))
  
  searchFields(data?: GetFields) {
    this.FieldsQueryed$ = defer(() => this.getFields(data))
  }

  counter(i: number) {
    return new Array(i);
  }
}
