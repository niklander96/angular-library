import {Component, inject, OnInit} from '@angular/core';
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
        this.loading = false
      },
      error: err => {
        console.error(err)
        this.loading = false
      }
  })
  }

  /**
   * Удаляет книгу.
   * @param {string | undefined} bookId - Идентификатор книги.
   * @returns {void}
   */
  deleteBook = (bookId?: string): void  => {
    if (!bookId) return
    const book = this.books!.find(book => book.id === bookId) ?? new Book()

    book.isDeleting = true

    this.bookService.delete(bookId).pipe(first()).subscribe({
      next: books => {
      this.books = books
      this.bookService.booksFromClass = books
        book.isDeleting = false
      },
      error: err => {
        console.error('Не удалось удалить', err)
        book.isDeleting = false
      }
  })
  }

  ngOnInit(): void {
    this.getBooks()

    this.books = this.bookService.booksFromClass
  }
}
