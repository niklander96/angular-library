import {inject, Injectable} from '@angular/core';
import {AccountService} from "./account.service";
import {Book} from "../models";
import {BookService} from "./book.service";
import {delay, map, Observable, of} from "rxjs";
import {EBookStatuses} from "../enum/book-statuses.enum";
import {ReadBook} from "../models/user";

interface ILibraryCardService {
  addToCurrentBooks(book: Book): Observable<Book[]>
  addToReadBooks(book: Book): Observable<Book[]>
}

@Injectable({
  providedIn: 'root',
})
export class LibraryCardService implements ILibraryCardService {
  private bookService: BookService = inject(BookService)
  private accountService: AccountService = inject(AccountService)

  /**
   * Изменяет статус книги.
   * @param {EBookStatuses} bookStatus
   * @param {Book | undefined} book - Объект книги.
   * @returns {void}
   */
  private changeBookStatus = (bookStatus: EBookStatuses, book?: Book): Observable<Book[]>  => {
    return this.bookService.update(book?.id ?? '', {...book, bookStatus})
  }

  /**
   *
   * @param book
   */
  public addToCurrentBooks(book: Book): Observable<Book[]>  {
    const user = this.accountService.userSubjectFromService.value

    this.accountService.updateUser({...user, readBooks: user?.readBooks ?? [], currentBooks: [...user?.currentBooks ?? [], new ReadBook(book.id, book.name, new Date(), undefined )]})

    return this.changeBookStatus(EBookStatuses.IN_USE, book)
  }

  /**
   *
   * @param book
   */
  public addToReadBooks(book: Book): Observable<Book[]> {
    const user = this.accountService.userSubjectFromService.value

    const startingDate = user?.currentBooks?.find(item => item.bookId === book.id)?.startReadingDate ?? new Date();

    this.accountService.updateUser({...user,
      currentBooks: user?.currentBooks?.filter(item => item.bookId !== book.id),
      readBooks: [...user?.readBooks ?? [], new ReadBook(book.id, book.name, startingDate, new Date())]
    })

    return this.changeBookStatus(EBookStatuses.NOT_IN_USE, book)
  }
}

