import { Component } from '@angular/core';
import {User} from "../../models";
import {AccountService} from "../../services";

@Component({
  selector: 'app-library-card',
  standalone: true,
  imports: [],
  templateUrl: './library-card.component.html',
})
export class LibraryCardComponent {
  user: User | null;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.getUserSubject.value;
  }
}
