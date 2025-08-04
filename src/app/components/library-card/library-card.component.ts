import {Component, inject, OnInit} from '@angular/core';
import {User} from "../../models";
import {AccountService, BookService} from "../../services";
import {LibraryCardService} from "../../services/library-card.service";
import {ReadBooksComponent} from "../read-books/read-books.component";
import {CurrentBooksComponent} from "../current-books/current-books.component";

@Component({
  selector: 'tsc-library-card',
  standalone: true,
  imports: [ReadBooksComponent, CurrentBooksComponent],
  providers: [LibraryCardService, BookService],
  templateUrl: './library-card.component.html',
})
export class LibraryCardComponent implements OnInit {
  public user?: User | null;

  private accountService: AccountService = inject(AccountService);

  ngOnInit() {
    this.user = this.accountService.userSubjectFromService.value;
  }
}
