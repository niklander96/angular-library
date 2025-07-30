import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {HomeComponent} from "./components/home/home.component";
import {BooksComponent} from "./components/books/books/books.component";
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import {CommonModule, NgClass} from "@angular/common";
import {User} from "./models";
import {AccountService} from "./services";

@Component({
  selector: 'tsc-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgClass, RouterLinkActive, CommonModule],
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  user?: User | null;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(user => this.user = user);
  }

  logout() {
    this.accountService.logout();
  }
}
