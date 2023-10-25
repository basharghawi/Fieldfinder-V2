import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '@core/services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


interface AuthForm {
  email: FormControl<string>;
  password: FormControl<string>;
  name?: FormControl<string>;
  phone?: FormControl<string>;
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  authForm: FormGroup<AuthForm>;
  destroy$ = new Subject<void>();
  authType = "";
  title = "";

  constructor(
    private UserService: UserService, 
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.authForm = new FormGroup<AuthForm>({
      email: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  submitForm(formData: FormGroup) {
    this.UserService.login(formData.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => console.log('success', res),
        error: (err) => console.error('failed', err),
      })
  }

  ngOnInit(): void {
    this.authType = this.route.snapshot.url.at(-1)!.path;
    this.title = this.authType === "login" ? "Sign in" : "Sign up";
    if (this.authType === "register") {
      this.authForm.addControl(
        "name",
        new FormControl("", {
          validators: [Validators.required],
          nonNullable: true,
        })
      );
      this.authForm.addControl(
        "phone",
        new FormControl("", {
          validators: [Validators.required],
          nonNullable: true,
        })
      );
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
