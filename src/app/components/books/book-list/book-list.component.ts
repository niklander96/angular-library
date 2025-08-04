import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Book} from 'src/app/models';
import {BookService} from 'src/app/services/book.service';
import {BookComponent} from "../book/book.component";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {first, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {EBookStatuses} from "../../../enum/book-statuses.enum";
import {LibraryCardService} from "../../../services/library-card.service";

@Component({
  selector: 'tsc-book-list',
  standalone: true,
  imports: [BookComponent, CommonModule, RouterLink],
  templateUrl: './book-list.component.html',
})
export class BookListComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  public books: Book[] = []

  private bookService: BookService = inject(BookService)
  private libraryCardService: LibraryCardService = inject(LibraryCardService)
  private destroy$: Subject<void> = new Subject<void>();

  public ngOnInit(): void {
    this.getBooks();
  }

  public ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  /**
   * Возвращает список книг.
   * @returns {void}
   */
  public getBooks(): void {
    this.loading = true;
    this.bookService.getAll().pipe().subscribe({
      next: (books) => {
        this.books = books
        this.bookService.booksFromClass = books
      },
      error: (err) => {
        console.error(err)
      },
      complete: () => {
        this.loading = false;
      }
  })
  }

  /**
   * Изменяет статус книги.
   * @param {Book | undefined} book - Объект книги.
   * @returns {void}
   */
  public changeBookStatus = (book?: Book): void  => {
    if (!book?.id) return

    this.setIsBookStatusChanging(true, book?.id)

    const bookStatus = book.bookStatus === EBookStatuses.NOT_IN_USE ? EBookStatuses.IN_USE : EBookStatuses.NOT_IN_USE

    if (book.bookStatus === EBookStatuses.NOT_IN_USE) {
      this.libraryCardService.addToCurrentBooks(book).pipe(takeUntil(this.destroy$)).subscribe({
        next: (books) => {
          this.books = books
          this.bookService.booksFromClass = books
        },
        error: err => {
          console.error('Не удалось изменить статус книги', err)
        },
        complete: () => {
          this.setIsBookStatusChanging(false, book?.id)
        }
      })
    }

    if (book.bookStatus === EBookStatuses.IN_USE) {
      this.libraryCardService.addToReadBooks(book).pipe(takeUntil(this.destroy$)).subscribe({
        next: (books) => {
          this.books = books
          this.bookService.booksFromClass = books
        },
        error: err => {
          console.error('Не удалось изменить статус книги', err)
        },
        complete: () => {
          this.setIsBookStatusChanging(false, book?.id)
        }
      })
    }

    // this.bookService.update(book?.id, {...book, bookStatus})
  }

  /**
   * Удаляет книгу.
   * @param {string | undefined} bookId - Идентификатор книги.
   * @returns {void}
   */
  public deleteBook = (bookId?: string): void  => {
    if (!bookId) return

    this.setIsBookDeleting(true, bookId)

    this.bookService.delete(bookId).pipe(first(), takeUntil(this.destroy$)).subscribe({
      next: books => {
        this.books = books
        this.bookService.booksFromClass = books
      },
      error: err => {
        console.error('Не удалось удалить книгу', err)
      },
      complete: () => {
        this.setIsBookDeleting(false, bookId)
      }
  })
  }

  /**
   * Устанавливает значение в объект книги: Удаляется ли книга?
   * @param {boolean} isDeleting - Удаляется ли книга?
   * @param {string} bookId - Идентификатор книги.
   * @returns {void}
   */
  setIsBookDeleting(isDeleting: boolean, bookId: string): void {
    this.books = this.books.map(book => book.id === bookId ? {...book, isDeleting } : book);
  }

  /**
   * Устанавливает значение в объект книги: Изменяется ли статус книги?
   * @param {boolean} isStatusChanging - Изменяется ли статус книги?
   * @param {string} bookId - Идентификатор книги.
   * @returns {void}
   */
  setIsBookStatusChanging(isStatusChanging: boolean, bookId?: string): void {
    this.books = this.books.map(book => book.id === bookId ? {...book, isStatusChanging } : book);
  }
}
