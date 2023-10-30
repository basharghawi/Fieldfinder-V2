import { Component } from '@angular/core';
import { AsyncPipe, NgClass, NgFor, NgIf, formatDate } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ApiService } from '@core/services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Field } from '@core/models/field-data';
import { FieldRes } from '@core/models/field-reservation';
import { Times } from '@core/models/field-times'


@Component({
  selector: 'field-page',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, AsyncPipe, MatDatepickerModule, MatNativeDateModule, RouterLink],
  templateUrl: './field-detailed.component.html',
  styleUrls: ['./field-detailed.component.scss']
})
export class FieldDetailedComponent {
  constructor(
    private ApiService: ApiService,
    private route: ActivatedRoute,
    private Router: Router,
    private Sanitizer: DomSanitizer,
    private titleService: Title
  ) {
    this.maxDate = this.date;
    this.maxDate.setDate(this.date.getDate() + 14);
  }
  
  date = new Date;
  selected: Date | null | undefined;
  selectedDate:any;
  maxDate: any;

  today: any = this.date.getDate();
  month: any = this.date.getMonth() + 1;
  year: any = this.date.getFullYear();
  timeH = this.date.getHours();
  minDate = this.year + '-' + this.month + '-' + this.today;

  dateToday = '';

  reservations: FieldRes[] = [];
  reservationTimes: Times[] = [];

  holidayShow = false;
  reservationError = false

  selectedButton: number | null = null;
  fromTime: string | undefined
  toTime: string | undefined

  fieldData$ = this.route.params.pipe(
    map((params) => params['id']),
    switchMap((id) => this.ApiService.getFieldById(id).pipe(map((data) => {
      this.titleService.setTitle(data.result.name + ' | ' + data.result.cityName + ' | FieldFinder');
      this.reservations = data.result.reservations;
      return data.result as Field
    })))
  )

  selectButton(index: number, fromTime: string, toTime: string) {
    this.selectedButton = index;
    this.fromTime = fromTime;
    this.toTime = toTime;
  }

  toBooking(id: string, name: string) {
    if (localStorage['jwtToken'] != null) {
      this.Router.navigate(['/booking'], {
        queryParams: {
          id: id,
          date: formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US'),
          startTime: this.fromTime,
          endTime: this.toTime,
          name: name
        }
      });
    } else {
      this.reservationError = true;
    }
  }

  sanitize(url: string) {  // to use maps API
    return this.Sanitizer.bypassSecurityTrustResourceUrl(url)
  }


  onDateChange(event: any) {
    this.selectedDate = formatDate(event, 'M/d/yyyy', 'en-US');

    for (let i = 0; i < this.reservations.length; i++) {
      let reservationDate = this.reservations[i].date;

      if (new Date(reservationDate).toLocaleDateString() === new Date(this.selectedDate).toLocaleDateString()) {
        this.reservationTimes = this.reservations[i].times;
      }
    }

    if (this.reservationTimes.length < 1) {
      this.holidayShow = true;
    } else {
      this.holidayShow = false;
    }
  }

  getDate() {
    if (this.today < 10) {
      this.today = '0' + this.today;
    }
    if (this.month < 10) {
      this.month = '0' + this.month;
    }
    
    this.dateToday = this.month + '/' + this.today + '/' + this.year;
  }
 
  pastClass(time: string): boolean {
    const amPm = time.substring(time.indexOf('M') - 1, time.indexOf('M') + 1);
    var fieldHour = Number(time.substring(0, time.indexOf(':')));
    
    // check if the date is today
    if (new Date(this.dateToday).toLocaleDateString() != new Date(this.selectedDate).toLocaleDateString())
      return false;

    // check if time is AM or PM
    if (amPm === 'AM') {
      // if AM then check if the time available for bookin is past the current hour
      if(this.timeH  >= fieldHour) {
        return true;
      } else {
        return false;
      }
    } else {
      // + 12 to the field times to normalize both local time and api time but not if the time is 12 PM (mid-day)
      fieldHour = fieldHour === 12 ? fieldHour : fieldHour + 12;
      if (this.timeH >= fieldHour) {
        return true;
      } else {
        return false;
      }
    }
  }

  ngOnInit(): void {
    this.getDate();
  }
}
