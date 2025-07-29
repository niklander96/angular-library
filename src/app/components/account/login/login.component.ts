import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../../../services';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'tsc-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
  ) {
    this.loginForm = new FormGroup({
      "username": new FormControl('', Validators.required),
      "password": new FormControl('', Validators.required),
    })
  }

  // convenience getter for easy access to form fields
  get formValue() { return this.loginForm.value; }

  onSubmit() {
    this.submitted = true;

    // // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.login(this.formValue.username.value, this.formValue.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          // this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
