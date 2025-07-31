import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import { Book } from 'src/app/models';
import { BookService } from 'src/app/services/book.service';
import { BookComponent } from "../book/book.component";
import { CommonModule } from "@angular/common";
import {RouterLink} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: 'tsc-books',
  standalone: true,
  imports: [BookComponent, CommonModule, RouterLink],
  templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {
  loading = false;
  books: Book[] = []

  private bookService: BookService = inject(BookService)

  /**
   * Возвращает список книг.
   * @returns {void}
   */
  getBooks(): void {
    this.loading = true;
    this.bookService.getAll().pipe().subscribe({
      next: books => {
        this.books = books
        this.bookService.booksFromClass = books
      },
      error: err => {
        console.error(err)
      },
      complete: () => {
        this.loading = false;
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
   * Удаляет книгу.
   * @param {string | undefined} bookId - Идентификатор книги.
   * @returns {void}
   */
  deleteBook = (bookId?: string): void  => {
    if (!bookId) return

    this.setIsBookDeleting(true, bookId)

    this.bookService.delete(bookId).pipe(first()).subscribe({
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

  ngOnInit(): void {
    this.getBooks()

    this.books = this.bookService.booksFromClass
  }
}
