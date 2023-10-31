import { Component } from '@angular/core';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Subject, interval, map, takeUntil } from 'rxjs';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { FieldCardComponent } from '@shared/field-card/field-card.component';
import { Router, RouterLink } from '@angular/router';
import { ErrorCardComponent } from '@shared/field-card/error-card.component';


@Component({
  selector: 'home-page',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, NgClass, ReactiveFormsModule, RouterLink, FieldCardComponent, ErrorCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  destroy$ = new Subject<void>();
  
  
  constructor(
    private _ApiService: ApiService,
    private router: Router
  ) {}

  getFieldForm:FormGroup = new FormGroup({
    searchText: new FormControl(null, [Validators.required, Validators.minLength(1)]),
  })
  searchFields(formInfo: FormGroup) {
    this.router.navigate(['/fields'], { queryParams: { search: formInfo.value.searchText } })
  }

  allFields$ = this._ApiService.getFields()
    .pipe(map(
      (data) => data.result.slice(0, 4)
    ))
  
  // For Banner
  images = [
    { url: '../../../assets/images/png/pexels-pixabay-274506-min.jpg', alt: 'img' },
    { url: '../../../assets/images/png/pexels-king-siberia-2277980-min.jpg', alt: 'img' },
    { url: '../../../assets/images/png/pexels-tom-fisk-3441727-min.jpg', alt: 'img' },
    { url: '../../../assets/images/png/pexels-pixabay-47730-min.jpg', alt: 'img' },
    { url: '../../../assets/images/png/pexels-tembela-bohle-1884574-min.jpg', alt: 'img' },
    { url: '../../../assets/images/png/pexels-furknsaglam-3131405-min.jpg', alt: 'img' },
  ]
  currentIndex = 0;
  imgsInterval = interval(7000);
  // For Banner

  ngOnInit(): void {
    this.imgsInterval.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
