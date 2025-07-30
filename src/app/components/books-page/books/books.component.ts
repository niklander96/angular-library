import {Component, Inject, OnInit} from '@angular/core';
import { Book } from 'src/app/models';
import { BookService } from 'src/app/services/book.service';
import { BookComponent } from "../book/book.component";
import { CommonModule } from "@angular/common";
import {RouterLink} from "@angular/router";
import {BOOK_METHODS_TOKEN} from "../../../app.config";
import {first} from "rxjs/operators";

@Component({
  selector: 'tsc-books',
  standalone: true,
  imports: [BookComponent, CommonModule, RouterLink],
  templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {
  loading = false;
  books: Book[] = this.bookService.booksFromClass

  constructor(
    @Inject(BOOK_METHODS_TOKEN) private bookService: BookService,
  ) {
    console.log(this.bookService.booksFromClass)
  }

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
   * @returns {void}
   */
  deleteBook = (bookId?: string): void  => {
    if (!bookId) return
    const book = this.books!.find(book => book.id === bookId) || new Book()
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
  }
}
