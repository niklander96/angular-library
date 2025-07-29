import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AccountService} from "../../services";
import {User} from "../../models";

@Component({
  selector: 'tsc-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  user: User | null;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }
}
