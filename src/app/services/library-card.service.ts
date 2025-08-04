import { Injectable } from '@angular/core';
import {AccountService} from "./account.service";
import {Book} from "../models";

@Injectable({
  providedIn: 'root'
})
export class LibraryCardService {

  constructor(private accountService: AccountService) { }

  public takeBook(book: Book) {

  }

  public returnBook(id: number) {

  }
}
