import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { Subject, map, switchMap, takeUntil } from 'rxjs';
import { Field } from '@core/models/field-data';
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  destroy$ = new Subject<void>();
  
  constructor(
    private _ApiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  bookingQ$ = this.route.queryParams.pipe(map((params) => params))

  fieldBooked$ = this.bookingQ$.pipe(switchMap(id => this._ApiService.getFieldById(id['id'])))
  .pipe(map((fieldData) => fieldData.result as Field))

  sendBooking(data: Params) {
    let test = document.getElementById('my_dialog') as HTMLDialogElement;
    this._ApiService.CreateReservation({
      fieldId: data['id'],
      date: data['date'],
      startTime: data['startTime'],
      endTime: data['endTime'],
      fieldName: data['name'],
      isCancelled: 'false'
    }).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        if (200 === res.statusCode) {
          test.showModal();
        }
      },
      error: (err) => {
        console.error('Error: ', err.message);
      }
    })
  }
}
