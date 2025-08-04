import { Component } from '@angular/core';
import {User} from "../../models";
import {AccountService} from "../../services";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'tsc-library-card',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './library-card.component.html',
})
export class LibraryCardComponent {
  public user: User | null;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.getUserSubject.value;
  }
}
