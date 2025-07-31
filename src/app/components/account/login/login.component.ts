import {Component, inject, OnInit} from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../../../services';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'tsc-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public loading: boolean = false;
  public submitted: boolean = false;
  private route: ActivatedRoute = inject(ActivatedRoute)
  private router: Router = inject(Router)
  private accountService: AccountService = inject(AccountService)

  ngOnInit() {
    this.loginForm = new FormGroup({
      "username": new FormControl('', Validators.required),
      "password": new FormControl('', Validators.required),
    })
  }

  get formValue() { return this.loginForm.value; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.accountService.login(this.formValue.username, this.formValue.password)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          console.error('Ошибка при авторизации', error);
        },
        complete: () => {
          this.loading = false;
        }
      });
  }
}
