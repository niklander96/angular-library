import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import {CommonModule, NgClass} from "@angular/common";
import {User} from "./models";
import {AccountService} from "./services";

@Component({
  selector: 'tsc-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, CommonModule],
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  public user?: User | null;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(user => this.user = user);
  }

  logout() {
    this.accountService.logout();
  }
}
