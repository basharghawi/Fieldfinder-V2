import { Component } from '@angular/core';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { AdminService } from '@core/services/admin.service';
import { ApiService } from '@core/services/api.service';
import { Cities } from '@core/models/cities';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'admin',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, AsyncPipe, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(
    private _ApiService: ApiService,
    private _AdminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  destroy$ = new Subject<void>();
  selectedFile: any;
  showImg = false;
  
  cities$ = this._ApiService.getCities()
  .pipe(map((data) => data.result.cities as Cities[]))

  createForm = this.fb.group({
    Name:new FormControl(null,[Validators.required]),
    Description:new FormControl(null, [Validators.required]),
    Price:new FormControl(null, [Validators.required]),
    StartTime:new FormControl(null, [Validators.required]),
    EndTime:new FormControl(null, [Validators.required]),
    ReservationPeriod:new FormControl(null, [Validators.required]),
    ExcludedDays:new FormControl(null, [Validators.required]),
    CityId:new FormControl('', [Validators.required]),
    Image:new FormControl(null, [Validators.required]),
    MapLocation:new FormControl(null, [Validators.required]),
    Email:new FormControl(null, [Validators.required, Validators.email]),
    PhoneNumber:new FormControl(null, [Validators.required]),
  });

  submitField(formInfo: FormGroup) {
    const formData = new FormData();
    let form = formInfo.value;
    
    // Append form data
    Object.keys(form).forEach(key => {
      formData.append(key, form[key]);
    });

    // Append the image file
    formData.append('Image', this.selectedFile, this.selectedFile.name);

    this._AdminService.createField(formData).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.openSnackBar(formInfo.value.Name, 'created successfully', '👍'),
        error: (err) => this.openSnackBar('', err.message, '💩')
      });
  }
  
  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    var file = event.srcElement.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    setTimeout(() => {
      this.showImg = false? true : false;
    }, 300);
  }

  openSnackBar(name: string, mess: string, act: string) {
    this.snackBar.open(`${name?.toUpperCase} ${mess}`, act, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}
