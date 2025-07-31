import {Component, inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AccountService } from "../../../services";
import { first } from "rxjs/operators";
import { CommonModule } from "@angular/common";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'tsc-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  public loading: boolean = false;
  public submitted: boolean = false;
  private route: ActivatedRoute = inject(ActivatedRoute)
  private router: Router = inject(Router)
  private userService: UserService = inject(UserService)

  ngOnInit() {
    this.registerForm = new FormGroup({
      "firstName": new FormControl('', Validators.required),
      "lastName": new FormControl('', Validators.required),
      "username": new FormControl('', Validators.required),
      "password": new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  get formValue() { return this.registerForm.value; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.add(this.registerForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: (error: any) => {
          console.error('Ошибка при регистрации', error)
        },
        complete: () => {
          this.loading = false;
        }
      });
  }
}
