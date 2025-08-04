import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {AccountService} from "../../../services";

@Component({
  selector: 'tsc-layout',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
    if (this.accountService.userSubjectFromService.value) {
      this.router.navigate(['/']);
    }
  }
}
